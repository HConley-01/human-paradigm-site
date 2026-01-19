#!/usr/bin/env pwsh
# NiCE Framework Publication Sync
# Scans MAIN_PDF and WORKED_PDF, compares versions, syncs files, updates registry

param([switch]$DryRun, [switch]$Deploy)
$ErrorActionPreference = "Stop"

$repoRoot = "M:\NiCE_Site_Repo"
$mainPdfSource = "$repoRoot\Additional_Documents\MAIN_PDF"
$workedPdfSource = "$repoRoot\Additional_Documents\WORKED_PDF"
$niceFramework = "$repoRoot\nice-framework"
$documentsDir = "$niceFramework\documents"
$registryPath = "$niceFramework\data\document-registry.json"

Write-Host "`nNiCE Framework Publication Sync`n===============================`n" -ForegroundColor Cyan

function Get-VersionFromFilename {
    param([string]$filename)
    if ($filename -match '\.?v\.?(\d+\.\d+(?:\.\d+)?)(?:\.pdf)?$') { return $matches[1] }
    return $null
}

function Parse-DocumentFilename {
    param([string]$filename)
    $version = Get-VersionFromFilename $filename
    $baseName = $filename -replace '\.?v\.?\d+\.\d+(?:\.\d+)?\.pdf$', ''
    return @{ Filename = $filename; BaseName = $baseName; Version = $version }
}

Write-Host "Loading document registry..." -ForegroundColor Yellow
$registry = Get-Content $registryPath -Raw | ConvertFrom-Json

Write-Host "Scanning source folders...`n" -ForegroundColor Yellow
$sourceFiles = @()
Get-ChildItem $mainPdfSource -Filter "*.pdf" | ForEach-Object {
    $parsed = Parse-DocumentFilename $_.Name
    $sourceFiles += [PSCustomObject]@{
        File = $_; Category = "core"; BaseName = $parsed.BaseName
        Version = $parsed.Version; Filename = $parsed.Filename
    }
}
Get-ChildItem $workedPdfSource -Filter "*.pdf" | ForEach-Object {
    $parsed = Parse-DocumentFilename $_.Name
    $sourceFiles += [PSCustomObject]@{
        File = $_; Category = "worked-example"; BaseName = $parsed.BaseName
        Version = $parsed.Version; Filename = $parsed.Filename
    }
}

$updates = @()
$newFiles = @()
foreach ($source in $sourceFiles) {
    if (-not $source.Version) {
        Write-Host "WARNING: No version in $($source.Filename)" -ForegroundColor Yellow
        continue
    }
    
    $registryEntry = $registry.documents.PSObject.Properties | Where-Object {
        $_.Value.filename -eq $source.Filename
    } | Select-Object -First 1
    
    if ($registryEntry) {
        if ($registryEntry.Value.version -ne $source.Version) {
            $updates += [PSCustomObject]@{
                Action = "UPDATE"; Id = $registryEntry.Name; Title = $registryEntry.Value.title
                OldVersion = $registryEntry.Value.version; NewVersion = $source.Version
                Filename = $source.Filename; SourceFile = $source.File; Category = $source.Category
            }
        }
    } else {
        $matchingEntry = $registry.documents.PSObject.Properties | Where-Object {
            $_.Value.filename -match [regex]::Escape($source.BaseName)
        } | Select-Object -First 1
        
        if ($matchingEntry) {
            $updates += [PSCustomObject]@{
                Action = "VERSION_BUMP"; Id = $matchingEntry.Name; Title = $matchingEntry.Value.title
                OldVersion = $matchingEntry.Value.version; NewVersion = $source.Version
                OldFilename = $matchingEntry.Value.filename; Filename = $source.Filename
                SourceFile = $source.File; Category = $source.Category
            }
        } else {
            $newFiles += $source
        }
    }
}

if ($updates.Count -eq 0 -and $newFiles.Count -eq 0) {
    Write-Host "Everything up to date!" -ForegroundColor Green
    exit 0
}

Write-Host "Changes detected:`n" -ForegroundColor Cyan
if ($updates.Count -gt 0) {
    Write-Host "Updates:" -ForegroundColor Yellow
    foreach ($update in $updates) {
        Write-Host "  - $($update.Title)" -ForegroundColor White
        Write-Host "    $($update.OldVersion) -> $($update.NewVersion)" -ForegroundColor Cyan
    }
    Write-Host ""
}
if ($newFiles.Count -gt 0) {
    Write-Host "New files:" -ForegroundColor Green
    foreach ($new in $newFiles) {
        Write-Host "  - $($new.Filename) (v$($new.Version))" -ForegroundColor White
        Write-Host "    Manual registry entry needed" -ForegroundColor Yellow
    }
    Write-Host ""
}

if ($DryRun) {
    Write-Host "Dry run - no changes made" -ForegroundColor Cyan
    exit 0
}

Write-Host "Applying updates...`n" -ForegroundColor Cyan
foreach ($update in $updates) {
    Write-Host "  Copying: $($update.Filename)" -ForegroundColor White
    Copy-Item $update.SourceFile.FullName -Destination $documentsDir -Force
    
    $registry.documents.($update.Id).version = $update.NewVersion
    $registry.documents.($update.Id).filename = $update.Filename
    
    if ($update.OldFilename -and $update.OldFilename -ne $update.Filename) {
        $oldPath = Join-Path $documentsDir $update.OldFilename
        if (Test-Path $oldPath) {
            Write-Host "  Removing old: $($update.OldFilename)" -ForegroundColor DarkGray
            Remove-Item $oldPath -Force
        }
    }
}

foreach ($new in $newFiles) {
    Write-Host "  Copying: $($new.Filename)" -ForegroundColor White
    Copy-Item $new.File.FullName -Destination $documentsDir -Force
    Write-Host "  Registry entry must be added manually" -ForegroundColor Yellow
}

$registry.lastUpdated = Get-Date -Format "yyyy-MM-dd"
Write-Host "`nUpdating document registry..." -ForegroundColor Yellow
$registry | ConvertTo-Json -Depth 10 | Set-Content $registryPath -Encoding UTF8

Write-Host "Sync complete!`n" -ForegroundColor Green
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "  Updated: $($updates.Count)" -ForegroundColor White
Write-Host "  New files copied: $($newFiles.Count)" -ForegroundColor White

if ($Deploy) {
    Write-Host "`nCommitting changes..." -ForegroundColor Cyan
    Set-Location $niceFramework
    git add documents/* data/document-registry.json
    $commitMsg = "chore: sync publications - " + ($updates | ForEach-Object { "$($_.Title) v$($_.NewVersion)" }) -join ", "
    git commit -m $commitMsg
    git push origin main
    Write-Host "`nDeploying to Cloudflare..." -ForegroundColor Cyan
    npx wrangler pages deploy . --project-name=human-paradigm-site --branch=main
    Write-Host "`nDeployment complete!" -ForegroundColor Green
} else {
    Write-Host "`nRun with -Deploy to automatically commit and deploy" -ForegroundColor Yellow
}

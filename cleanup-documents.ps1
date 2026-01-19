#!/usr/bin/env pwsh
# Clean up old PDF versions - keeps only files in document-registry.json

param([switch]$DryRun)
$ErrorActionPreference = "Stop"

$niceFramework = "M:\NiCE_Site_Repo\nice-framework"
$documentsDir = "$niceFramework\documents"
$registryPath = "$niceFramework\data\document-registry.json"

Write-Host "`nNiCE Framework Document Cleanup`n================================`n" -ForegroundColor Cyan

$registry = Get-Content $registryPath -Raw | ConvertFrom-Json
$registeredFiles = @()
$registry.documents.PSObject.Properties | ForEach-Object {
    $registeredFiles += $_.Value.filename
}

Write-Host "Registered files: $($registeredFiles.Count)`n" -ForegroundColor White
$allPdfs = Get-ChildItem $documentsDir -Filter "*.pdf"
Write-Host "Total PDFs in documents: $($allPdfs.Count)`n" -ForegroundColor White

$orphaned = @()
foreach ($pdf in $allPdfs) {
    if ($pdf.Name -notin $registeredFiles) {
        $orphaned += $pdf
    }
}

if ($orphaned.Count -eq 0) {
    Write-Host "No orphaned files found!" -ForegroundColor Green
    exit 0
}

Write-Host "Orphaned files to remove: $($orphaned.Count)`n" -ForegroundColor Yellow
foreach ($file in $orphaned) {
    $sizeKB = [math]::Round($file.Length / 1KB, 2)
    Write-Host "  - $($file.Name) ($sizeKB KB)" -ForegroundColor DarkGray
}

if ($DryRun) {
    Write-Host "`nDry run - no files removed" -ForegroundColor Cyan
    Write-Host "Run without -DryRun to actually delete these files" -ForegroundColor Yellow
    exit 0
}

Write-Host "`nRemoving orphaned files..." -ForegroundColor Cyan
$totalSize = 0
foreach ($file in $orphaned) {
    $totalSize += $file.Length
    Remove-Item $file.FullName -Force
    Write-Host "  Removed: $($file.Name)" -ForegroundColor DarkGray
}

$totalMB = [math]::Round($totalSize / 1MB, 2)
Write-Host "`nCleanup complete!" -ForegroundColor Green
Write-Host "Removed: $($orphaned.Count) files ($totalMB MB)" -ForegroundColor White

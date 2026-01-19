#!/usr/bin/env pwsh
param([switch]$Deploy)

$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$registryPath = Join-Path $scriptDir "data\document-registry.json"
$indexPath = Join-Path $scriptDir "index.html"

Write-Host "`nWorked Examples Generator" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan

# Load registry
$registry = Get-Content $registryPath -Raw | ConvertFrom-Json
$workedExamples = $registry.documents.PSObject.Properties | 
    Where-Object { $_.Value.category -eq "worked-example" } |
    ForEach-Object { $_.Value } |
    Sort-Object id

Write-Host "`nFound $($workedExamples.Count) worked examples"

# Generate cards
$cards = @()
foreach ($doc in $workedExamples) {
    # Determine color based on tag
    $color = switch ($doc.tag) {
        "SIGN-FLIP" { "lime" }
        "PATHOGENESIS" { "red" }
        "STIGMA ANALYSIS" { "cyan" }
        "CASE STUDY" { "sky" }
        "INSTITUTIONAL" { "emerald" }
        "REFORM" { "indigo" }
        default { "gray" }
    }
    
    $card = @"
                <!-- $($doc.title) -->
                <a data-doc="$($doc.id)" data-doc-link target="_blank" class="glass-card p-6 hover:border-$color-500/50 transition-all duration-300">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="px-2 py-1 bg-$color-500/20 rounded text-$color-400 text-xs font-medium">$($doc.tag)</span>
                        <span class="text-xs text-gray-500" data-doc="$($doc.id)" data-doc-version></span>
                        <span class="px-2 py-1 bg-$color-500/20 rounded text-$color-300 text-xs">PDF</span>
                    </div>
                    <h3 class="text-lg font-bold mb-2" data-doc="$($doc.id)" data-doc-title></h3>
                    <p class="text-gray-400 text-sm">
                        NiCE Framework worked example.
                    </p>
                </a>
"@
    $cards += $card
}

# Build section
$section = @"
            <!-- Worked Examples Subsection -->
            <div class="text-center mb-10">
                <h3 class="text-2xl font-bold mb-2 text-gray-300">NiCE Framework Worked Examples</h3>
                <p class="text-gray-500">Applied diagnostic analyses demonstrating the framework in action</p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
$($cards -join "`n`n")
            </div>
"@

Write-Host "Updating index.html..."

# Read HTML
$html = [System.IO.File]::ReadAllText($indexPath, [System.Text.UTF8Encoding]::new($false))

# Replace section
$pattern = '(?s)(\s+<!-- Worked Examples Subsection -->.*?)(</div>\s+</div>\s+</section>\s+<!-- How to Cite -->)'
if ($html -match $pattern) {
    $before = $html.Substring(0, $Matches.Index)
    $after = $html.Substring($Matches.Index + $Matches[0].Length)
    $newHtml = $before + "`n" + $section + "`n        </div>`n    </section>`n`n    <!-- How to Cite -->" + $after.Substring($after.IndexOf("`n"))
    
    [System.IO.File]::WriteAllText($indexPath, $newHtml, [System.Text.UTF8Encoding]::new($false))
    Write-Host "Updated successfully!" -ForegroundColor Green
} else {
    Write-Host "ERROR: Could not find section" -ForegroundColor Red
    exit 1
}

if ($Deploy) {
    Write-Host "`nDeploying..."
    git add index.html
    git commit -m "auto: regenerate worked examples"
    git push origin main
    npx wrangler pages deploy . --project-name=human-paradigm-site --branch=main
}

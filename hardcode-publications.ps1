#!/usr/bin/env pwsh
# Hardcode ALL publication links directly into index.html
# No more unreliable JavaScript - pure HTML reliability

$ErrorActionPreference = "Stop"
$indexPath = "M:\NiCE_Site_Repo\nice-framework\index.html"
$registryPath = "M:\NiCE_Site_Repo\nice-framework\data\document-registry.json"

Write-Host "Hardcoding publication links..." -ForegroundColor Cyan

$registry = Get-Content $registryPath -Raw | ConvertFrom-Json
$html = Get-Content $indexPath -Raw

# Build core publications HTML
$coreHtml = ""
$corePublications = $registry.documents.PSObject.Properties | Where-Object { $_.Value.category -eq 'core' }

foreach ($item in $corePublications) {
    $doc = $item.Value
    $description = switch ($doc.id) {
        'synthesis' { 'Comprehensive synthesis of the triadic Nature-Consciousness-Environment model with full theoretical development.' }
        'human-paradigm' { 'Core theoretical framework establishing the NiCE triadic model and its philosophical foundations.' }
        'advanced-analysis' { 'Deep analysis of symbolic drift, monetary systems, and civilizational dynamics through the NiCE lens.' }
        'human-essence' { 'An AI perspective on human nature—exploring consciousness, embodiment, and meaning-making.' }
        'insanity-quotient' { 'Systematic framework for diagnosing societal dysfunction through the NiCE triadic lens.' }
        'metaparadigm' { 'Meta-analysis of the Human Paradigm framework and its foundational principles.' }
        default { '' }
    }
    
    $coreHtml += @"
                <!-- $($doc.title) -->
                <a href="/documents/$($doc.filename)" target="_blank" class="glass-card p-6 hover:border-$($doc.tagColor)-500/50 transition-all duration-300">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="px-2 py-1 bg-$($doc.tagColor)-500/20 rounded text-$($doc.tagColor)-400 text-xs font-medium">$($doc.tag)</span>
                        <span class="text-xs text-gray-500">v$($doc.version)</span>
                    </div>
                    <h3 class="text-lg font-bold mb-2">$($doc.title)</h3>
                    <p class="text-gray-400 text-sm">
                        $description
                    </p>
                </a>

"@
}

# Build worked examples HTML
$workedHtml = ""
$workedPublications = $registry.documents.PSObject.Properties | Where-Object { $_.Value.category -eq 'worked-example' }

foreach ($item in $workedPublications) {
    $doc = $item.Value
    $description = switch ($doc.id) {
        'sign-flip' { 'The theoretical foundation for the sign-flip mechanism (σ)—showing how redefining accumulation as ecological obligation reverses coupling dynamics across all nine N-C-E pathways.' }
        'pathogenesis' { 'Mental illness as natural system output. The Asymmetric Propagation Law: pathology propagates automatically across N-C-E regimes while health requires sustained energy input.' }
        'stigma' { 'Comprehensive NiCE diagnosis of bidirectional stigma across all cohort pairs. Maps 49 stigma vectors (7×7 matrix) classified by N-C-E regime.' }
        'us-diagnostic' { 'Comprehensive NiCE Framework diagnostic of United States societal dynamics—analyzing triadic dysfunction across political, economic, and cultural systems.' }
        'china-diagnostic' { 'NiCE Framework diagnostic analysis of China''s societal dynamics—examining triadic interplay across governance, economic, and cultural systems.' }
        'imf-worldbank' { 'Worked analysis applying the NiCE Framework to international financial institutions—diagnosing systemic dynamics and intervention leverage points.' }
        'academia-reform' { 'NiCE Framework analysis of US higher education—examining institutional drift, incentive misalignment, and pathways for systemic reform.' }
        'pa-diagnostic' { 'Applied phenomenological analysis of parental alienation dynamics through the NiCE Framework triadic lens.' }
        default { '' }
    }
    
    $workedHtml += @"
                <!-- $($doc.title) -->
                <a href="/documents/$($doc.filename)" target="_blank" class="glass-card p-6 hover:border-$($doc.tagColor)-500/50 transition-all duration-300">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="px-2 py-1 bg-$($doc.tagColor)-500/20 rounded text-$($doc.tagColor)-400 text-xs font-medium">$($doc.tag)</span>
                        <span class="text-xs text-gray-500">v$($doc.version)</span>
                        <span class="px-2 py-1 bg-$($doc.tagColor)-500/20 rounded text-$($doc.tagColor)-300 text-xs">PDF</span>
                    </div>
                    <h3 class="text-lg font-bold mb-2">$($doc.title)</h3>
                    <p class="text-gray-400 text-sm">
                        $description
                    </p>
                </a>

"@
}

# Replace publications section
$pattern = '(?s)(<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">)(.*?)(</div>\s*<!-- Worked Examples)'
$replacement = "`$1`n$coreHtml            `$3"
$html = $html -replace $pattern, $replacement

$pattern = '(?s)(<!-- Worked Examples.*?<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">)(.*?)(</div>\s*</div>\s*</section>)'
$replacement = "`$1`n$workedHtml            `$3"
$html = $html -replace $pattern, $replacement

# Write file
[System.IO.File]::WriteAllText($indexPath, $html, [System.Text.UTF8Encoding]::new($false))

Write-Host "Complete! All publications hardcoded." -ForegroundColor Green
Write-Host "Total publications: $($registry.documents.PSObject.Properties.Count)" -ForegroundColor White

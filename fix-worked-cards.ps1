$indexPath = "M:\NiCE_Site_Repo\nice-framework\index.html"
$content = Get-Content $indexPath -Raw

# Define all 7 worked examples replacements
$replacements = @(
    @{
        old = @'
                <!-- Upstream Pathogenesis -->
                <a data-doc="pathogenesis" data-doc-link target="_blank" class="glass-card p-6 hover:border-red-500/50 transition-all duration-300">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="px-2 py-1 bg-red-500/20 rounded text-red-400 text-xs font-medium">PATHOGENESIS</span>
                        <span class="text-xs text-gray-500" data-doc="pathogenesis" data-doc-version"></span>
                        <span class="px-2 py-1 bg-red-500/20 rounded text-red-300 text-xs">PDF</span>
                    </div>
                    <h3 class="text-lg font-bold mb-2" data-doc="pathogenesis" data-doc-title">Part VII: Upstream Systemic Pathogenesis</h3>
                    <p class="text-gray-400 text-sm mb-3">
                        Mental illness as natural system output. The Asymmetric Propagation Law: pathology propagates automatically across N-C-E regimes while health requires sustained energy input.
                    </p>
                </a>
'@
        new = @'
                <!-- Upstream Pathogenesis -->
                <div class="glass-card p-6 hover:border-red-500/50 transition-all duration-300">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="px-2 py-1 bg-red-500/20 rounded text-red-400 text-xs font-medium">PATHOGENESIS</span>
                        <span class="text-xs text-gray-500" data-doc="pathogenesis" data-doc-version"></span>
                        <span class="px-2 py-1 bg-red-500/20 rounded text-red-300 text-xs">PDF</span>
                    </div>
                    <h3 class="text-lg font-bold mb-2" data-doc="pathogenesis" data-doc-title">Part VII: Upstream Systemic Pathogenesis</h3>
                    <p class="text-gray-400 text-sm mb-4 leading-relaxed min-h-[80px]">
                        Mental illness as natural system output. The Asymmetric Propagation Law: pathology propagates automatically across N-C-E regimes while health requires sustained energy input.
                    </p>
                    <div class="flex flex-wrap items-center gap-3 pt-3 border-t border-white/10">
                        <a data-doc="pathogenesis" data-doc-link target="_blank" class="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded text-red-300 text-xs font-medium transition-all duration-300">
                            📄 Download PDF
                        </a>
                        <button onclick="showCitation('pathogenesis')" class="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-500/20 hover:bg-gray-500/30 border border-gray-500/50 rounded text-gray-300 text-xs font-medium transition-all duration-300">
                            📋 Cite
                        </button>
                        <a href="https://doi.org/10.5281/zenodo.18297192" target="_blank" class="inline-block">
                            <img src="https://zenodo.org/badge/DOI/10.5281/zenodo.18297192.svg" alt="DOI" class="h-5">
                        </a>
                    </div>
                </div>
'@
    },
    @{
        old = @'
                <!-- Omnidirectional Stigma Diagnosis -->
                <a data-doc="stigma" data-doc-link target="_blank" class="glass-card p-6 hover:border-cyan-500/50 transition-all duration-300">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="px-2 py-1 bg-cyan-500/20 rounded text-cyan-400 text-xs font-medium">STIGMA ANALYSIS</span>
                        <span class="text-xs text-gray-500" data-doc="stigma" data-doc-version"></span>
                        <span class="px-2 py-1 bg-cyan-500/20 rounded text-cyan-300 text-xs">PDF</span>
                    </div>
                    <h3 class="text-lg font-bold mb-2" data-doc="stigma" data-doc-title">Omnidirectional Stigma Mechanics</h3>
                    <p class="text-gray-400 text-sm mb-3">
                        Comprehensive NiCE diagnosis of bidirectional stigma across all cohort pairs. Maps 49 stigma vectors (7×7 matrix) classified by N-C-E regime.
                    </p>
                </a>
'@
        new = @'
                <!-- Omnidirectional Stigma Diagnosis -->
                <div class="glass-card p-6 hover:border-cyan-500/50 transition-all duration-300">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="px-2 py-1 bg-cyan-500/20 rounded text-cyan-400 text-xs font-medium">STIGMA ANALYSIS</span>
                        <span class="text-xs text-gray-500" data-doc="stigma" data-doc-version"></span>
                        <span class="px-2 py-1 bg-cyan-500/20 rounded text-cyan-300 text-xs">PDF</span>
                    </div>
                    <h3 class="text-lg font-bold mb-2" data-doc="stigma" data-doc-title">Omnidirectional Stigma Mechanics</h3>
                    <p class="text-gray-400 text-sm mb-4 leading-relaxed min-h-[80px]">
                        Comprehensive NiCE diagnosis of bidirectional stigma across all cohort pairs. Maps 49 stigma vectors (7×7 matrix) classified by N-C-E regime.
                    </p>
                    <div class="flex flex-wrap items-center gap-3 pt-3 border-t border-white/10">
                        <a data-doc="stigma" data-doc-link target="_blank" class="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 rounded text-cyan-300 text-xs font-medium transition-all duration-300">
                            📄 Download PDF
                        </a>
                        <button onclick="showCitation('stigma')" class="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-500/20 hover:bg-gray-500/30 border border-gray-500/50 rounded text-gray-300 text-xs font-medium transition-all duration-300">
                            📋 Cite
                        </button>
                        <a href="https://doi.org/10.5281/zenodo.18297243" target="_blank" class="inline-block">
                            <img src="https://zenodo.org/badge/DOI/10.5281/zenodo.18297243.svg" alt="DOI" class="h-5">
                        </a>
                    </div>
                </div>
'@
    },
    @{
        old = @'
                <!-- US Diagnostic Analysis -->
                <a data-doc="us-diagnostic" data-doc-link target="_blank" class="glass-card p-6 hover:border-sky-500/50 transition-all duration-300">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="px-2 py-1 bg-sky-500/20 rounded text-sky-400 text-xs font-medium">CASE STUDY</span>
                        <span class="text-xs text-gray-500" data-doc="us-diagnostic" data-doc-version"></span>
                        <span class="px-2 py-1 bg-sky-500/20 rounded text-sky-300 text-xs">PDF</span>
                    </div>
                    <h3 class="text-lg font-bold mb-2" data-doc="us-diagnostic" data-doc-title">US Diagnostic Analysis</h3>
                    <p class="text-gray-400 text-sm mb-3">
                        Comprehensive NiCE Framework diagnostic of United States societal dynamics—analyzing triadic dysfunction across political, economic, and cultural systems.
                    </p>
                </a>
'@
        new = @'
                <!-- US Diagnostic Analysis -->
                <div class="glass-card p-6 hover:border-sky-500/50 transition-all duration-300">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="px-2 py-1 bg-sky-500/20 rounded text-sky-400 text-xs font-medium">CASE STUDY</span>
                        <span class="text-xs text-gray-500" data-doc="us-diagnostic" data-doc-version"></span>
                        <span class="px-2 py-1 bg-sky-500/20 rounded text-sky-300 text-xs">PDF</span>
                    </div>
                    <h3 class="text-lg font-bold mb-2" data-doc="us-diagnostic" data-doc-title">US Diagnostic Analysis</h3>
                    <p class="text-gray-400 text-sm mb-4 leading-relaxed min-h-[80px]">
                        Comprehensive NiCE Framework diagnostic of United States societal dynamics—analyzing triadic dysfunction across political, economic, and cultural systems.
                    </p>
                    <div class="flex flex-wrap items-center gap-3 pt-3 border-t border-white/10">
                        <a data-doc="us-diagnostic" data-doc-link target="_blank" class="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/50 rounded text-sky-300 text-xs font-medium transition-all duration-300">
                            📄 Download PDF
                        </a>
                        <button onclick="showCitation('us-diagnostic')" class="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-500/20 hover:bg-gray-500/30 border border-gray-500/50 rounded text-gray-300 text-xs font-medium transition-all duration-300">
                            📋 Cite
                        </button>
                        <a href="https://doi.org/10.5281/zenodo.18297324" target="_blank" class="inline-block">
                            <img src="https://zenodo.org/badge/DOI/10.5281/zenodo.18297324.svg" alt="DOI" class="h-5">
                        </a>
                    </div>
                </div>
'@
    },
    @{
        old = @'
                <!-- China Diagnostic Analysis -->
                <a data-doc="china-diagnostic" data-doc-link target="_blank" class="glass-card p-6 hover:border-rose-500/50 transition-all duration-300">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="px-2 py-1 bg-rose-500/20 rounded text-rose-400 text-xs font-medium">CASE STUDY</span>
                        <span class="text-xs text-gray-500" data-doc="china-diagnostic" data-doc-version"></span>
                        <span class="px-2 py-1 bg-rose-500/20 rounded text-rose-300 text-xs">PDF</span>
                    </div>
                    <h3 class="text-lg font-bold mb-2" data-doc="china-diagnostic" data-doc-title">China Diagnostic Analysis</h3>
                    <p class="text-gray-400 text-sm">
                        NiCE Framework diagnostic analysis of China's societal dynamics—examining triadic interplay across governance, economic, and cultural systems.
                    </p>
                </a>
'@
        new = @'
                <!-- China Diagnostic Analysis -->
                <div class="glass-card p-6 hover:border-rose-500/50 transition-all duration-300">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="px-2 py-1 bg-rose-500/20 rounded text-rose-400 text-xs font-medium">CASE STUDY</span>
                        <span class="text-xs text-gray-500" data-doc="china-diagnostic" data-doc-version"></span>
                        <span class="px-2 py-1 bg-rose-500/20 rounded text-rose-300 text-xs">PDF</span>
                    </div>
                    <h3 class="text-lg font-bold mb-2" data-doc="china-diagnostic" data-doc-title">China Diagnostic Analysis</h3>
                    <p class="text-gray-400 text-sm mb-4 leading-relaxed min-h-[80px]">
                        NiCE Framework diagnostic analysis of China's societal dynamics—examining triadic interplay across governance, economic, and cultural systems.
                    </p>
                    <div class="flex flex-wrap items-center gap-3 pt-3 border-t border-white/10">
                        <a data-doc="china-diagnostic" data-doc-link target="_blank" class="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/50 rounded text-rose-300 text-xs font-medium transition-all duration-300">
                            📄 Download PDF
                        </a>
                        <button onclick="showCitation('china-diagnostic')" class="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-500/20 hover:bg-gray-500/30 border border-gray-500/50 rounded text-gray-300 text-xs font-medium transition-all duration-300">
                            📋 Cite
                        </button>
                        <a href="https://doi.org/10.5281/zenodo.18297373" target="_blank" class="inline-block">
                            <img src="https://zenodo.org/badge/DOI/10.5281/zenodo.18297373.svg" alt="DOI" class="h-5">
                        </a>
                    </div>
                </div>
'@
    },
    @{
        old = @'
                <!-- IMF/World Bank Analysis -->
                <a data-doc="imf-worldbank" data-doc-link target="_blank" class="glass-card p-6 hover:border-emerald-500/50 transition-all duration-300">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="px-2 py-1 bg-emerald-500/20 rounded text-emerald-400 text-xs font-medium">INSTITUTIONAL</span>
                        <span class="text-xs text-gray-500" data-doc="imf-worldbank" data-doc-version"></span>
                        <span class="px-2 py-1 bg-emerald-500/20 rounded text-emerald-300 text-xs">PDF</span>
                    </div>
                    <h3 class="text-lg font-bold mb-2" data-doc="imf-worldbank" data-doc-title">IMF & World Bank Analysis</h3>
                    <p class="text-gray-400 text-sm mb-3">
                        Worked analysis applying the NiCE Framework to international financial institutions—diagnosing systemic dynamics and intervention leverage points.
                    </p>
                </a>
'@
        new = @'
                <!-- IMF/World Bank Analysis -->
                <div class="glass-card p-6 hover:border-emerald-500/50 transition-all duration-300">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="px-2 py-1 bg-emerald-500/20 rounded text-emerald-400 text-xs font-medium">INSTITUTIONAL</span>
                        <span class="text-xs text-gray-500" data-doc="imf-worldbank" data-doc-version"></span>
                        <span class="px-2 py-1 bg-emerald-500/20 rounded text-emerald-300 text-xs">PDF</span>
                    </div>
                    <h3 class="text-lg font-bold mb-2" data-doc="imf-worldbank" data-doc-title">IMF & World Bank Analysis</h3>
                    <p class="text-gray-400 text-sm mb-4 leading-relaxed min-h-[80px]">
                        Worked analysis applying the NiCE Framework to international financial institutions—diagnosing systemic dynamics and intervention leverage points.
                    </p>
                    <div class="flex flex-wrap items-center gap-3 pt-3 border-t border-white/10">
                        <a data-doc="imf-worldbank" data-doc-link target="_blank" class="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 rounded text-emerald-300 text-xs font-medium transition-all duration-300">
                            📄 Download PDF
                        </a>
                        <button onclick="showCitation('imf-worldbank')" class="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-500/20 hover:bg-gray-500/30 border border-gray-500/50 rounded text-gray-300 text-xs font-medium transition-all duration-300">
                            📋 Cite
                        </button>
                        <a href="https://doi.org/10.5281/zenodo.18297425" target="_blank" class="inline-block">
                            <img src="https://zenodo.org/badge/DOI/10.5281/zenodo.18297425.svg" alt="DOI" class="h-5">
                        </a>
                    </div>
                </div>
'@
    },
    @{
        old = @'
                <!-- US Academia Reform -->
                <a data-doc="academia-reform" data-doc-link target="_blank" class="glass-card p-6 hover:border-indigo-500/50 transition-all duration-300">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="px-2 py-1 bg-indigo-500/20 rounded text-indigo-400 text-xs font-medium">REFORM</span>
                        <span class="text-xs text-gray-500" data-doc="academia-reform" data-doc-version"></span>
                        <span class="px-2 py-1 bg-indigo-500/20 rounded text-indigo-300 text-xs">PDF</span>
                    </div>
                    <h3 class="text-lg font-bold mb-2" data-doc="academia-reform" data-doc-title">US Academia Reform Analysis</h3>
                    <p class="text-gray-400 text-sm mb-3">
                        NiCE Framework analysis of US higher education—examining institutional drift, incentive misalignment, and pathways for systemic reform.
                    </p>
                </a>
'@
        new = @'
                <!-- US Academia Reform -->
                <div class="glass-card p-6 hover:border-indigo-500/50 transition-all duration-300">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="px-2 py-1 bg-indigo-500/20 rounded text-indigo-400 text-xs font-medium">REFORM</span>
                        <span class="text-xs text-gray-500" data-doc="academia-reform" data-doc-version"></span>
                        <span class="px-2 py-1 bg-indigo-500/20 rounded text-indigo-300 text-xs">PDF</span>
                    </div>
                    <h3 class="text-lg font-bold mb-2" data-doc="academia-reform" data-doc-title">US Academia Reform Analysis</h3>
                    <p class="text-gray-400 text-sm mb-4 leading-relaxed min-h-[80px]">
                        NiCE Framework analysis of US higher education—examining institutional drift, incentive misalignment, and pathways for systemic reform.
                    </p>
                    <div class="flex flex-wrap items-center gap-3 pt-3 border-t border-white/10">
                        <a data-doc="academia-reform" data-doc-link target="_blank" class="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/50 rounded text-indigo-300 text-xs font-medium transition-all duration-300">
                            📄 Download PDF
                        </a>
                        <button onclick="showCitation('academia-reform')" class="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-500/20 hover:bg-gray-500/30 border border-gray-500/50 rounded text-gray-300 text-xs font-medium transition-all duration-300">
                            📋 Cite
                        </button>
                        <a href="https://doi.org/10.5281/zenodo.18297471" target="_blank" class="inline-block">
                            <img src="https://zenodo.org/badge/DOI/10.5281/zenodo.18297471.svg" alt="DOI" class="h-5">
                        </a>
                    </div>
                </div>
'@
    },
    @{
        old = @'
                <!-- Parental Alienation Diagnostic -->
                <a data-doc="pa-diagnostic" data-doc-link target="_blank" class="glass-card p-6 hover:border-orange-500/50 transition-all duration-300">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="px-2 py-1 bg-orange-500/20 rounded text-orange-400 text-xs font-medium">CASE STUDY</span>
                        <span class="text-xs text-gray-500" data-doc="pa-diagnostic" data-doc-version"></span>
                        <span class="px-2 py-1 bg-orange-500/20 rounded text-orange-300 text-xs">PDF</span>
                    </div>
                    <h3 class="text-lg font-bold mb-2" data-doc="pa-diagnostic" data-doc-title"></h3>
                    <p class="text-gray-400 text-sm mb-3">
                        NiCE Framework diagnostic of parental alienation—analyzing triadic dynamics, systemic patterns, and intervention pathways.
                    </p>
                </a>
'@
        new = @'
                <!-- Parental Alienation Diagnostic -->
                <div class="glass-card p-6 hover:border-orange-500/50 transition-all duration-300">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="px-2 py-1 bg-orange-500/20 rounded text-orange-400 text-xs font-medium">CASE STUDY</span>
                        <span class="text-xs text-gray-500" data-doc="pa-diagnostic" data-doc-version"></span>
                        <span class="px-2 py-1 bg-orange-500/20 rounded text-orange-300 text-xs">PDF</span>
                    </div>
                    <h3 class="text-lg font-bold mb-2" data-doc="pa-diagnostic" data-doc-title"></h3>
                    <p class="text-gray-400 text-sm mb-4 leading-relaxed min-h-[80px]">
                        NiCE Framework diagnostic of parental alienation—analyzing triadic dynamics, systemic patterns, and intervention pathways.
                    </p>
                    <div class="flex flex-wrap items-center gap-3 pt-3 border-t border-white/10">
                        <a data-doc="pa-diagnostic" data-doc-link target="_blank" class="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/50 rounded text-orange-300 text-xs font-medium transition-all duration-300">
                            📄 Download PDF
                        </a>
                        <button onclick="showCitation('pa-diagnostic')" class="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-500/20 hover:bg-gray-500/30 border border-gray-500/50 rounded text-gray-300 text-xs font-medium transition-all duration-300">
                            📋 Cite
                        </button>
                        <a href="https://doi.org/10.5281/zenodo.18297503" target="_blank" class="inline-block">
                            <img src="https://zenodo.org/badge/DOI/10.5281/zenodo.18297503.svg" alt="DOI" class="h-5">
                        </a>
                    </div>
                </div>
'@
    }
)

# Apply all replacements
$count = 0
foreach ($r in $replacements) {
    if ($content -match [regex]::Escape($r.old)) {
        $content = $content.Replace($r.old, $r.new)
        $count++
        Write-Host "✅ Replaced card $count"
    } else {
        Write-Host "⚠️ Could not find match for card $count"
    }
}

# Save the file
$content | Set-Content $indexPath -NoNewline
Write-Host "`n✨ Fixed $count out of 7 worked examples cards"

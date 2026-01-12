/**
 * Asymmetric Propagation Calculation Library
 * Models how symbol speed vs substance speed creates system fragility
 */

export interface PropagationParams {
  symbolSpeed: number;      // 1-100x multiplier
  substanceSpeed: number;   // 1-50x multiplier
  timeElapsed: number;      // 0-100 time units
}

export interface PropagationResults {
  symbolDistance: number;
  substanceDistance: number;
  decouplingRatio: number;
  systemFragility: number;  // 0-100%
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  explanation: string;
  warnings: string[];
}

export interface HistoricalCase {
  id: string;
  name: string;
  period: string;
  symbolSpeed: number;
  substanceSpeed: number;
  outcome: string;
  decouplingRatio: number;
}

export function calculateAsymmetricPropagation(params: PropagationParams): PropagationResults {
  // Calculate distances traveled
  const symbolDistance = (params.symbolSpeed * params.timeElapsed) / 100;
  const substanceDistance = (params.substanceSpeed * params.timeElapsed) / 100;
  
  // Calculate decoupling ratio
  const decouplingRatio = symbolDistance / Math.max(substanceDistance, 0.1);
  
  // Calculate system fragility (0-100%)
  const systemFragility = Math.min((decouplingRatio - 1) * 20, 100);
  
  // Determine risk level
  const riskLevel = getRiskLevel(decouplingRatio);
  
  // Generate explanation
  const explanation = generateExplanation(params, decouplingRatio, systemFragility);
  
  // Generate warnings
  const warnings = generateWarnings(decouplingRatio, systemFragility);
  
  return {
    symbolDistance,
    substanceDistance,
    decouplingRatio,
    systemFragility,
    riskLevel,
    explanation,
    warnings
  };
}

function getRiskLevel(decouplingRatio: number): PropagationResults['riskLevel'] {
  if (decouplingRatio < 2) return 'low';
  if (decouplingRatio < 4) return 'moderate';
  if (decouplingRatio < 6) return 'high';
  return 'critical';
}

function generateExplanation(
  params: PropagationParams,
  decouplingRatio: number,
  fragility: number
): string {
  if (decouplingRatio < 1.5) {
    return 'Symbols and substance are closely coupled. System is stable and grounded in physical reality.';
  } else if (decouplingRatio < 3) {
    return `Symbols are propagating ${decouplingRatio.toFixed(1)}x faster than substance. Moderate decoupling detected. Monitor for increasing fragility.`;
  } else if (decouplingRatio < 5) {
    return `Significant decoupling: symbols moving ${decouplingRatio.toFixed(1)}x faster than substance. System fragility at ${fragility.toFixed(0)}%. High risk of instability.`;
  } else {
    return `CRITICAL: Extreme decoupling detected. Symbols ${decouplingRatio.toFixed(1)}x ahead of substance. System operating on false premises. Collapse risk imminent.`;
  }
}

function generateWarnings(decouplingRatio: number, fragility: number): string[] {
  const warnings: string[] = [];
  
  if (decouplingRatio > 6) {
    warnings.push('⚠️ CRITICAL: System decoupling exceeds sustainable thresholds');
    warnings.push('⚠️ Immediate reality-grounding interventions required');
    warnings.push('⚠️ Prepare for potential rapid collapse scenarios');
  } else if (decouplingRatio > 4) {
    warnings.push('⚠️ HIGH RISK: Significant symbol-substance gap');
    warnings.push('⚠️ Implement corrective measures to reduce decoupling');
  } else if (decouplingRatio > 2) {
    warnings.push('⚠️ MODERATE RISK: Decoupling trend detected');
    warnings.push('⚠️ Monitor feedback loops and tighten coupling');
  } else if (fragility > 20) {
    warnings.push('ℹ️ Mild fragility present - maintain vigilance');
  } else {
    warnings.push('✓ System coupling within healthy range');
  }
  
  return warnings;
}

export const historicalCases: HistoricalCase[] = [
  {
    id: 'tulip-mania',
    name: 'Tulip Mania (1636-1637)',
    period: '1636-1637',
    symbolSpeed: 95,
    substanceSpeed: 5,
    decouplingRatio: 19,
    outcome: 'Complete collapse - tulip bulb prices fell 99% overnight. Speculative frenzy decoupled from actual value.'
  },
  {
    id: 'financial-crisis-2008',
    name: '2008 Financial Crisis',
    period: '2007-2008',
    symbolSpeed: 85,
    substanceSpeed: 15,
    decouplingRatio: 5.7,
    outcome: 'Global recession - derivatives market ($600T) far exceeded underlying assets ($60T). 10:1 leverage common.'
  },
  {
    id: 'dot-com-bubble',
    name: 'Dot-com Bubble (2000)',
    period: '1999-2000',
    symbolSpeed: 90,
    substanceSpeed: 20,
    decouplingRatio: 4.5,
    outcome: 'Market crash - tech valuations based on clicks, not revenue. NASDAQ fell 78% peak-to-trough.'
  },
  {
    id: 'weimar-hyperinflation',
    name: 'Weimar Hyperinflation',
    period: '1921-1923',
    symbolSpeed: 98,
    substanceSpeed: 3,
    decouplingRatio: 32.7,
    outcome: 'Currency collapse - printing money faster than production. Prices doubled every 3.7 days at peak.'
  },
  {
    id: 'current-financial-system',
    name: 'Modern Financial System',
    period: '2020s',
    symbolSpeed: 75,
    substanceSpeed: 20,
    decouplingRatio: 3.75,
    outcome: 'Ongoing - global derivatives ~$600T vs world GDP ~$100T. Debt levels at historic highs.'
  },
  {
    id: 'pre-industrial',
    name: 'Pre-Industrial Economy',
    period: 'Pre-1750',
    symbolSpeed: 15,
    substanceSpeed: 12,
    decouplingRatio: 1.25,
    outcome: 'Stable - commodity money (gold/silver) tightly coupled to physical production and trade.'
  }
];

export function findSimilarCase(params: PropagationParams): HistoricalCase | null {
  const { symbolDistance, decouplingRatio } = calculateAsymmetricPropagation(params);
  
  // Find closest match by decoupling ratio
  const sorted = [...historicalCases].sort((a, b) => 
    Math.abs(a.decouplingRatio - decouplingRatio) - Math.abs(b.decouplingRatio - decouplingRatio)
  );
  
  return sorted[0];
}

export function getDecouplingTrend(history: PropagationParams[]): 'improving' | 'stable' | 'worsening' {
  if (history.length < 2) return 'stable';
  
  const results = history.map(calculateAsymmetricPropagation);
  const recent = results.slice(-3);
  const earlier = results.slice(0, -3);
  
  if (earlier.length === 0) return 'stable';
  
  const recentAvg = recent.reduce((sum, r) => sum + r.decouplingRatio, 0) / recent.length;
  const earlierAvg = earlier.reduce((sum, r) => sum + r.decouplingRatio, 0) / earlier.length;
  
  if (recentAvg > earlierAvg * 1.1) return 'worsening';
  if (recentAvg < earlierAvg * 0.9) return 'improving';
  return 'stable';
}

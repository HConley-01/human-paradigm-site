/**
 * Insanity Quotient Calculation Library
 * Quantifies system-reality decoupling
 */

export interface IQInputs {
  symbol

ToSubstanceRatio: number;  // 1-100:1
  temporalLag: number;             // 0-100%
  behavioralSinkIndex: number;     // 0-100
}

export interface IQResult {
  score: number;                    // 0-100
  category: string;
  categoryLevel: 'Aligned' | 'Mild Drift' | 'Moderate Insanity' | 'Severe Insanity' | 'Terminal Insanity';
  description: string;
  interventions: string[];
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
}

export interface HistoricalBenchmark {
  name: string;
  period: string;
  iqScore: number;
  outcome: string;
  lessons: string;
}

export function calculateIQ(inputs: IQInputs): IQResult {
  // Weighted calculation
  const iq = (
    inputs.symbolToSubstanceRatio * 0.4 +
    inputs.temporalLag * 0.3 +
    inputs.behavioralSinkIndex * 0.3
  );

  const category = getIQCategory(iq);
  const interventions = generateInterventions(inputs, iq);

  return {
    score: Math.round(iq * 10) / 10,
    category: category.name,
    categoryLevel: category.level,
    description: category.description,
    interventions,
    riskLevel: category.riskLevel
  };
}

function getIQCategory(iq: number): {
  level: IQResult['categoryLevel'];
  name: string;
  description: string;
  riskLevel: IQResult['riskLevel'];
} {
  if (iq < 20) {
    return {
      level: 'Aligned',
      name: 'Aligned (0-20)',
      description: 'Symbolic systems closely track physical reality. Sustainable and grounded.',
      riskLevel: 'low'
    };
  } else if (iq < 40) {
    return {
      level: 'Mild Drift',
      name: 'Mild Drift (20-40)',
      description: 'Minor decoupling emerging. Early warning signs present. Correctable with awareness.',
      riskLevel: 'low'
    };
  } else if (iq < 60) {
    return {
      level: 'Moderate Insanity',
      name: 'Moderate Insanity (40-60)',
      description: 'Significant symbol-substance gap. System fragility increasing. Intervention needed.',
      riskLevel: 'moderate'
    };
  } else if (iq < 80) {
    return {
      level: 'Severe Insanity',
      name: 'Severe Insanity (60-80)',
      description: 'Severe reality distortion. System operating on false premises. Collapse risk high.',
      riskLevel: 'high'
    };
  } else {
    return {
      level: 'Terminal Insanity',
      name: 'Terminal Insanity (80-100)',
      description: 'Complete decoupling from reality. System collapse imminent or underway.',
      riskLevel: 'critical'
    };
  }
}

function generateInterventions(inputs: IQInputs, iq: number): string[] {
  const interventions: string[] = [];

  // Symbol/Substance ratio interventions
  if (inputs.symbolToSubstanceRatio > 60) {
    interventions.push('Re-ground symbolic systems in physical reality');
    interventions.push('Reduce reliance on abstract financial instruments');
    interventions.push('Implement substance-linked monetary reforms');
  } else if (inputs.symbolToSubstanceRatio > 40) {
    interventions.push('Monitor symbol-substance coupling closely');
    interventions.push('Strengthen feedback from physical constraints');
  }

  // Temporal lag interventions
  if (inputs.temporalLag > 60) {
    interventions.push('Accelerate adaptation to changing conditions');
    interventions.push('Reduce institutional inertia and path dependencies');
    interventions.push('Implement real-time monitoring and response systems');
  } else if (inputs.temporalLag > 40) {
    interventions.push('Improve responsiveness to environmental signals');
    interventions.push('Shorten feedback loops between decision and outcome');
  }

  // Behavioral sink interventions
  if (inputs.behavioralSinkIndex > 60) {
    interventions.push('Reduce symbolic complexity and information overload');
    interventions.push('Restore biological rhythms and spatial coherence');
    interventions.push('Create supportive environments for grounded behavior');
  } else if (inputs.behavioralSinkIndex > 40) {
    interventions.push('Balance symbolic demands with biological capacities');
    interventions.push('Provide spaces for recovery and regulation');
  }

  // Overall system health interventions
  if (iq > 60) {
    interventions.push('PRIORITY: Comprehensive system redesign required');
    interventions.push('Establish reality-grounding feedback mechanisms');
    interventions.push('Prepare for potential system failure scenarios');
  } else if (iq > 40) {
    interventions.push('Implement proactive corrective measures');
    interventions.push('Build resilience and redundancy into systems');
  }

  // If very low, acknowledge health
  if (iq < 20) {
    interventions.push('Maintain current grounding practices');
    interventions.push('Monitor for emerging drift signals');
  }

  return interventions;
}

export const historicalBenchmarks: HistoricalBenchmark[] = [
  {
    name: 'Roman Empire (Late Period)',
    period: '3rd-5th Century CE',
    iqScore: 75,
    outcome: 'Collapse - currency debasement, institutional failure, territorial fragmentation',
    lessons: 'Monetary system decoupled from value; military obligations exceeded resources'
  },
  {
    name: 'Weimar Germany',
    period: '1921-1923',
    iqScore: 85,
    outcome: 'Hyperinflation collapse - complete currency failure within 2 years',
    lessons: 'Printing money without substance backing led to total economic breakdown'
  },
  {
    name: '2008 Financial Crisis',
    period: '2007-2009',
    iqScore: 70,
    outcome: 'Global recession - derivatives market collapse, banking system failure',
    lessons: 'Synthetic financial instruments decoupled from underlying assets'
  },
  {
    name: 'Tulip Mania',
    period: '1636-1637',
    iqScore: 80,
    outcome: 'Market crash - tulip prices collapsed 99% overnight',
    lessons: 'Speculative symbols (tulip bulbs) decoupled from intrinsic value'
  },
  {
    name: 'Modern US Economy',
    period: '2020s',
    iqScore: 65,
    outcome: 'Ongoing - high debt-to-GDP, financialization, inequality',
    lessons: 'Financial sector growth far exceeds productive capacity growth'
  },
  {
    name: 'Pre-Industrial Society',
    period: 'Pre-1750',
    iqScore: 15,
    outcome: 'Stable - localized economies, substance-based exchange',
    lessons: 'Tight coupling between symbolic value and physical goods'
  }
];

export function getComparativeBenchmark(iq: number): HistoricalBenchmark | null {
  // Find closest historical benchmark
  const sorted = [...historicalBenchmarks].sort((a, b) => 
    Math.abs(a.iqScore - iq) - Math.abs(b.iqScore - iq)
  );
  return sorted[0];
}

export function generateReport(inputs: IQInputs, result: IQResult): string {
  const benchmark = getComparativeBenchmark(result.score);
  
  return `
INSANITY QUOTIENT ASSESSMENT REPORT

Score: ${result.score} / 100
Category: ${result.category}
Risk Level: ${result.riskLevel.toUpperCase()}

INPUT PARAMETERS:
- Symbol-to-Substance Ratio: ${inputs.symbolToSubstanceRatio}:1
- Temporal Lag: ${inputs.temporalLag}%
- Behavioral Sink Index: ${inputs.behavioralSinkIndex}

INTERPRETATION:
${result.description}

HISTORICAL COMPARISON:
Closest Match: ${benchmark?.name} (IQ: ${benchmark?.iqScore})
Period: ${benchmark?.period}
Outcome: ${benchmark?.outcome}
Lessons: ${benchmark?.lessons}

RECOMMENDED INTERVENTIONS:
${result.interventions.map((i, idx) => `${idx + 1}. ${i}`).join('\n')}

---
Generated by NiCE Framework Interactive Lab
${new Date().toLocaleDateString()}
  `.trim();
}

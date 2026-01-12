/**
 * Interactive Lab - Landing page for all NiCE Framework interactive visualizations
 */

import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Brain, 
  TrendingUp, 
  Clock, 
  Users, 
  Filter,
  ArrowRight,
  Sparkles
} from "lucide-react";

interface VisualizationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  status: 'available' | 'coming-soon';
  complexity: 'beginner' | 'intermediate' | 'advanced';
}

function VisualizationCard({ title, description, icon, href, status, complexity }: VisualizationCardProps) {
  const complexityColors = {
    beginner: 'bg-green-500/20 text-green-300',
    intermediate: 'bg-yellow-500/20 text-yellow-300',
    advanced: 'bg-red-500/20 text-red-300'
  };

  return (
    <Card className="glass-card p-6 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-consciousness/10 to-environment/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-lg bg-consciousness/20 text-consciousness">
            {icon}
          </div>
          <span className={`text-xs px-2 py-1 rounded ${complexityColors[complexity]}`}>
            {complexity}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Fraunces, serif' }}>
          {title}
        </h3>
        <p className="text-card-foreground/70 text-sm mb-4">
          {description}
        </p>

        {status === 'available' ? (
          <Button asChild className="w-full group/btn">
            <Link href={href}>
              Explore Interactive
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </Button>
        ) : (
          <Button disabled className="w-full">
            Coming Soon
          </Button>
        )}
      </div>
    </Card>
  );
}

export default function InteractiveLab() {
  const visualizations: VisualizationCardProps[] = [
    {
      title: "Asymmetric Propagation Simulator",
      description: "Explore how symbol speed exceeding substance speed creates systemic fragility. Includes historical cases from tulip mania to 2008.",
      icon: <TrendingUp className="w-6 h-6" />,
      href: "/interactive/asymmetric-propagation",
      status: 'available',
      complexity: 'beginner'
    },
    {
      title: "Insanity Quotient Calculator",
      description: "Quantify system-reality decoupling across personal, organizational, and societal scales. Get personalized intervention recommendations.",
      icon: <Activity className="w-6 h-6" />,
      href: "/interactive/insanity-quotient",
      status: 'available',
      complexity: 'beginner'
    },
    {
      title: "3D Triadic Space Navigator",
      description: "Navigate the Nature-Consciousness-Environment space in 3D. Plot system trajectories and explore equilibrium zones.",
      icon: <Brain className="w-6 h-6" />,
      href: "/interactive/triadic-space",
      status: 'coming-soon',
      complexity: 'advanced'
    },
    {
      title: "Temporal Scales Timeline",
      description: "Visualize characteristic time scales of biological, conscious, and environmental processes. Understand temporal mismatches.",
      icon: <Clock className="w-6 h-6" />,
      href: "/interactive/temporal-scales",
      status: 'coming-soon',
      complexity: 'intermediate'
    },
    {
      title: "Behavioral Sink Simulation",
      description: "Agent-based model of pathological behaviors emerging from symbolic complexity overload. Based on Calhoun's mouse utopia experiments.",
      icon: <Users className="w-6 h-6" />,
      href: "/interactive/behavioral-sink",
      status: 'coming-soon',
      complexity: 'advanced'
    },
    {
      title: "Constraint Framework Explorer",
      description: "Guided assessment using FORCES, GRAVITY, ANCHORS, and PRIMES frameworks. Generate diagnostic reports and interventions.",
      icon: <Filter className="w-6 h-6" />,
      href: "/interactive/constraint-explorer",
      status: 'coming-soon',
      complexity: 'intermediate'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Header */}
      <div className="border-b border-card-foreground/10 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-2xl font-bold" style={{ fontFamily: 'Fraunces, serif' }}>
              NiCE Framework
            </span>
          </Link>
          <nav className="flex gap-6">
            <Link href="/" className="text-card-foreground/70 hover:text-card-foreground transition-colors">
              Home
            </Link>
            <Link href="/interactive" className="text-consciousness font-medium">
              Interactive Lab
            </Link>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-consciousness/10 border border-consciousness/30 text-consciousness mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Interactive Learning Tools</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Fraunces, serif' }}>
            NiCE Framework
            <br />
            <span className="text-consciousness">Interactive Lab</span>
          </h1>
          
          <p className="text-xl text-card-foreground/70 max-w-3xl mx-auto mb-8">
            Transform abstract theory into experientially graspable insights. Explore triadic systems dynamics 
            through interactive visualizations, calculators, and simulations.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <div className="px-4 py-2 rounded-lg bg-card-foreground/5 border border-card-foreground/10">
              <div className="text-2xl font-bold text-nature">6</div>
              <div className="text-xs text-card-foreground/60">Visualizations</div>
            </div>
            <div className="px-4 py-2 rounded-lg bg-card-foreground/5 border border-card-foreground/10">
              <div className="text-2xl font-bold text-consciousness">12+</div>
              <div className="text-xs text-card-foreground/60">Historical Cases</div>
            </div>
            <div className="px-4 py-2 rounded-lg bg-card-foreground/5 border border-card-foreground/10">
              <div className="text-2xl font-bold text-environment">Real-time</div>
              <div className="text-xs text-card-foreground/60">Calculations</div>
            </div>
          </div>
        </div>

        {/* Visualizations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {visualizations.map((viz, idx) => (
            <VisualizationCard key={idx} {...viz} />
          ))}
        </div>

        {/* What You'll Learn Section */}
        <Card className="glass-card p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center" style={{ fontFamily: 'Fraunces, serif' }}>
            What You'll Learn
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-nature/10 border border-nature/30">
              <div className="text-nature text-3xl font-bold mb-2">N</div>
              <h3 className="text-lg font-semibold mb-2">Nature Domain</h3>
              <p className="text-sm text-card-foreground/70">
                Understand biological constraints, embodied cognition, and how physical reality grounds symbolic systems.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-consciousness/10 border border-consciousness/30">
              <div className="text-consciousness text-3xl font-bold mb-2">C</div>
              <h3 className="text-lg font-semibold mb-2">Consciousness Domain</h3>
              <p className="text-sm text-card-foreground/70">
                Explore narrative construction, meaning-making, and how symbols can decouple from substance.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-environment/10 border border-environment/30">
              <div className="text-environment text-3xl font-bold mb-2">E</div>
              <h3 className="text-lg font-semibold mb-2">Environment Domain</h3>
              <p className="text-sm text-card-foreground/70">
                Examine structural scaffolding, institutional inertia, and how built environments shape behavior.
              </p>
            </div>
          </div>
        </Card>

        {/* Getting Started */}
        <Card className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Fraunces, serif' }}>
            Getting Started
          </h2>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-consciousness/20 text-consciousness flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold mb-1">Start with the Basics</h4>
                <p className="text-sm text-card-foreground/70">
                  Begin with the <strong>Asymmetric Propagation Simulator</strong> or <strong>Insanity Quotient Calculator</strong>. 
                  These tools introduce core concepts with immediate, tangible insights.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-consciousness/20 text-consciousness flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold mb-1">Experiment Freely</h4>
                <p className="text-sm text-card-foreground/70">
                  Adjust parameters, load historical cases, and observe how systems respond. 
                  There's no wrong way to explore—the interactives are designed for discovery.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-consciousness/20 text-consciousness flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold mb-1">Apply to Real Scenarios</h4>
                <p className="text-sm text-card-foreground/70">
                  Use the tools to analyze personal situations, organizational dynamics, or societal trends. 
                  Export reports and share insights with others.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

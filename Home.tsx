/* Design Philosophy: Atmospheric Depth with Scholarly Elegance
 * Floating translucent content panels, twilight palette, contemplative pacing
 * Typography: Fraunces (display), Crimson Pro (body), Inter (subheads)
 */

import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Leaf, 
  Network, 
  ArrowRight, 
  BookOpen,
  Lightbulb,
  TrendingUp,
  Users,
  ChevronDown
} from "lucide-react";
import { AsymmetricPropagationDemo, InsanityQuotientDemo } from "@/components/InteractiveDemo";
import { AdvancedSearch } from "@/components/AdvancedSearch";
import NotificationCounter from "@/components/NotificationCounter";

export default function Home() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Atmospheric background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/framework-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Navigation */}
      <nav className="relative z-10 glass-card border-b border-border/50">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="https://lernaean.net/" title="Lernaean Research">
                <img 
                  src="/images/Lern_Logo.png" 
                  alt="Lernaean Research"
                  className="h-12 w-auto hover:opacity-80 transition-opacity"
                />
              </a>
              <a href="https://humanparadigm.org/" title="NiCE Framework">
                <img 
                  src="/images/NiCE_Framework_Logo.png" 
                  alt="NiCE Framework Logo"
                  className="h-14 w-auto hover:opacity-80 transition-opacity"
                />
              </a>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <NotificationCounter />
              <a 
                href="https://lernaen.org/"
                className="text-sm text-foreground hover:text-consciousness transition-colors font-medium"
              >
                Home
              </a>
              <a 
                href="/nice-framework.html"
                className="text-sm text-consciousness hover:text-consciousness-light transition-colors font-semibold"
              >
                NiCE Synthesis
              </a>
              <button 
                onClick={() => scrollToSection('framework')}
                className="text-sm text-foreground hover:text-consciousness transition-colors font-medium"
              >
                Framework
              </button>
              <button 
                onClick={() => scrollToSection('research')}
                className="text-sm text-foreground hover:text-consciousness transition-colors font-medium"
              >
                Research
              </button>
              <Link 
                href="/interactive"
                className="text-sm text-foreground hover:text-consciousness transition-colors font-medium"
              >
                Interactive Lab
              </Link>
              <button 
                onClick={() => scrollToSection('applications')}
                className="text-sm text-foreground hover:text-consciousness transition-colors font-medium"
              >
                Applications
              </button>
              <button 
                onClick={() => scrollToSection('publications')}
                className="text-sm text-foreground hover:text-consciousness transition-colors font-medium"
              >
                Publications
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center reveal-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 text-foreground">
              An Integrated Framework for Understanding Human Systems
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 leading-relaxed max-w-3xl mx-auto">
              The NiCE Framework proposes that human nature, consciousness, and environment are inseparably interdependent—a triadic system where symbols, particularly money, have decoupled from physical reality, creating cascading pathologies across individual psychology, institutional function, and ecological sustainability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center reveal-up reveal-delay-1">
              <a href="/nice-framework.html">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-nature via-consciousness to-environment hover:opacity-90 text-white font-semibold"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  NiCE Framework Synthesis
                </Button>
              </a>
              <Button 
                size="lg" 
                className="bg-consciousness hover:bg-consciousness-light text-white"
                onClick={() => scrollToSection('framework')}
              >
                Explore Overview
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-foreground/30 text-foreground hover:bg-foreground/5"
                onClick={() => scrollToSection('publications')}
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Read Publications
              </Button>
            </div>
          </div>

          {/* Hero Visual - Triadic System */}
          <div className="mt-20 max-w-5xl mx-auto reveal-up reveal-delay-2">
            <div className="relative">
              <img 
                src="/images/hero-triadic-system.png" 
                alt="The NiCE Triadic System: Nature, Consciousness, Environment"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-foreground/50" />
        </div>
      </section>

      {/* Core Framework Section */}
      <section id="framework" className="relative z-10 py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-4 text-foreground">
                The Triadic System
              </h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                Three inseparably interdependent domains that constitute human experience and shape civilizational dynamics
              </p>
            </div>

            {/* Interactive Triadic Nodes */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Nature Node */}
              <Card 
                className={`glass-card p-8 cursor-pointer transition-all duration-300 ${
                  activeNode === 'nature' ? 'scale-105 node-nature' : ''
                }`}
                onMouseEnter={() => setActiveNode('nature')}
                onMouseLeave={() => setActiveNode(null)}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-nature/20 flex items-center justify-center mb-4">
                    <Leaf className="w-8 h-8 text-nature" />
                  </div>
                  <h3 className="text-2xl mb-3 text-card-foreground" style={{ fontFamily: 'Fraunces, serif' }}>
                    Nature (N)
                  </h3>
                  <p className="text-card-foreground/80 leading-relaxed">
                    Embodied biological constraints and affordances. The substrate of human cognition—working memory limits, attention bandwidth, metabolic needs, and mortality.
                  </p>
                  {activeNode === 'nature' && (
                    <div className="mt-4 pt-4 border-t border-nature/30">
                      <p className="text-sm text-card-foreground/70 italic">
                        "Humans are embodied agents operating within biological parameters that cannot be transcended through will alone."
                      </p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Consciousness Node */}
              <Card 
                className={`glass-card p-8 cursor-pointer transition-all duration-300 ${
                  activeNode === 'consciousness' ? 'scale-105 node-consciousness' : ''
                }`}
                onMouseEnter={() => setActiveNode('consciousness')}
                onMouseLeave={() => setActiveNode(null)}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-consciousness/20 flex items-center justify-center mb-4">
                    <Brain className="w-8 h-8 text-consciousness" />
                  </div>
                  <h3 className="text-2xl mb-3 text-card-foreground" style={{ fontFamily: 'Fraunces, serif' }}>
                    Consciousness (C)
                  </h3>
                  <p className="text-card-foreground/80 leading-relaxed">
                    Narrative construction and meaning-making. Human memory reconstructs events through narrative frameworks that impose coherence, causality, and significance.
                  </p>
                  {activeNode === 'consciousness' && (
                    <div className="mt-4 pt-4 border-t border-consciousness/30">
                      <p className="text-sm text-card-foreground/70 italic">
                        "The narrative does not just interpret reality—it constitutes the reality the person lives in."
                      </p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Environment Node */}
              <Card 
                className={`glass-card p-8 cursor-pointer transition-all duration-300 ${
                  activeNode === 'environment' ? 'scale-105 node-environment' : ''
                }`}
                onMouseEnter={() => setActiveNode('environment')}
                onMouseLeave={() => setActiveNode(null)}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-environment/20 flex items-center justify-center mb-4">
                    <Network className="w-8 h-8 text-environment" />
                  </div>
                  <h3 className="text-2xl mb-3 text-card-foreground" style={{ fontFamily: 'Fraunces, serif' }}>
                    Environment (E)
                  </h3>
                  <p className="text-card-foreground/80 leading-relaxed">
                    Cultural, ecological, and institutional contexts. The systems and structures that shape available options, constrain choices, and mediate relationships.
                  </p>
                  {activeNode === 'environment' && (
                    <div className="mt-4 pt-4 border-t border-environment/30">
                      <p className="text-sm text-card-foreground/70 italic">
                        "Current civilization violates embodiment constraints systematically through information, decision, and social overload."
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Mutual Constitution */}
            <Card className="glass-card p-10">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-nature via-consciousness to-environment flex items-center justify-center flex-shrink-0">
                  <Network className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl mb-4 text-card-foreground" style={{ fontFamily: 'Fraunces, serif' }}>
                    Mutual Constitution
                  </h3>
                  <p className="text-card-foreground/80 leading-relaxed mb-4">
                    These three domains are not separate aspects that can be studied independently—they are mutually constitutive. Embodiment provides the substrate, needs, mortality, and vulnerability. Narrative provides temporal continuity, meaning structure, identity, and motivation. Environment provides choice architecture, learning opportunities, resource constraints, and social scaffolding.
                  </p>
                  <p className="text-card-foreground/80 leading-relaxed">
                    Remove any one component and the system collapses: disembodied narrative agents have no constraints or needs; non-narrative embodied beings lack temporal coherence; agents without environment have no context for choice or learning.
                  </p>
                </div>
              </div>
            </Card>          </div>

          {/* Search Bar */}
          <div className="mt-16 max-w-3xl mx-auto reveal-up reveal-delay-3">
            <div className="text-center mb-6">
              <p className="text-sm text-foreground/60">Search across all publications</p>
            </div>
            <AdvancedSearch />
          </div>
        </div>
      </section>

      {/* Core Framework Section */}      <section id="research" className="relative z-10 py-24 bg-background/50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-4 text-foreground">
                Core Theoretical Contributions
              </h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                Novel concepts and frameworks for understanding human systems dynamics
              </p>
            </div>

            <Tabs defaultValue="asymmetric" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 glass-card mb-8">
                <TabsTrigger value="asymmetric">Asymmetric Propagation</TabsTrigger>
                <TabsTrigger value="inversion">The Great Inversion</TabsTrigger>
                <TabsTrigger value="insanity">Insanity Quotient</TabsTrigger>
                <TabsTrigger value="frameworks">Constraint Frameworks</TabsTrigger>
              </TabsList>

              <TabsContent value="asymmetric">
                <Card className="glass-card p-10 mb-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-3xl mb-4 text-card-foreground" style={{ fontFamily: 'Fraunces, serif' }}>
                        The Asymmetric Propagation Law
                      </h3>
                      <p className="text-card-foreground/80 leading-relaxed mb-4">
                        Abstract symbolic systems propagate faster than physical reality can respond, creating systematic misalignment between representation and substance.
                      </p>
                      <p className="text-card-foreground/80 leading-relaxed mb-4">
                        Financial derivatives can be created instantaneously through digital transactions, but the underlying assets (farmland, factories, natural resources) require years or decades to produce. This speed differential enables symbolic systems to decouple from material constraints.
                      </p>
                      <div className="flex items-center gap-3 text-sm text-card-foreground/60 mt-6">
                        <TrendingUp className="w-5 h-5" />
                        <span>Testable through temporal analysis of symbol-to-substance ratios</span>
                      </div>
                    </div>
                    <div>
                      <img 
                        src="/images/K8LNUOYJS1LB.jpg" 
                        alt="Network visualization showing asymmetric propagation"
                        className="rounded-xl shadow-lg"
                      />
                    </div>
                  </div>
                </Card>
                
                {/* Interactive Demo */}
                <AsymmetricPropagationDemo />
              </TabsContent>

              <TabsContent value="inversion">
                <Card className="glass-card p-10">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <img 
                        src="/images/7tzDMPFRsKhH.jpg" 
                        alt="Earth systems showing inversion of priorities"
                        className="rounded-xl shadow-lg"
                      />
                    </div>
                    <div>
                      <h3 className="text-3xl mb-4 text-card-foreground" style={{ fontFamily: 'Fraunces, serif' }}>
                        The Great Inversion
                      </h3>
                      <p className="text-card-foreground/80 leading-relaxed mb-4">
                        A civilizational-scale phenomenon where symbols have displaced reality as the primary reference point for decision-making and resource allocation.
                      </p>
                      <p className="text-card-foreground/80 leading-relaxed mb-4">
                        Markets respond to monetary signals rather than ecological limits. Institutions optimize for abstract metrics (GDP, stock prices) while ignoring physical constraints (soil depletion, biodiversity loss, climate destabilization). The map has eaten the territory.
                      </p>
                      <div className="flex items-center gap-3 text-sm text-card-foreground/60 mt-6">
                        <Lightbulb className="w-5 h-5" />
                        <span>Observable through behavioral sink symptoms at scale</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="insanity">
                <Card className="glass-card p-10 mb-8">
                  <h3 className="text-3xl mb-6 text-card-foreground" style={{ fontFamily: 'Fraunces, serif' }}>
                    The Insanity Quotient (IQ)
                  </h3>
                  <p className="text-card-foreground/80 leading-relaxed mb-6">
                    A proposed metric for measuring the degree of misalignment between symbolic representations and physical reality within a system. Higher IQ values indicate greater decoupling and increased systemic fragility.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-lg bg-card-foreground/5 border border-card-foreground/10">
                      <h4 className="font-semibold mb-2 text-card-foreground">Primary Markers</h4>
                      <ul className="text-sm text-card-foreground/70 space-y-1">
                        <li>• Symbol-to-substance ratios</li>
                        <li>• Temporal lag measurements</li>
                        <li>• Resource flow mismatches</li>
                      </ul>
                    </div>
                    <div className="p-6 rounded-lg bg-card-foreground/5 border border-card-foreground/10">
                      <h4 className="font-semibold mb-2 text-card-foreground">Secondary Indicators</h4>
                      <ul className="text-sm text-card-foreground/70 space-y-1">
                        <li>• Behavioral sink symptoms</li>
                        <li>• Institutional dysfunction</li>
                        <li>• Ecological overshoot</li>
                      </ul>
                    </div>
                    <div className="p-6 rounded-lg bg-card-foreground/5 border border-card-foreground/10">
                      <h4 className="font-semibold mb-2 text-card-foreground">Applications</h4>
                      <ul className="text-sm text-card-foreground/70 space-y-1">
                        <li>• Financial system diagnosis</li>
                        <li>• Policy evaluation</li>
                        <li>• Intervention design</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                {/* Interactive Demo */}
                <InsanityQuotientDemo />
              </TabsContent>

              <TabsContent value="frameworks">
                <Card className="glass-card p-10">
                  <h3 className="text-3xl mb-6 text-card-foreground" style={{ fontFamily: 'Fraunces, serif' }}>
                    S.C.I.E.N.C.E. Constraint Frameworks
                  </h3>
                  <p className="text-card-foreground/80 leading-relaxed mb-8">
                    A layered diagnostic architecture for understanding systemic constitution, mechanics, logic, drift, and prevention.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-nature/20 flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-nature">F</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-1 text-card-foreground">FORCES</h4>
                        <p className="text-card-foreground/70">Fundamental vectors acting on systems—the directional pressures that shape behavior and outcomes.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-consciousness/20 flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-consciousness">G</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-1 text-card-foreground">GRAVITY</h4>
                        <p className="text-card-foreground/70">The field of systemic inevitability—structural constraints that pull systems toward particular attractors.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-environment/20 flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-environment">A</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-1 text-card-foreground">ANCHORS</h4>
                        <p className="text-card-foreground/70">Stabilizing vectors of reality—the fixed points that prevent complete symbolic drift.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-nature/20 flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-nature">P</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-1 text-card-foreground">PRIMES</h4>
                        <p className="text-card-foreground/70">Fundamental constraints of reality—irreducible limits that cannot be negotiated or abstracted away.</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section id="applications" className="relative z-10 py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-4 text-foreground">
                Real-World Applications
              </h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                From individual psychology to civilizational dynamics—the framework provides diagnostic and prescriptive tools across scales
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="glass-card p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-consciousness/20 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-consciousness" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-card-foreground">Depression as Triadic Phenomenon</h3>
                    <p className="text-sm text-card-foreground/60">Individual Psychology</p>
                  </div>
                </div>
                <p className="text-card-foreground/80 leading-relaxed mb-4">
                  Depression emerges from misalignment across all three domains: biological dysregulation (Nature), narrative distortion (Consciousness), and environmental stressors (Environment). Effective intervention requires addressing all three simultaneously.
                </p>
                <div className="text-sm text-card-foreground/60 italic">
                  "You cannot think your way out of a systemic biological state any more than you can think your way out of diabetes."
                </div>
              </Card>

              <Card className="glass-card p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-nature/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-nature" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-card-foreground">2008 Financial Crisis</h3>
                    <p className="text-sm text-card-foreground/60">Institutional Dysfunction</p>
                  </div>
                </div>
                <p className="text-card-foreground/80 leading-relaxed mb-4">
                  The crisis exemplifies asymmetric propagation: derivatives (symbols) proliferated exponentially while underlying assets (substance) remained constrained. When the symbolic structure collapsed, it revealed the massive decoupling from physical reality.
                </p>
                <div className="text-sm text-card-foreground/60 italic">
                  "Leverage without energetic cost enables unlimited exploration—until reality reasserts itself."
                </div>
              </Card>

              <Card className="glass-card p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-environment/20 flex items-center justify-center flex-shrink-0">
                    <Network className="w-6 h-6 text-environment" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-card-foreground">Behavioral Sink at Scale</h3>
                    <p className="text-sm text-card-foreground/60">Civilizational Dynamics</p>
                  </div>
                </div>
                <p className="text-card-foreground/80 leading-relaxed mb-4">
                  Modern civilization exhibits behavioral sink symptoms: declining fertility, social withdrawal, institutional dysfunction, and ecological collapse. These emerge when symbolic abundance masks resource scarcity, triggering maladaptive responses.
                </p>
                <div className="text-sm text-card-foreground/60 italic">
                  "Monetary expansion creates perceived abundance while masking ecological depletion signals."
                </div>
              </Card>

              <Card className="glass-card p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-consciousness/20 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-6 h-6 text-consciousness" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-card-foreground">Post-Collapse Recovery</h3>
                    <p className="text-sm text-card-foreground/60">Prescriptive Design</p>
                  </div>
                </div>
                <p className="text-card-foreground/80 leading-relaxed mb-4">
                  The framework provides design principles for civilizational architecture aligned with ecological reality and human psychology: polycentric governance, metabolic constraints on leverage, and symbol-substance coupling mechanisms.
                </p>
                <div className="text-sm text-card-foreground/60 italic">
                  "Design must respect hardware limits or systems will predictably fail."
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="relative z-10 py-24 bg-background/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-4 text-foreground">
                Research Publications
              </h2>
              <p className="text-xl text-foreground/70">
                Comprehensive documentation of the framework's development and applications
              </p>
            </div>

            <div className="space-y-6">
              <Link href="/publications/human_paradigm">
              <Card className="glass-card p-8 hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-consciousness to-nature flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl mb-2 text-card-foreground" style={{ fontFamily: 'Fraunces, serif' }}>
                      The Human Paradigm
                    </h3>
                    <p className="text-sm text-card-foreground/60 mb-3">
                      An Integrated Framework of Nature, Consciousness, and Environment (NiCE) for Troubleshooting and Redesigning Individual Humans and their Systems
                    </p>
                    <p className="text-card-foreground/80 leading-relaxed mb-4">
                      Formal presentation of the triadic framework with measurement programs, testable predictions, and constraint frameworks (FORCES, GRAVITY, ANCHORS, PRIMES). Includes analysis of symbolic drift, monetary systems, and implementation protocols.
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-card-foreground/60">R.D. Kitcey, 2025</span>
                      <span className="text-card-foreground/60">•</span>
                      <span className="text-card-foreground/60">251 pages</span>
                      <span className="text-card-foreground/60">•</span>
                      <span className="text-card-foreground/60">v1.8.4</span>
                    </div>
                  </div>
                </div>
              </Card>
              </Link>

              <Link href="/publications/advanced_analysis">
              <Card className="glass-card p-8 hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-nature to-environment flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl mb-2 text-card-foreground" style={{ fontFamily: 'Fraunces, serif' }}>
                      Intellectual Progression and Philosophical Development
                    </h3>
                    <p className="text-sm text-card-foreground/60 mb-3">
                      A Comprehensive Advanced Analytical Treatment
                    </p>
                    <p className="text-card-foreground/80 leading-relaxed mb-4">
                      Deep analytical treatment of six major works with extensive working examples, mechanistic explanations, and practical implications. Traces the intellectual journey through pattern recognition, framework formalization, diagnostic synthesis, and prescriptive design phases.
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-card-foreground/60">R.D. Kitcey, 2026</span>
                      <span className="text-card-foreground/60">•</span>
                      <span className="text-card-foreground/60">218 pages</span>
                      <span className="text-card-foreground/60">•</span>
                      <span className="text-card-foreground/60">v0.71</span>
                    </div>
                  </div>
                </div>
              </Card>
              </Link>

              <Link href="/publications/human_essence">
              <Card className="glass-card p-8 hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-environment to-consciousness flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl mb-2 text-card-foreground" style={{ fontFamily: 'Fraunces, serif' }}>
                      The Human Essence
                    </h3>
                    <p className="text-sm text-card-foreground/60 mb-3">
                      An AI Perspective on Human Nature
                    </p>
                    <p className="text-card-foreground/80 leading-relaxed mb-4">
                      Foundational analysis utilizing AI methodologies to examine human cognitive architecture, social behavior, cultural evolution, and meaning-making processes. Establishes humans as embodied narrative agents engaged in collective meaning-making through symbolic systems.
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-card-foreground/60">R. Kitcey & Manus AI, 2024</span>
                      <span className="text-card-foreground/60">•</span>
                      <span className="text-card-foreground/60">153 pages</span>
                      <span className="text-card-foreground/60">•</span>
                      <span className="text-card-foreground/60">v0.9</span>
                    </div>
                  </div>
                </div>
              </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-border/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-3 text-foreground" style={{ fontFamily: 'Fraunces, serif' }}>
                  The NiCE Framework
                </h4>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  An integrated approach to understanding human systems through the inseparable interdependence of Nature, Consciousness, and Environment.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-foreground" style={{ fontFamily: 'Fraunces, serif' }}>
                  Research
                </h4>
                <ul className="space-y-2 text-sm text-foreground/60">
                  <li>Robert D. Kitcey</li>
                  <li>Independent Research</li>
                  <li>Las Cruces, New Mexico, USA</li>
                  <li>ORCID: 0009-0004-8679-9155</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-foreground" style={{ fontFamily: 'Fraunces, serif' }}>
                  Contact
                </h4>
                <p className="text-sm text-foreground/60">
                  rkitcey@gmail.com
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-border/30 text-center text-sm text-foreground/50">
              <p>© 2026 Robert D. Kitcey. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

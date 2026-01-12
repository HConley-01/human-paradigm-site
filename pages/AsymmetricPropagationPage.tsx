/**
 * Asymmetric Propagation Interactive Page
 */

import { Link } from "wouter";
import { AsymmetricPropagationSimulator } from "@/components/interactive/AsymmetricPropagationSimulator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function AsymmetricPropagationPage() {
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

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/interactive">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Interactive Lab
          </Link>
        </Button>

        <AsymmetricPropagationSimulator />
      </div>
    </div>
  );
}

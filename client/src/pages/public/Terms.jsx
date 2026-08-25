import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-obsidian text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">Terms of Commission & Service</h1>
        <p className="text-xs text-gold-400 font-mono">Last Updated: January 2026</p>

        <div className="prose prose-invert max-w-none text-xs text-neutral-300 font-light leading-relaxed space-y-6">
          <p>
            Welcome to Lumière Studios. By commissioning our studio for photography, cinematography, and media production services, you agree to the following bespoke terms and standards.
          </p>

          <h3 className="font-serif text-xl font-bold text-white pt-4">1. Date Retention & Advance</h3>
          <p>
            Wedding dates are officially confirmed and blocked only upon receipt of the 25% non-refundable booking retainer and signed commission agreement.
          </p>

          <h3 className="font-serif text-xl font-bold text-white pt-4">2. Artistic Discretion & Color Grading</h3>
          <p>
            The studio retains complete artistic discretion regarding composition, lighting, and color grading in accordance with the signature Lumière luxury editorial aesthetic shown in our public portfolio.
          </p>

          <h3 className="font-serif text-xl font-bold text-white pt-4">3. Deliverable Timelines</h3>
          <p>
            Social media sneak peek previews are delivered within 72 hours. Complete master high-resolution archives and 4K docu-films are delivered within 4 to 8 weeks of final event completion.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;

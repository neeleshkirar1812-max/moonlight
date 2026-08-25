import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-obsidian text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">Privacy Charter & Client Protection</h1>
        <p className="text-xs text-gold-400 font-mono">Last Updated: January 2026</p>

        <div className="prose prose-invert max-w-none text-xs text-neutral-300 font-light leading-relaxed space-y-6">
          <p>
            At Lumière Studios, we treat high-profile client privacy and data discretion with paramount importance. We understand that royal families, celebrities, and prominent couples require absolute non-disclosure and secure digital asset protection.
          </p>

          <h3 className="font-serif text-xl font-bold text-white pt-4">1. Private Gallery Confidentiality</h3>
          <p>
            All private proofing and master high-resolution archives are encrypted and isolated on dedicated cloud infrastructure. Galleries are PIN-protected and accessible exclusively by verified client credentials. We never publish photographs without written client consent.
          </p>

          <h3 className="font-serif text-xl font-bold text-white pt-4">2. Non-Disclosure Agreements (NDAs)</h3>
          <p>
            For ultra-private celebrations, we execute stringent bilateral Non-Disclosure Agreements prohibiting any social media posting, crew geotagging, or third-party press release distribution.
          </p>

          <h3 className="font-serif text-xl font-bold text-white pt-4">3. Payment & Transaction Security</h3>
          <p>
            Online financial transactions are processed securely via Razorpay in compliance with PCI-DSS standards. We never store credit card numbers or raw bank details on our servers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

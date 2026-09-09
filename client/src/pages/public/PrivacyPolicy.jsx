import React from 'react';
import SEO from '../../components/common/SEO';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <SEO
        title="Privacy Charter & Confidentiality Policy"
        description="Learn how Moonlight Production protects high-profile client privacy, non-disclosure agreements (NDAs), and secure digital galleries."
      />
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-900">Privacy Charter & Client Protection</h1>
        <p className="text-xs text-amber-700 font-mono font-bold">Last Updated: January 2026</p>

        <div className="prose max-w-none text-xs sm:text-sm text-neutral-700 font-normal leading-relaxed space-y-6">
          <p>
            At Moonlight Production, we treat high-profile client privacy and data discretion with paramount importance. We understand that royal families, celebrities, and prominent couples require absolute non-disclosure and secure digital asset protection.
          </p>

          <h3 className="font-serif text-xl font-bold text-neutral-900 pt-4">1. Private Gallery Confidentiality</h3>
          <p>
            All private proofing and master high-resolution archives are encrypted and isolated on dedicated cloud infrastructure. Galleries are PIN-protected and accessible exclusively by verified client credentials. We never publish photographs without written client consent.
          </p>

          <h3 className="font-serif text-xl font-bold text-neutral-900 pt-4">2. Non-Disclosure Agreements (NDAs)</h3>
          <p>
            For ultra-private celebrations, we execute stringent bilateral Non-Disclosure Agreements prohibiting any social media posting, crew geotagging, or third-party press release distribution.
          </p>

          <h3 className="font-serif text-xl font-bold text-neutral-900 pt-4">3. Payment & Transaction Security</h3>
          <p>
            Online financial transactions are processed securely via Razorpay in compliance with PCI-DSS standards. We never store credit card numbers or raw bank details on our servers.
          </p>

          <h3 className="font-serif text-xl font-bold text-neutral-900 pt-4">4. Legal Entity & Regulatory Compliance</h3>
          <p>
            <strong>Moonlight Production</strong> is a sole proprietorship enterprise registered under the Government of India Ministry of MSME and Goods and Services Tax (GST). 
            <br />
            <strong>Legal Proprietor:</strong> Raksha Rathore | <strong>GSTIN:</strong> 23DHNPR9293D1ZT | <strong>MSME Udyam:</strong> UDYAM-MP-10-0119118
            <br />
            <strong>Registered Office:</strong> C 37, Pallavi Nagar, Rohit Nagar, Bawaria Kalan, Bhopal, Madhya Pradesh - 462039.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

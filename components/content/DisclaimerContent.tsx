
import React from 'react';

const DisclaimerContent: React.FC = () => {
  return (
    <div>
      <p className="!mt-0">
        <strong>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
      </p>
      <p>
        The information provided by Domain Trend Analyzer (the "Service") is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
      </p>

      <h3>No Financial Advice</h3>
      <p>
        The AI-powered valuation scores, rationales, tags, and generated domain names are provided as-is and are based on algorithms and publicly available data. This information is not intended to be, and should not be construed as, financial, investment, or legal advice. You should not make any decision, financial, investment, or otherwise, based on any of the information presented by this Service without undertaking independent due diligence and consultation with a professional broker or financial advisory.
      </p>
      
      <h3>Domain Availability</h3>
      <p>
        The domain availability checker uses public DNS records to estimate whether a domain is available. This check is not a guarantee of availability. Domain registration status can change in real-time. The final determination of a domain's availability can only be made through an accredited domain registrar at the time of purchase.
      </p>

      <h3>External Links Disclaimer</h3>
      <p>
        The Service may contain (or you may be sent through the Service) links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
      </p>

      <p>
        UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE. YOUR USE OF THE SITE AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE IS SOLELY AT YOUR OWN RISK.
      </p>
    </div>
  );
};

export default DisclaimerContent;

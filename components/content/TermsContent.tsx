
import React from 'react';

const TermsContent: React.FC = () => {
  return (
    <div>
      <p className="!mt-0">
        <strong>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
      </p>
      <p>
        Please read these Terms of Service ("Terms") carefully before using the Domain Trend Analyzer website (the "Service") operated by us ("us", "we", or "our"). Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who wish to access or use the Service.
      </p>
      
      <h3>1. Use of Service</h3>
      <p>
        By using the Service, you agree not to use it for any unlawful purpose or in any way that could damage, disable, overburden, or impair the Service. The Service provides AI-generated analysis, domain suggestions, and valuation scores for informational purposes only. This information does not constitute financial or investment advice. You are solely responsible for any decisions or actions you take based on the information provided by the Service. We do not guarantee the availability or accuracy of any domain names suggested.
      </p>

      <h3>2. Intellectual Property</h3>
      <p>
        The Service and its original content (excluding data provided by users), features, and functionality are and will remain the exclusive property of Domain Trend Analyzer and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks may not be used in connection with any product or service without our prior written consent.
      </p>
      
      <h3>3. Links to Other Web Sites</h3>
      <p>
        Our Service may contain links to third-party web sites or services that are not owned or controlled by us, such as domain registrars. We have no control over, and assume no responsibility for the content, privacy policies, or practices of any third-party web sites or services. You further acknowledge and agree that we shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.
      </p>

      <h3>4. Limitation of Liability</h3>
      <p>
        In no event shall Domain Trend Analyzer, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.
      </p>

      <h3>5. Changes</h3>
      <p>
        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
      </p>
      
      <h3>Contact Us</h3>
      <p>If you have any questions about these Terms, please contact us at contact@domaintrendanalyzer.com.</p>
    </div>
  );
};

export default TermsContent;

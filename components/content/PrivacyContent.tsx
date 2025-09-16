import React from 'react';

const PrivacyContent: React.FC = () => {
  return (
    <div>
      <p className="!mt-0">
        <strong>Last Updated: {new Date().toLocaleDateString()}</strong>
      </p>
      <p>
        Your privacy is important to us. It is Domain Trend Analyzer's policy to respect your privacy regarding any information we may collect from you across our website.
      </p>

      <h3>1. Information We Collect</h3>
      <p>
        We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used. For example, the text you paste into our analyzer is processed to provide the service but is not stored on our servers long-term.
      </p>

      <h3>2. How We Use Your Information</h3>
      <p>
        We use the information we collect in various ways, including to:
      </p>
      <ul>
        <li>Provide, operate, and maintain our website</li>
        <li>Improve, personalize, and expand our website</li>
        <li>Understand and analyze how you use our website</li>
        <li>Communicate with you for customer service, updates, and other information relating to the website</li>
      </ul>

      <h3>3. Log Files & Cookies</h3>
      <p>
        Domain Trend Analyzer follows a standard procedure of using log files. We may use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
      </p>

      <h3>4. Third-Party Services</h3>
      <p>
        We may use third-party services such as Google AdSense to serve advertising and Google Analytics to monitor and analyze the use of our Service. These third parties may use cookies to collect information about your visits to this and other websites in order to provide relevant advertisements about goods and services of interest to you.
      </p>
      
      <h3>5. Your Rights</h3>
      <p>
        You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.
      </p>

      <p className="p-4 bg-red-900/50 border border-red-500 rounded-md mt-6">
        <em><strong>Disclaimer for AdSense Approval:</strong> This is a generic, placeholder privacy policy. It is <strong>NOT</strong> legal advice. You <strong>must</strong> consult with a legal professional to create a policy that is compliant with laws like GDPR and CCPA and accurately reflects your specific data handling practices. A comprehensive and accurate privacy policy is a strict requirement for AdSense.</em>
      </p>
    </div>
  );
};

export default PrivacyContent;

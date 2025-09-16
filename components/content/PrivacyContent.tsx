
import React from 'react';

const PrivacyContent: React.FC = () => {
  return (
    <div>
      <p className="!mt-0">
        <strong>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
      </p>
      <p>
        Domain Trend Analyzer ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
      </p>

      <h3>1. Information We Collect</h3>
      <p>
        We may collect information about you in a variety of ways. The information we may collect on the Site includes:
      </p>
      <ul>
        <li>
            <strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the Site.
        </li>
        <li>
            <strong>User-Provided Data:</strong> Any text or domain lists that you paste into our analysis tool are processed in real-time to provide the service. This data is not stored or logged on our servers after the analysis is complete. If you choose to contact us via email, we will collect your email address and any information you provide in your message.
        </li>
      </ul>

      <h3>2. How We Use Your Information</h3>
      <p>
        Having accurate information permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
      </p>
      <ul>
        <li>Provide, operate, and maintain our website and its services.</li>
        <li>Improve, personalize, and expand our website.</li>
        <li>Understand and analyze how you use our website.</li>
        <li>Respond to your comments, questions, and provide customer service.</li>
        <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
      </ul>

      <h3>3. Cookies and Web Beacons</h3>
      <p>
        We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience. When you access the Site, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Site.
      </p>
      
      <h3>4. Third-Party Advertising</h3>
      <p>
        We may use third-party advertising companies to serve ads when you visit the Site. These companies, such as Google AdSense, may use information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you. If you would like more information about this practice and to know your choices about not having this information used by these companies, see the Network Advertising Initiative's consumer website.
      </p>

      <h3>5. Security of Your Information</h3>
      <p>
        We use administrative, technical, and physical security measures to help protect your information. While we have taken reasonable steps to secure the information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
      </p>

      <h3>Contact Us</h3>
      <p>If you have questions or comments about this Privacy Policy, please contact us at contact@domaintrendanalyzer.com.</p>
    </div>
  );
};

export default PrivacyContent;

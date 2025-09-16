
import React from 'react';

const ContactContent: React.FC = () => {
  return (
    <div>
      <p className="!mt-0">
        We'd love to hear from you! Whether you have a question about our features, feedback on the tool, or a partnership inquiry, please don't hesitate to reach out. 
      </p>
      <p>
        As a small team, email is the best way to get in touch with us. We do our best to respond to all inquiries within 48 hours.
      </p>
      
      <h3>Get in Touch</h3>
      <p>
        For all inquiries, please email us at:
      </p>
      <p>
        <a href="mailto:contact@domaintrendanalyzer.com" className="font-semibold text-brand-secondary hover:text-brand-primary">
          contact@domaintrendanalyzer.com
        </a>
      </p>

      <p>We look forward to hearing from you!</p>
    </div>
  );
};

export default ContactContent;

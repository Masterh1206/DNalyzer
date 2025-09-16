import React from 'react';

const ContactContent: React.FC = () => {
  return (
    <div>
      <p className="!mt-0">
        We'd love to hear from you! Whether you have a question, feedback, or a partnership inquiry, please don't hesitate to reach out. For a functional contact form, please connect this to a backend service. Alternatively, you can provide a direct email address here.
      </p>
      <p>
        For inquiries, please email us at: <strong>contact@domaintrendanalyzer.com</strong>
      </p>
       <p>
        <em><strong>Note for AdSense Approval:</strong> A functional contact page with clear contact information is a positive signal for AdSense. The form below is a non-functional placeholder. You must connect it to a backend service (e.g., Formspree, Netlify Forms) or remove it and provide a valid email address to receive submissions.</em>
      </p>
      <form className="space-y-4 mt-6 opacity-50">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <input type="text" id="name" name="name" disabled className="mt-1 block w-full bg-brand-bg border border-brand-border rounded-md p-2 text-sm" placeholder="Your Name" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
          <input type="email" id="email" name="email" disabled className="mt-1 block w-full bg-brand-bg border border-brand-border rounded-md p-2 text-sm" placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">Message</label>
          <textarea id="message" name="message" rows={4} disabled className="mt-1 block w-full bg-brand-bg border border-brand-border rounded-md p-2 text-sm" placeholder="How can we help?"></textarea>
        </div>
        <div>
          <button type="submit" disabled className="bg-brand-primary text-white font-bold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
            Send Message (Disabled)
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactContent;

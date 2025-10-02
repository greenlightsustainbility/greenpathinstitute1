import React, { useState } from 'react';
import Icon from '../../../components/AppIcon.jsx';

const PricingFAQ = ({ className = '' }) => {
  const [openItems, setOpenItems] = useState(new Set([0])); // First item open by default

  const faqItems = [
    {
      question: "What payment methods do you accept?",
      answer: `We accept multiple payment methods to serve our global audience:\n• Credit/Debit Cards (Visa, Mastercard, American Express) via Stripe\n• Nigerian bank transfers and cards via Paystack\n• African mobile money and bank transfers via Flutterwave\n• All payments are processed securely with SSL encryption and fraud protection.`
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: `Yes! We offer a 7-day money-back guarantee on all individual course purchases. To request a refund:\n• Contact our support team within 7 days of purchase\n• Provide your order number and reason for refund\n• Refunds are processed within 5-10 business days\n• Note: Bundle purchases and enterprise plans have different refund terms.`
    },
    {
      question: "How do bulk discounts work for organizations?",
      answer: `Our bulk pricing automatically applies based on the number of enrollments:\n• 4-9 staff members: 15% discount\n• 10-49 staff members: 25% discount\n• 50+ staff members: 40% discount\n• Enterprise (100+): Custom pricing with additional benefits\n• Discounts apply to the total order value and can be combined with certain promotional codes.`
    },
    {
      question: "Are certificates included in all pricing tiers?",
      answer: `Yes, all paid courses include official certificates upon completion:\n• Individual courses: 1 certificate per completed course\n• Bundles: Certificates for each course in the bundle\n• Enterprise plans: Unlimited certificates for enrolled staff\n• All certificates are digitally verifiable with unique QR codes and can be downloaded as PDFs.`
    },
    {
      question: "Can I upgrade or change my plan later?",
      answer: `Absolutely! You can upgrade your plan at any time:\n• Individual to Bundle: Pay the difference with existing discount applied\n• Add more team members: Automatic bulk discount recalculation\n• Enterprise upgrade: Contact our sales team for custom migration\n• Downgrades are handled case-by-case - contact support for assistance.`
    },
    {
      question: "Do you offer payment plans or installments?",
      answer: `Yes, we offer flexible payment options:\n• Individual courses: Full payment or 3-month installment plan\n• Bundles: Up to 6-month installment plans available\n• Enterprise plans: Custom payment schedules (quarterly, annual)\n• Installment plans may include a small processing fee\n• Contact our sales team to set up a payment plan that works for your budget.`
    },
    {
      question: "What happens if I don't complete a course?",
      answer: `Your course access and progress are preserved:\n• Lifetime access to purchased courses (individual and bundles)\n• Progress is automatically saved and synced across devices\n• No time limits for course completion\n• Access to updated course content and materials\n• Certificates are issued only upon successful completion of all course requirements.`
    },
    {
      question: "Are there any hidden fees or additional costs?",
      answer: `No hidden fees! Our pricing is transparent:\n• Course prices include all content, quizzes, and certificates\n• Payment processing fees are included in the listed price\n• No monthly or annual subscription fees for purchased courses\n• Optional add-ons (like 1-on-1 mentoring) are clearly marked\n• Enterprise plans may include optional premium support services.`
    }
  ];

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems?.has(index)) {
      newOpenItems?.delete(index);
    } else {
      newOpenItems?.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className={`bg-card border border-border rounded-xl p-6 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="font-heading font-bold text-2xl text-card-foreground mb-2">
          Frequently Asked Questions
        </h3>
        <p className="text-text-secondary">
          Everything you need to know about our pricing and policies
        </p>
      </div>
      <div className="space-y-4">
        {faqItems?.map((item, index) => (
          <div key={index} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted transition-colors duration-200"
            >
              <span className="font-body font-semibold text-card-foreground pr-4">
                {item?.question}
              </span>
              <Icon 
                name={openItems?.has(index) ? "ChevronUp" : "ChevronDown"} 
                size={20} 
                className="text-text-secondary flex-shrink-0" 
              />
            </button>
            
            {openItems?.has(index) && (
              <div className="px-6 pb-4">
                <div className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
                  {item?.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border text-center">
        <p className="text-text-secondary text-sm mb-3">
          Still have questions about our pricing?
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Mail" size={16} />
            <span>support@greenpathinstitute.com</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Phone" size={16} />
            <span>+234 (0) 123 456 7890</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingFAQ;
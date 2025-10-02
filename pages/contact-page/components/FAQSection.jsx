import React, { useState } from 'react';
import Icon from '../../../components/AppIcon.jsx';

const FAQSection = () => {
  const [openItems, setOpenItems] = useState(new Set([0])); // First item open by default

  const faqData = [
    {
      category: 'Courses & Enrollment',
      questions: [
        {
          question: 'How do I enroll in a course?',
          answer: `You can enroll in any course by visiting our course listing page, selecting your desired course, and clicking "Enroll Now". You'll be guided through the payment process and gain immediate access to the course materials upon successful payment.`
        },
        {
          question: 'Are the courses self-paced or instructor-led?',answer: `All our courses are self-paced, allowing you to learn at your own convenience. However, some courses include live Q&A sessions and webinars with instructors. You'll have lifetime access to course materials once enrolled.`
        },
        {
          question: 'What prerequisites are required for ESG courses?',
          answer: `Most of our beginner courses require no prerequisites. Intermediate and advanced courses may require basic knowledge of sustainability concepts or relevant work experience. Prerequisites are clearly listed on each course page.`
        }
      ]
    },
    {
      category: 'Pricing & Payments',
      questions: [
        {
          question: 'What currencies do you accept?',
          answer: `We accept multiple currencies including USD, EUR, GBP, NGN (Nigerian Naira), ZAR (South African Rand), and KES (Kenyan Shilling). Prices are automatically converted based on current exchange rates.`
        },
        {
          question: 'Do you offer bulk discounts for organizations?',
          answer: `Yes! We offer significant bulk discounts: 15% for 4-9 employees, 25% for 10-49 employees, and 40% for 50+ employees. Contact our enterprise team for custom pricing and additional services.`
        },
        {
          question: 'What payment methods do you accept?',
          answer: `We accept major credit cards, PayPal, and local payment methods including Paystack and Flutterwave for African markets. All payments are processed securely with industry-standard encryption.`
        }
      ]
    },
    {
      category: 'Certificates & Verification',
      questions: [
        {
          question: 'Will I receive a certificate upon completion?',
          answer: `Yes, you'll receive a verified digital certificate upon successful completion of each course. Certificates include a unique verification code and QR code for authenticity verification.`
        },
        {
          question: 'How can employers verify my certificate?',
          answer: `Employers can verify certificates using our public verification system at /certificate-verification. They simply need to enter the certificate ID or scan the QR code to confirm authenticity.`
        },
        {
          question: 'Are your certificates recognized by employers?',
          answer: `Our certificates are recognized by leading organizations across Africa and globally. We maintain partnerships with industry bodies and our curriculum is developed by certified ESG professionals.`
        }
      ]
    },
    {
      category: 'Technical Support',
      questions: [
        {
          question: 'What technical requirements do I need?',
          answer: `You need a stable internet connection, a modern web browser (Chrome, Firefox, Safari, or Edge), and basic computer skills. Our platform works on desktop, tablet, and mobile devices.`
        },
        {
          question: 'Can I access courses on mobile devices?',
          answer: `Yes, our platform is fully responsive and optimized for mobile learning. You can access all course materials, videos, and quizzes on your smartphone or tablet.`
        },
        {
          question: 'What if I experience technical issues?',
          answer: `Our technical support team is available during business hours to help resolve any issues. You can contact us via email, phone, or our live chat system for immediate assistance.`
        }
      ]
    }
  ];

  const toggleItem = (categoryIndex, questionIndex) => {
    const itemKey = `${categoryIndex}-${questionIndex}`;
    const newOpenItems = new Set(openItems);
    
    if (newOpenItems?.has(itemKey)) {
      newOpenItems?.delete(itemKey);
    } else {
      newOpenItems?.add(itemKey);
    }
    
    setOpenItems(newOpenItems);
  };

  const isItemOpen = (categoryIndex, questionIndex) => {
    return openItems?.has(`${categoryIndex}-${questionIndex}`);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 lg:p-8">
      <div className="mb-8">
        <h2 className="font-heading font-semibold text-2xl text-card-foreground mb-2">
          Frequently Asked Questions
        </h2>
        <p className="font-body text-text-secondary">
          Find answers to common questions about our courses, pricing, and platform.
        </p>
      </div>
      <div className="space-y-6">
        {faqData?.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-4">
            <h3 className="font-heading font-semibold text-lg text-card-foreground border-b border-border pb-2">
              {category?.category}
            </h3>
            
            <div className="space-y-3">
              {category?.questions?.map((faq, questionIndex) => {
                const isOpen = isItemOpen(categoryIndex, questionIndex);
                
                return (
                  <div
                    key={questionIndex}
                    className="border border-border rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(categoryIndex, questionIndex)}
                      className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-muted transition-colors duration-200"
                    >
                      <span className="font-body font-medium text-sm text-card-foreground pr-4">
                        {faq?.question}
                      </span>
                      <Icon
                        name={isOpen ? 'ChevronUp' : 'ChevronDown'}
                        size={20}
                        className="text-text-secondary flex-shrink-0"
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 border-t border-border bg-muted/30">
                        <p className="font-body text-sm text-text-secondary leading-relaxed pt-3">
                          {faq?.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {/* Contact CTA */}
      <div className="mt-8 pt-6 border-t border-border">
        <div className="text-center">
          <h3 className="font-body font-semibold text-base text-card-foreground mb-2">
            Still have questions?
          </h3>
          <p className="font-body text-sm text-text-secondary mb-4">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:support@greenpathinstitute.com"
              className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 font-body font-medium text-sm"
            >
              <Icon name="Mail" size={16} />
              <span>Email Support</span>
            </a>
            <a
              href="tel:+2341234567890"
              className="inline-flex items-center justify-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors duration-200 font-body font-medium text-sm text-card-foreground"
            >
              <Icon name="Phone" size={16} />
              <span>Call Us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
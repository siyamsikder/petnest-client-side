import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How do I list a pet for adoption?",
      answer: "After creating an account, navigate to the 'Add Listing' page. Fill in the details about your pet, including photos, location, and description, then submit it for review."
    },
    {
      question: "Is there a fee for adopting a pet?",
      answer: "Some pets are free for adoption, while others may have a rehoming fee set by the owner. You can see the price or 'Free' status on every listing card."
    },
    {
      question: "How can I contact a pet owner?",
      answer: "Once you find a pet you're interested in, click 'View Details'. You can then view the owner's contact information or use our built-in messaging system (coming soon)."
    },
    {
      question: "What should I look for when adopting?",
      answer: "We recommend visiting the pet in person, asking for health records, and ensuring the environment is clean and ethical before making a final decision."
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-primary font-classic">Questions</span>
          </h2>
          <p className="text-gray-600">
            Find answers to common questions about our platform and the adoption process.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full px-8 py-6 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-bold text-gray-800">{faq.question}</span>
                {openIndex === index ? (
                  <FaChevronUp className="text-primary" />
                ) : (
                  <FaChevronDown className="text-gray-400" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-8 pb-6 text-gray-600 leading-relaxed animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

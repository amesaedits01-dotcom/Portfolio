import React, { useState } from 'react';
import { useI18n } from '../contexts/I18nContext';
import { ChevronDown } from 'lucide-react';
import './FAQ.css';

const FAQ = () => {
  const { t } = useI18n();
  const [openItems, setOpenItems] = useState(new Set());

  const faqItems = [
    { key: 'q1', question: t('faq.q1.question'), answer: t('faq.q1.answer') },
    { key: 'q2', question: t('faq.q2.question'), answer: t('faq.q2.answer') },
    { key: 'q3', question: t('faq.q3.question'), answer: t('faq.q3.answer') },
    { key: 'q4', question: t('faq.q4.question'), answer: t('faq.q4.answer') },
    { key: 'q5', question: t('faq.q5.question'), answer: t('faq.q5.answer') }
  ];

  const toggleItem = (key) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(key)) {
      newOpenItems.delete(key);
    } else {
      newOpenItems.add(key);
    }
    setOpenItems(newOpenItems);
  };

  const handleKeyPress = (event, key) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleItem(key);
    }
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">{t('faq.title')}</h2>
        
        <div className="faq-list">
          {faqItems.map((item) => {
            const isOpen = openItems.has(item.key);
            return (
              <div key={item.key} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleItem(item.key)}
                  onKeyPress={(e) => handleKeyPress(e, item.key)}
                  aria-expanded={isOpen}
                  aria-controls={`answer-${item.key}`}
                >
                  <span>{item.question}</span>
                  <ChevronDown 
                    className={`chevron ${isOpen ? 'open' : ''}`}
                    size={20}
                  />
                </button>
                
                <div
                  id={`answer-${item.key}`}
                  className={`faq-answer ${isOpen ? 'open' : ''}`}
                  role="region"
                  aria-labelledby={`question-${item.key}`}
                >
                  <div className="faq-answer-content">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="cta-section">
          <h3 className="cta-text">{t('cta.text')}</h3>
          <p className="cta-subtitle">{t('cta.subtitle')}</p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
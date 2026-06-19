import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface FaqAccordionItemProps {
  question: string;
  answer: string;
}

export const FaqAccordionItem: React.FC<FaqAccordionItemProps> = ({ question, answer }) => {
  const [active, setActive] = useState<boolean>(false);
  return (
    <div className={`faq-item ${active ? 'active' : ''}`}>
      <button className="faq-question-btn" type="button" onClick={() => setActive(!active)}>
        <h4>{question}</h4>
        <span className="faq-toggle-icon" style={{ transform: active ? 'rotate(45deg)' : 'none' }}>
          <Plus />
        </span>
      </button>
      <div className="faq-answer" style={{ maxHeight: active ? '200px' : '0px' }}>
        <div className="faq-answer-inner">{answer}</div>
      </div>
    </div>
  );
};

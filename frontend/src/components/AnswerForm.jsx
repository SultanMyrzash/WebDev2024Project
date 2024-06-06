import React, { useState } from 'react';
import api from '../api';

const AnswerForm = ({ questionId }) => {
  const [answer_text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(answer_text, questionId);
      const response = await api.post('/api/answers/', { answer_text, question: questionId });
      console.log('Response:', response);
    } catch (error) {
      console.error('Failed to submit answer:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={answer_text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Your answer"
        required
      />
      <button type="submit">Submit Answer</button>
    </form>
  );
};

export default AnswerForm;

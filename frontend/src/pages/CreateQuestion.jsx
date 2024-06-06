import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const CreateQuestionForm = () => {
  const [text, setText] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/questions/', { text, correct_answer: correctAnswer });
      navigate('/questions');  // use navigate instead of history.push
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Failed to create question:', error.response.data);
      } else {
        // Something else happened while setting up the request
        console.error('Failed to create question:', error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Question text"
        required
      />
      <input
        type="text"
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
        placeholder="Correct answer"
        required
      />
      <button type="submit">Create Question</button>
    </form>
  );
};

export default CreateQuestionForm;

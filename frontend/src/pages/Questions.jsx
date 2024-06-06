import React, { useEffect, useState } from 'react';
import api from '../api';
import AnswerForm from '../components/AnswerForm';

const UserHomePage = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.get('/api/questions/');
        console.log('Fetched questions:', response.data);
        setQuestions(response.data);
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      <h1>User Home Page</h1>
      <ul>
        {questions.map(question => (
          <li key={question.id}>
            {question.text}
            <AnswerForm questionId={question.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserHomePage;

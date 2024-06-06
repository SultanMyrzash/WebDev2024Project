import React, { useEffect, useState } from 'react';
import api from '../api';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const { userRole } = useAuth();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.get('/api/questions/');
        setQuestions(response.data);
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      <h1>Questions</h1>
      {userRole === 'admin' && <Link to="/questions/create">Create Question</Link>}
      <ul>
        {questions.map(question => (
          <li key={question.id}>
            <Link to={`/questions/${question.id}`}>{question.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsPage;

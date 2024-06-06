import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../api';

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const { userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await api.get(`/api/questions/${id}/`);
        setQuestion(response.data);
      } catch (error) {
        console.error('Failed to fetch question:', error);
      }
    };

    const fetchStatistics = async () => {
      try {
        const response = await api.get(`/api/questions/${id}/statistics/`);
        setStatistics(response.data);
      } catch (error) {
        console.error('Failed to fetch statistics:', error);
      }
    };

    fetchQuestion();
    if (userRole === 'admin') {
      fetchStatistics();
    }
  }, [id, userRole]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/questions/${id}/`, question);
      navigate('/questions');  // use navigate instead of history.push
    } catch (error) {
      console.error('Failed to update question:', error);
    }
  };

  return (
    <div>
      {question && (
        <>
          <h1>Question Detail</h1>
          <p>{question.text}</p>
          {userRole === 'admin' && (
            <>
              <form onSubmit={handleEdit}>
                <input
                  type="text"
                  value={question.text}
                  onChange={(e) => setQuestion({ ...question, text: e.target.value })}
                  required
                />
                <input
                  type="text"
                  value={question.correct_answer}
                  onChange={(e) => setQuestion({ ...question, correct_answer: e.target.value })}
                  required
                />
                <button type="submit">Update Question</button>
              </form>
              {statistics && (
                <div>
                  <h2>Statistics</h2>
                  <p>Correct Answers: {statistics.correct_answers}</p>
                  <p>Total Answers: {statistics.total_answers}</p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default QuestionDetail;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBeer } from 'react-icons/fa';
import axios from "axios";
import '../layout/QuizResult.css';
import '../layout/Common.css';

const QuizResult = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { quizQuestions, totalScores, empName, empId } = location.state;
    const numQuestions = quizQuestions.length;
    const percentage = Math.round((totalScores / numQuestions) * 100);
    const wrongScores = numQuestions - totalScores;

    const saveScore = async () => {
        try {
            await axios.post('YOUR_API_ENDPOINT', {
                id: empId,
                empName: empName,
                score: totalScores
            });
            console.log('Score saved successfully');
        } catch (error) {
            console.error('Error saving score:', error);
        }
    };

    const handleRetakeQuiz = () => {
        navigate('/user');
    };

    React.useEffect(() => {
        saveScore();
    }, []);

    return (
        <section className="container mt-5">
            <div className="admin-aside">
                <div className="admin-logo">
                    <a><span>User</span></a>
                </div>
                <div className="nav-toggler">
                    <span></span>
                </div>
                <ul className="nav">
                    <li><a href="/user"><i className="fa fa-home"></i>Home</a></li>
                    <li><a href="/user-quiz" className="active"><i className="fa fa-list"></i>Quiz</a></li>
                    <li><a href="/contact"><i className="fa fa-comments"></i>Contact</a></li>
                </ul>
                <button className="button login__submit">
                    <span className="button__text" onClick={() => navigate('/home')}>Log Out</span>
                    <i className="button__icon fa fa-sign-out"></i>
                </button>
            </div>

            <div className="rside">
                <div className="header header-main">
                    <span className="button__text">Quiz Result</span>
                    <button className="create-quiz-button" onClick={() => navigate('/user')}>
                        <span className="button__text">Retake Quiz</span>
                    </button>
                </div>
                <div className="quiz-result-container">
                    <h5>Quiz has been completed</h5>
                    <h5>Your Score</h5>
                    <h5 className="text-info">{totalScores} / {numQuestions}</h5>
                    <div className="answers-container">
                        <h3 id="totalQuestions">Total Questions: {numQuestions}</h3>
                        <h3 id="correctAnswer">Correct Answers: {totalScores}</h3>
                        <h3 id="remainingval">Wrong Answers: {wrongScores}</h3>
                    </div>
                    <h5 className="text-info">
                        You answered {totalScores} out of {numQuestions} questions correctly.
                    </h5>
                    <p>Your total score is {percentage}%.</p>

                    <button className="btn btn-primary btn-sm" onClick={handleRetakeQuiz}>
                        Retake this quiz
                    </button>
                </div>
            </div>
        </section>
    );
};

export default QuizResult;

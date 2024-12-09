import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createQuestion, getSubjects } from "../../utils/QuizService";
import '../layout/CreateQuestions.css';
import '../layout/Common.css'

const CreateQuestions = () => {
  const [question, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("single");
  const [choices, setChoices] = useState([""]);
  const [correctAnswers, setCorrectAnswers] = useState([""]);
  const [subject, setSubject] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [subjectOptions, setSubjectOptions] = useState([]);

  const navigate = useNavigate()
    const goToAdmin= () =>{
        navigate('/all-quizzes');
    }
    
    const goToHome =() => {
      navigate('/home')
    }
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const subjectsData = await getSubjects();
      setSubjectOptions(Array.isArray(subjectsData) ? subjectsData : []);
    } catch (error) {
      console.error(error);
      setSubjectOptions([]);
    }
  };

  const handleAddChoice = () => {
    const newChoice = `Choice ${choices.length + 1}`;
    setChoices([...choices, newChoice]);
  };

  const handleRemoveChoice = (index) => {
    setChoices(choices.filter((choice, i) => i !== index));
  };

  const handleChoiceChange = (index, value) => {
    setChoices(choices.map((choice, i) => (i === index ? value : choice)));
  };

  const handleCorrectAnswerChange = (index, value) => {
    setCorrectAnswers(correctAnswers.map((answer, i) => (i === index ? value : answer)));
  };

  const handleAddCorrectAnswer = () => {
    setCorrectAnswers([...correctAnswers, ""]);
  };

  const handleRemoveCorrectAnswer = (index) => {
    setCorrectAnswers(correctAnswers.filter((answer, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || !choices.length || !correctAnswers.length) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const result = {
        question,
        questionType,
        choices,
        correctAnswers: correctAnswers
          .map((answer) => {
            const choiceLetter = answer.charAt(0).toUpperCase();
            const choiceIndex = choiceLetter.charCodeAt(0) - 65;
            return choiceIndex >= 0 && choiceIndex < choices.length ? choiceLetter : null;
          })
          .filter(Boolean),
        subject,
      };

      await createQuestion(result);

      setQuestionText("");
      setQuestionType("single");
      setChoices([""]);
      setCorrectAnswers([""]);
      setSubject("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddSubject = () => {
    if (newSubject.trim() !== "") {
      setSubject(newSubject.trim());
      setSubjectOptions([...subjectOptions, newSubject.trim()]);
      setNewSubject("");
    }
  };

  return (
    <div className="container">
      <div className="admin-aside">
        <div className="admin-logo">
            <a><span>Admin</span></a>
        </div>
        <div className="nav-toggler">
            <span></span>
        </div>
        <ul className="nav">
            <li><a href="/Admin"><i className="fa fa-home"></i>Home</a></li>
            <li><a href="/create-quiz"><i className="fa fa-list"></i>Quiz</a></li>
            <li><a href="/all-questions" className="active"><i className="fa fa-briefcase"></i>All Question</a></li>
            <li><a href="/scoreboard"><i className="fa fa-comments"></i>Result</a></li>
        </ul>
        <button className="button login__submit">
            <span className="button__text" onClick={() => goToHome()}>Log Out</span>
            <i className="button__icon fa fa-sign-out"></i>
        </button>	
    </div>
    <div className="rside">
    <div className="header header-main">
            <span className="button__text" onclick="getLogin()">Create Questions</span>
            
        </div>	
          <div className="quiz-card">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="p-2r">
                <div className="mb-3 subject-container">
                  <label htmlFor="subject" className="form-label">
                    Select a Subject
                  </label>
                  <select
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="form-control"
                  >
                    <option value="">Select subject</option>
                    <option value="New">Add New</option>
                    {subjectOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {subject === "New" && (
                  <div className="mb-3">
                    <label htmlFor="new-subject" className="form-label text-info">
                      Add New Subject
                    </label>
                    <input
                      type="text"
                      id="new-subject"
                      value={newSubject}
                      onChange={(event) => setNewSubject(event.target.value)}
                      className="form-control"
                    />
                    <button
                      type="button"
                      onClick={handleAddSubject}
                      className="btn btn-outline-primary mt-2"
                    >
                      Add Subject
                    </button>
                  </div>
                )}
                <div className="mb-3">
                  <label htmlFor="question-text" className="form-label text-info">
                    Question
                  </label>
                  <textarea
                    className="form-control"
                    rows={4}
                    value={question}
                    onChange={(e) => setQuestionText(e.target.value)}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="question-type" className="form-label text-info">
                    Question type
                  </label>
                  <select
                    id="question-type"
                    value={questionType}
                    onChange={(event) => setQuestionType(event.target.value)}
                    className="form-control"
                  >
                    <option value="single">Single Answer</option>
                    <option value="multiple">Multiple Answer</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="choices" className="text-info">
                    Choices
                  </label>
                  {choices.map((choice, index) => (
                    <div key={index} className="input-group mb-3">
                      <input
                        type="text"
                        value={choice}
                        onChange={(e) => handleChoiceChange(index, e.target.value)}
                        className="form-control"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveChoice(index)}
                        className="btn btn-outline-danger"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddChoice}
                    className="btn btn-outline-primary">
                    Add Choice
                  </button>
                </div>
                {questionType === "single" && (
                  <div className="mb-3">
                    <label htmlFor="answer" className="form-label text-success">
                      Correct Answer
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="answer"
                      value={correctAnswers[0]}
                      onChange={(e) => handleCorrectAnswerChange(0, e.target.value)}
                    />
                  </div>
                )}
                {questionType === "multiple" && (
                  <div className="mb-3">
                    <label htmlFor="answer" className="form-label text-success">
                      Correct Answer(s)
                    </label>
                    {correctAnswers.map((answer, index) => (
                      <div key={index} className="d-flex mb-2">
                        <input
                          type="text"
                          className="form-control me-2"
                          value={answer}
                          onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleRemoveCorrectAnswer(index)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-outline-info"
                      onClick={handleAddCorrectAnswer}
                    >
                      Add Correct Answer
                    </button>
                  </div>
                )}

                {correctAnswers.length === 0 && <p>Please enter at least one correct answer.</p>}

                <div className="btn-group">
                  <button type="submit" className="btn btn-outline-success mr-2">
                    Save Question
                  </button>
                  <Link to={"/all-questions"} className="btn btn-outline-primary ml-2">
                    Back to existing questions
                  </Link>
                </div>
              </form>
            </div>
          </div>
      </div>
    </div>
  );
};

export default CreateQuestions;

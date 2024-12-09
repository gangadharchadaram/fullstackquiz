import React, {useState, useEffect}  from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import '../layout/Common.css'
import '../layout/Admin.css'
import { getSubjects } from '../../utils/QuizService';
import { FiMoreHorizontal } from "react-icons/fi";
import { FaPlayCircle } from "react-icons/fa";

const Admin = () => {

  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch the subjects from the API
    const fetchSubjects = async () => {
      try {
        const subjectsData = await getSubjects();
        setSubjects(subjectsData.data);
        console.log(subjectsData)
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, []);

  const fetchQuestions = async (subjectId) => {
    try {
      const response = await axios.get(`https://api.example.com/subjects/${subjectId}/questions`);
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleSubjectChange = (event) => {
    const subjectId = event.target.value;
    setSelectedSubject(subjectId);
    fetchQuestions(subjectId);
  };

	const navigate = useNavigate()
    const goToCreateQuiz= () =>{
        navigate('/create-quiz');
    }

    const goToQuestions = () => {
      navigate('/all-quizzes')
    }
    const goToHome =() => {
      navigate('/home')
    }
	return (
		<div className="admin-container">
			 <div className="admin-aside">
        <div className="admin-logo">
            <a onClick={ () => goToCreateQuiz()}><span >Admin</span></a>
        </div>
        <div className="nav-toggler">
            <span></span>
        </div>
        <ul className="nav">
            <li><a href="/Admin" className="active" ><i className="fa fa-home"></i>Home</a></li>
            <li><a href="/create-quiz"><i className="fa fa-list"></i>Quiz</a></li>
            <li><a href="/all-questions"><i className="fa fa-briefcase"></i>All Questions</a></li>
            <li><a href="/scoreboard"><i className="fa fa-comments"></i>Result</a></li>
        </ul>
        <button className="button login__submit">
            <span className="button__text" onClick={() => goToHome()}>Log Out</span>
            <i className="button__icon fa fa-sign-out"></i>
        </button>	
    </div>
    <div className="rside">
        <div className="header header-main">
            <span className="button__text" onclick="getLogin()">Home</span>
            <button className="create-quiz-button" onClick={() => goToCreateQuiz()}>
                <span className="button__text">Create Quiz</span>
                
            </button>	
        </div>	
        <div className="card-container">


        <section className="cards">
          <div className="card">
            <div className="card__image-container">
              <img
                src="https://static.javatpoint.com/core/images/java-logo1.png"
              />
            </div>
            <FiMoreHorizontal />
            <div className="card__content">
              <p className="card__title text--medium">
                Java Quiz
              </p>
              <p className="text--medium">10 questions</p>
              <div className="card__info">
                
                <p className="card__price text--medium" onClick={() => goToQuestions()}>view</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card__image-container">
              <img
                src="https://www.python.org/static/community_logos/python-logo-master-v3-TM-flattened.png"
              />
            </div>
            <div className="card-content">
              <p className="card__title text--medium">
                Java Quiz
              </p>
              <div className="card__info">
                <p className="text--medium">10 Questions</p>
                <p className="card__price text--medium" onClick={() => goToQuestions()}><FaPlayCircle style={{ fontSize: '36px' }}  /></p>
                <i className="fa-solid fa-play"></i>
              </div>
            </div>
          </div>
          
        </section>



        </div>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"></script>
    </div>
		</div>
	)
}

export default Admin
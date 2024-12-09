import React from "react";
import { useNavigate } from "react-router-dom";
import '../layout/UserQuiz.css'
import '../layout/Common.css'


const UserQuiz = () => {

    const navigate = useNavigate()

	
	return (
		<div className="mt-5">
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
				<button className="button login__submit" onClick={() => navigate("/home")}>
					<span className="button__text">Log Out</span>
					<i className="button__icon fa fa-sign-out"></i>
				</button>
			</div>

			<div className="rside">
				<div className="header header-main">
					<span className="button__text">Welcome to LMS Quiz</span>
				</div>
				<div className="user-quiz-container">
                    <div className="quiz-container">
                    <img src="https://cdn.pixabay.com/photo/2018/01/04/15/51/404-error-3060993_1280.png" alt="image" className="opps-image" />
                    <h2 className="quiz-text">There is No Quiz</h2>
                    <h2 className="quiz-text">take your Quiz Here</h2>
                    <button className="btn btn-warning takequiz" onClick={() => navigate("/user")}>
                <span className="button__text">Take Quiz</span>
                
            </button>	
                    </div>
				</div>
			</div>
		</div>
	);
};

export default UserQuiz;

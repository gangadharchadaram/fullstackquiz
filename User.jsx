import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSubjects } from "../../utils/QuizService";
import '../layout/User.css'
import '../layout/Common.css'


const User = () => {
	

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
					<li><a href="/user" className="active"><i className="fa fa-home"></i>Home</a></li>
					<li><a href="/user-quiz"><i className="fa fa-list"></i>Quiz</a></li>
					<li><a href="/contact"><i className="fa fa-comments"></i>Contact</a></li>
				</ul>
				<button className="button login__submit" onClick={() => navigate("/home")}>
					<span className="button__text">Log Out</span>
					<i className="button__icon fa fa-sign-out"></i>
				</button>
			</div>

			<div className="rside">
				<div className="header header-main">
					<span className="button__text" onClick={() => navigate("/")}>Welcome to LMS Quiz</span>
				</div>
				<div className="take-quiz-container">
					{/* <div className="quizCard">
						<div className="card-body">
							{renderStepContent()}
							<div className="d-flex justify-content-between mt-4">
								{currentStep > 1 && (
									<button className="btn btn-primary" onClick={handlePrevious}>
										Previous
									</button>
								)}
								{currentStep < 3 && (
									<button
										className="btn btn-primary"
										onClick={handleNext}
										disabled={
											(currentStep === 1 && !selectedSubject) ||
											(currentStep === 2 && !selectedNumQuestions)
										}>
										Next
									</button>
								)}
								{currentStep === 3 && (
									<button className="btn btn-success" onClick={handleNext}>
										Start Quiz
									</button>
								)}
							</div>
						</div>
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default User;

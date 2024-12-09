import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSubjects } from "../../utils/QuizService";
import '../layout/User.css'
import '../layout/Common.css'


const CreateQuiz = () => {
	const [currentStep, setCurrentStep] = useState(1);
	const [selectedSubject, setSelectedSubject] = useState("");
	const [selectedNumQuestions, setSelectedNumQuestions] = useState("");
	const [subjects, setSubjects] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		fetchSubjectData();
	}, []);

	const fetchSubjectData = async () => {
		try {
			const subjectsData = await getSubjects();
			setSubjects(subjectsData || []); // Ensure subjectsData is always an array
		} catch (error) {
			console.error(error);
			setSubjects([]); // Ensure subjects is set to an empty array on error
		}
	};

	const handleNext = () => {
		if (currentStep === 3) {
			if (selectedSubject && selectedNumQuestions) {
				navigate("/Admin", { state: { selectedNumQuestions, selectedSubject } });
			} else {
				alert("Please select a subject and number of questions.");
			}
		} else {
			setCurrentStep((prevStep) => prevStep + 1);
		}
	};

    
	const handlePrevious = () => {
		setCurrentStep((prevStep) => prevStep - 1);
	};

	const handleSubjectChange = (event) => {
		setSelectedSubject(event.target.value);
	};

	const handleNumQuestionsChange = (event) => {
		setSelectedNumQuestions(event.target.value);
	};

	const renderStepContent = () => {
		switch (currentStep) {
			case 1:
				return (
					<div>
						<h1>Step - 1 : Select Subject</h1>

						<select
							className="form-select"
							value={selectedSubject}
							onChange={handleSubjectChange}>
							<option value="">Select a subject</option>
							{subjects.length > 0 && subjects.map((subject) => (
								<option key={subject} value={subject}>
									{subject}
								</option>
							))}
						</select>
					</div>
				);
			case 2:
				return (
					<div>
						<h1>step 2 : Select No of Questions</h1>
						<input
							type="number"
							className="form-control"
							value={selectedNumQuestions}
							onChange={handleNumQuestionsChange}
							placeholder="Enter the number of questions"
						/>
					</div>
				);
			case 3:
				return (
					<div className="text-format">
						<h2>Confirmation</h2>
						<p>Subject: {selectedSubject}</p>
						<p>Number of Questions: {selectedNumQuestions}</p>
					</div>
				);
			default:
				return null;
		}
	};


	return (
		<div className="mt-5">
			<div className="admin-aside">
				<div className="admin-logo">
					<a><span>Admin</span></a>
				</div>
				<div className="nav-toggler">
					<span></span>
				</div>
				<ul className="nav">
					<li><a href="/admin"><i className="fa fa-home"></i>Home</a></li>
					<li><a href="/create-quiz" className="active"><i className="fa fa-list"></i>Quiz</a></li>
					<li><a href="/all-questions"><i className="fa fa-comments"></i>All Questions</a></li>
                    <li><a href="/scoreboard"><i className="fa fa-comments"></i>Result</a></li>
				</ul>
				<button className="button login__submit" onClick={() => navigate("/home")}>
					<span className="button__text">Log Out</span>
					<i className="button__icon fa fa-sign-out"></i>
				</button>
			</div>

			<div className="rside">
				<div className="header header-main">
					<span className="button__text" onClick={() => navigate("/")}>Create Quiz</span>
				</div>
				<div className="take-quiz-container">
					<div className="quizCard">
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
										Save Quiz
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateQuiz;

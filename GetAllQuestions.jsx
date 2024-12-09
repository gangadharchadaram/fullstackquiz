import React, { useEffect, useState } from "react"
import { deleteQuestion, getAllQuestions } from "../../utils/QuizService"
import { Link, useNavigate } from "react-router-dom"
import {FaPlus} from "react-icons/fa"
import '../layout/GetAllQuestions.css'
import '../layout/Common.css'

const GetAllQuestions = () => {
	const [questions, setQuestions] = useState([
		{ id: "", question: "", correctAnswers: "", choices: [] }
	])
	const [isLoading, setIsLoading] = useState(true)
	const [isQuestionDeleted, setIsQuestionDeleted] = useState(false)
	const [deleteSuccess, setDeleteSuccess] = useState("")

	useEffect(() => {
		fetchQuestions()
	}, [])

	const navigate = useNavigate();

	const fetchQuestions = async () => {
		try {
			const data = await getAllQuestions()
			setQuestions(data)
			setIsLoading(false)
			console.log(data)
		} catch (error) {
			console.error(error)
		}
	}

	const handleDeleteQuestion = async (id) => {
		try {
			await deleteQuestion(id)
			setQuestions(questions.filter((question) => question.id !== id))
			setIsQuestionDeleted(true)
			setDeleteSuccess("Question deleted successfully.")
		} catch (error) {
			console.error(error)
		}
		setTimeout(() => {
			setDeleteSuccess("")
		}, 4000)
	}

	if (isLoading) {
		return <p>Loading...</p>
	}

	return (
		<section className="container">
			<div className="admin-aside">
				<div className="admin-logo">
					<a><span>Admin</span></a>
				</div>
				<div className="nav-toggler">
					<span></span>
				</div>
				<ul className="nav">
					<li><a href="/Admin"><i className="fa fa-home"></i>Home</a></li>
					<li><a href="/create-quiz"><i className="fa fa-home"></i>Quiz</a></li>
					<li><a href="/all-questions" className="active"><i className="fa fa-list"></i>All Questions</a></li>
					<li><a href="/scoreboard"><i className="fa fa-briefcase"></i>Results</a></li>
				</ul>
				<button className="button login__submit" onClick={() => navigate("/home")}>
					<span className="button__text">Log Out</span>
					<i className="button__icon fa fa-sign-out"></i>
				</button>
			</div>

			<div className="rside">
				<div className="header header-main">
					<span className="button__text" >All Questions</span>
					<div className="col-md-10 d-flex justify-content-end">
					<Link to={"/create-questions"}>
						<FaPlus /> Add Question
					</Link>
				</div>
				</div>
			<hr />
			<div className="allquestions-container">
			{isQuestionDeleted && <div className="alert alert-success">{deleteSuccess}</div>}
			{questions?.map((question, index) => (
				<div key={question.id}>
					<pre>
						<h4 style={{ color: "GrayText" }}>{`${index + 1}. ${question.question}`}</h4>
					</pre>
					<ul>
						{question.choices?.map((choice, index) => (
							<li key={index}>{choice}</li>
						))}
					</ul>
					<p className="text-success">Correct Answer: {question.correctAnswers}</p>
					<div className="btn-group">
					<Link to={`/update-quiz/${question.id}`} className="btn btn-outline-warning mb-4">
                    Edit Question
                  </Link>
                  <Link onClick={() => handleDeleteQuestion(question.id)} className="btn btn-outline-danger mb-4">
                    Delete question
                  </Link>
                </div>
				</div>
			))}
			</div>
			</div>
		</section>
	)
}

export default GetAllQuestions
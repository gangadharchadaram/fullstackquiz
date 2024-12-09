import React, { useEffect, useState } from "react"
import '../layout/Common.css'
import { Link, useNavigate, useParams } from "react-router-dom"
import { getQuestionById, updateQuestion } from "../../utils/QuizService"
import '../layout/UpdateQuestion.css'

const UpdateQuestion = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [question, setQuestion] = useState("")
	const [choices, setChoices] = useState([""])
	const [correctAnswers, setCorrectAnswers] = useState("")
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		fetchQuestion()
	}, [])

	const fetchQuestion = async () => {
		try {
			const questionToUpdate = await getQuestionById(id)
			if (questionToUpdate) {
				setQuestion(questionToUpdate.question)
				setChoices(questionToUpdate.choices)
				setCorrectAnswers(questionToUpdate.correctAnswers)
			}
			setIsLoading(false)
		} catch (error) {
			console.error(error)
		}
	}

	const handleQuestionChange = (e) => {
		setQuestion(e.target.value)
	}

	const handleChoiceChange = (index, e) => {
		const updatedChoices = [...choices]
		updatedChoices[index] = e.target.value
		setChoices(updatedChoices)
	}

	const handleCorrectAnswerChange = (e) => {
		setCorrectAnswers(e.target.value)
	}

	const handleUpdate = async (e) => {
		e.preventDefault()
		try {
			const updatedQuestion = {
				question,
				choices,
				correctAnswers: correctAnswers
					.toString()
					.split(",")
					.map((answer) => answer.trim())
			}
			await updateQuestion(id, updatedQuestion)
			navigate("/all-quizzes")
		} catch (error) {
			console.error(error)
		}
	}

	if (isLoading) {
		return <p>Loading...</p>
	}

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
					<li><a href="/create-quiz"><i className="fa fa-home"></i>Quiz</a></li>
					<li><a href="/all-quizzes" className="active"><i className="fa fa-list"></i>All Questions</a></li>
					<li><a href="/scoreboard"><i className="fa fa-briefcase"></i>Results</a></li>
				</ul>
				<button className="button login__submit" onClick={() => navigate("/home")}>
					<span className="button__text">Log Out</span>
					<i className="button__icon fa fa-sign-out"></i>
				</button>
			</div>

			<div className="rside">
				<div className="header header-main">
					<span className="button__text" onClick={() => navigate("/")}>Update Quiz Question</span>
				</div>
			
			<div className="col-8 Update-question-container">
				<form onSubmit={handleUpdate}>
					<div className="form-group">
						<label className="text-info">Question</label>
						<textarea
							className="form-control"
							rows={4}
							value={question}
							onChange={handleQuestionChange}></textarea>
					</div>

					<div className="form-group">
						<label className="text-info">Choices</label>
						{choices.map((choice, index) => (
							<input
								key={index}
								type="text"
								className="form-control mb-4"
								value={choice}
								onChange={(e) => handleChoiceChange(index, e)}
							/>
						))}
					</div>
					<div className="form-group">
						<label className="text-info">Correct Answer(s)</label>
						<input
							type="text"
							className="form-control mb-4"
							value={correctAnswers}
							onChange={handleCorrectAnswerChange}
						/>
					</div>

					<div className="btn-group">
						<button type="submit" className="btn btn-sm btn-outline-warning">
							Update question
						</button>
						<Link to={"/all-quizzes"} className="btn btn-outline-primary ml-2">
							Back to all questions
						</Link>
					</div>
				</form>
			</div>
            </div>
		</div>
	)
}

export default UpdateQuestion
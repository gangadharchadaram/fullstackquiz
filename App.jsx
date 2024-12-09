import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import User from "./components/layout/User"
import TakeQuiz from "./components/layout/TakeQuiz"
import QuizResult from "./components/layout/QuizResult"
import GetAllQuestions from "./components/layout/GetAllQuestions"
import CreateQuiz from "./components/layout/CreateQuiz"
import UpdateQuestion from "./components/layout/UpdateQuestion"
import UserQuiz from "./components/layout/UserQuiz"
import ScoreBoard from "./components/layout/ScoreBoard"
import CreateQuestions from "./components/layout/CreateQuestions"
import Home from "./components/layout/Home"
import Admin from "./components/layout/Admin"
import Contact from "./components/layout/Contact"

function App() {
	
	return (
		<main>
			<Router>
				<Routes>
				<Route path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/admin" element={<Admin />} />
					<Route path="/user" element={<User />} />
					<Route path="/take-quiz" element={<TakeQuiz />} />
					<Route path="/create-questions" element={<CreateQuestions />} />
					<Route path="/create-quiz" element={<CreateQuiz />} />
					<Route path="/update-quiz/:id" element={<UpdateQuestion />} />
					<Route path="/all-questions" element={<GetAllQuestions />} />
					<Route path="/quiz-result" element={<QuizResult />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/user-quiz" element={<UserQuiz />} />
					<Route path="/scoreboard" element={<ScoreBoard />} />
				</Routes>
			</Router>
		</main>
	)
}

export default App
import React, { useEffect, useState } from "react"
import '../layout/Common.css'
import { Link, useNavigate, useParams } from "react-router-dom"
import { getScoreById, getScores } from "../../utils/QuizService"
import '../layout/ScoreBoard.css'
import axios from "axios"


const ScoreBoard = () => {

    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getScore();
    }, []);

    const navigate = useNavigate();

    const getScore = async () => {
        try{
            const data = await getScores()
            setScores(data)
            setLoading(false)
            console.log(data)
        } catch(error){
            console.log(error)
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
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
					<li><a href="/all-questions"><i className="fa fa-list"></i>All Questions</a></li>
					<li><a href="/scoreboard" className="active"><i className="fa fa-briefcase"></i>Results</a></li>
				</ul>
				<button className="button login__submit" onClick={() => navigate("/home")}>
					<span className="button__text">Log Out</span>
					<i className="button__icon fa fa-sign-out"></i>
				</button>
			</div>

			<div className="rside">
				<div className="header header-main">
					<span className="button__text" onClick={() => navigate("/")}>LeaderBoard</span>
				</div>  
			
			<div className="Update-result-container">
				<table>
                  
                             
                             <thead>
                            <tr className="headingRow">
                                <th className="theader">Id</th>
                                <th className="theader">EmployeeName</th>
                                <th className="theader">Subject</th>
                                <th className="theaderlast">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scores?.map((score, index) => (
                                <tr className="trowdata" key={index}>
                                    <td data-label="Id">{score.id}</td>
                                    <td data-label="Id">{score.employee.empName}</td>
                                    {/* <td data-label="EmployeeName">{score.employees?.map((employee) => employee.empId).join(", ")}</td> */}
                                    <td data-label="Designation">{score.subject}</td>
                                    <td data-label="Score">{score.score}</td>
                                </tr>
                            ))}
                        </tbody>
                   
                       
   
                
                      
                </table>
			</div>
            </div>
		</div>
	)
}

export default ScoreBoard
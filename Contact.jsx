import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import '../layout/Common.css'
import '../layout/Contact.css'

const Contact = () => {
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
            <a onClick={ () => goToCreateQyuz()}><span >User</span></a>
        </div>
        <div className="nav-toggler">
            <span></span>
        </div>
        <ul className="nav">
            <li><a href="/user" ><i className="fa fa-home"></i>Home</a></li>
            <li><a href="/user-quiz"><i className="fa fa-list"></i>Quiz</a></li>
            <li><a href="/contact" className="active"><i className="fa fa-comments"></i>Contact</a></li>
        </ul>
        <button className="button login__submit">
            <span className="button__text" onClick={() => goToHome()}>Log Out</span>
            <i className="button__icon fa fa-sign-out"></i>
        </button>	
    </div>
    <div className="rside">
        <div className="header header-main">
            <span className="button__text" onclick="getLogin()">FeedBack Form</span>
            	
        </div>	
        <div className="contact-container">
                    <div class="row">
                        <div className="contact-form padd-15">
                            <div class="row">
                                <div class="form-item col-6 padd-15">
                                    <div class="form-group">
                                        <input type="text" className="form-control" placeholder="Name" />
                                    </div>
                                </div>
                                <div class="form-item col-6 padd-15">
                                    <div class="form-group">
                                        <input type="email" className="form-control" placeholder="Email" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-item col-12 padd-15">
                                    <div class="form-group">
                                        <input type="text" className="form-control" placeholder="Subject" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div class="form-item">
                                    <div class="form-group">
                                        <textarea name="" className="form-control" id="" placeholder="Message"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-item col-12 padd-15">
                                    <button type="submit" className="btn btn-primary">Send Message</button>
                                </div>
                            </div>
                        </div>

                    </div>




        </div>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"></script>
    </div>
		</div>
	)
}

export default Contact
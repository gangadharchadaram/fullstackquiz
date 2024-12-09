import React, { useState } from 'react';
import logo from '/home/gangadhar/quiz/src/main/resources/Quiz/src/assets/logo.avif'
import '../layout/Home.css';
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';


const Home = () => {
    const navigate = useNavigate()
    const goToAdmin= () =>{
        if(uname === Admin.id && pword === Admin.password){
            navigate('/Admin');
        }
        else{
          window.alert("Wrong Credentials")
        }
    }
    const goToUser= () =>{
        if(uname === User.id && pword === User.password){
            navigate('/User');
        }
        else{
          window.alert("Wrong Credentials")
        }
    }


    const [name, setName] = useState("");
  const [uname, setUname] = useState("");
  const [pword, setPword] = useState("");

  const User = {
    id: "2406",
    password: "User@",
  };

  const Admin = {
    id: "3406",
    password: "Admin@",
  };


  function authenticate(){
    if (uname === User.id && pword === User.password) {
      console.log("Success! Logged in.");
      
    } else {
      console.log("wrong credentials")
    }
  }

     
  return (

	<div className='main-container'>
    <div className='left'>
    <img src={logo} alt=''  className='logo'/>
    </div>

			<div className="container">
                    <div className="screen">
                        <div className="screen__content">
                          
                            <form className="login">
                                <div className="login__field">
                                    <i className="login__icon fa fa-user"></i>
                                    <input type="input" className="username-input" placeholder="Employee ID" onChange={(e) => setUname(e.target.value)} value={uname} autoComplete="off" />
                                </div>
                                <div className="login__field">
                                    <i className="login__icon fa fa-lock"></i>
                                    <input className="password-input" type="password" placeholder="Password" onChange={(e) => setPword(e.target.value)} value={pword} autoComplete="off" />
                                </div>
                                <div className='button-container'>
                                    <button className="button submit-btn" type="submit" onClick={( authenticate, goToAdmin)}>
                                        <span className="button-ext">Admin</span>
                                    </button>	
                                    <button className="button submit-btn" type='submit' onClick={( authenticate, goToUser)}>
                                        <span className="button-text">User</span>
                                    </button>				
                                </div>

                                
                            </form>
                        </div>
                        <div className="screen__background">
                            <span className="screen__background__shape screen__background__shape4"></span>
                            <span className="screen__background__shape screen__background__shape3"></span>		
                            <span className="screen__background__shape screen__background__shape2"></span>
                            <span className="screen__background__shape screen__background__shape1"></span>
                        </div>		
                    </div>
                </div>
	</div>
  );
};

export default Home;

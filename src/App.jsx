import { useState, useRef } from 'react'
import './App.css'
import { FaUser } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";



function App() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error1, setError1] = useState('');
  const [error2, setError2] = useState('');
  const [error3, setError3] = useState('');


  function validate(usernameRef, emailRef, passwordRef) {
    if(!usernameRef.current.value) {
      setError1('Username is required');
      usernameRef.current.style.outlineColor = 'red';
      usernameRef.current.focus()
      return false;
    } else {
      setError1('');
      usernameRef.current.style.outlineColor = '';
      usernameRef.current.style.backgroundColor = '';
    }

    if(!emailRef.current.value) {
      setError2('Email is required');
      emailRef.current.style.outlineColor = 'red';
      emailRef.current.focus()
      return false;
    } else {
      setError2('');
      emailRef.current.style.outlineColor = '';
      emailRef.current.style.backgroundColor = '';
    }

    if(!passwordRef.current.value) {
      setError3('Password is required');
      passwordRef.current.style.outlineColor = 'red';
      passwordRef.current.focus()
      return false;
    }else {
      setError3('');
      passwordRef.current.style.outlineColor = '';
    }

    return true;
  }

  function handleClick(e) {
    e.preventDefault();
    if (validate(usernameRef, emailRef, passwordRef)) {
      const user = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value
      }
      fetch("https://auth-rg69.onrender.com/api/auth/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then((data) => {
          console.log(data);
          if (data.message === "User registered successfully!") {
            alert("User registered successfully")
          }
          if (data.message === "Failed! Username is already in use!") {
            alert("Username is already in use!")
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
    usernameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
  }
  

  return (
    <>
     <div className="container">
      <h1>Login</h1>
      <div className="box">
        <FaUser className='user' />
        <input type="text" placeholder='Enter username here...' ref={usernameRef}/>
        {error1 && <p style={{ color: 'red' }}>{error1}</p>}
      </div>
      <div className="box">
        <MdAlternateEmail className='user' />
        <input type="email" placeholder='Enter email here...' ref={emailRef}/>
        {error2 && <p style={{ color: 'red' }}>{error2}</p>}
      </div>
      <div className="box">
        <RiLockPasswordFill className='user' />
        <input type="password" placeholder='Enter password here...' ref={passwordRef}/>
        {error3 && <p style={{ color: 'red' }}>{error3}</p>}
      </div>
      <button onClick={handleClick}>Login</button>
     </div>
    </>
  )
}

export default App

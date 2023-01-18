import React, { useState } from 'react'
import '../Login.css'
import { useNavigate } from 'react-router-dom'

const Login = ({token, setToken}) => {
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            // console.log(username, password)
            const response = await fetch('/api/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            console.log(data);
            // Save JWT token to browser local storage
            localStorage.setItem('token', data.token);
            // Redirect to homepage
            if(data.token) {
                setToken(data.token)
                navigate('/');
            }
        } catch (err) {
            console.log(err)
            setError(err.message);
        }
    };

    return <>
        <div className="container my-4 h-100">
            <main className="form-signin text-center">
                <form onSubmit={handleSubmit}>
                    <img className="mb-4" src='logo.png' alt="Logo" width="72" height="72" />
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                    <div className="form-floating">
                        <input type="text" name="username" className="form-control" id="username" placeholder="Username" value={username} onChange={e => setusername(e.target.value)} autoComplete="username" />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" name="password" className="form-control" id="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" />
                        <label htmlFor="password">Password</label>
                    </div>

                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" name="rememberme" value="True" /> Remember me
                        </label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                    {error && <p>{error}</p>}
                    <p className="mt-3 mb-3 text-muted">&copy; 2020-2021</p>
                </form>
            </main>
        </div>
    </>
}

export default Login

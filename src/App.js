import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Exam from './components/Exam';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import New from './components/New';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import Upload from './components/Upload';

function App() {

	const [token, setToken] = useState('')
	const navigate = useNavigate()

	const Logout = ({to}) => {
		localStorage.removeItem('token')
		return <Navigate to={to} />
	};

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const getData = localStorage.getItem("token");
			console.log(getData)
			setToken(getData)
		}
		if (token) {
			async function test() {
				try {
					let res = await fetch('/api/verify', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							token: token
						})
					})
					let data = await res.json()
					console.log(data)
					if (data.message === 'jwt expired') {
						Swal.fire(
							'Login Expired',
							'The Login session has expired. Please Login again.',
							'error'
					).then(res=>{
						setToken('')
						navigate('/login')
					})
					}
					if (!data.success) localStorage.setItem('token', '')
				} catch (error) {
					console.log(error.message)
				}
			}
			test()
		}
	}, [token])

	return <>
		<Navbar token={token} setToken={setToken} />
		<Routes>
			<Route exact path="/" element={<Home token={token} />} />
			<Route exact path="/exam" element={<Exam token={token} />} />
			<Route exact path="/upload" element={<Upload token={token} />} />
			<Route exact path="/new" element={<New token={token} />} />
			<Route exact path="/login" element={<Login token={token} setToken={setToken} />} />
			<Route exact path="/logout" element={<Logout
				to={{
					pathname: `/login`
				}}
			/>} />
		</Routes>
	</>
}

export default App;

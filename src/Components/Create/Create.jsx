import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import axios from "axios";
import { ADDRESS } from "../Context";

const Create = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [number, setNumber] = useState("");
	const [button, setButton] = useState({ disabled: true, click: false });
	const [message, setMessage] = useState();

	const [classEmail, setClassEmail] = useState("");
	const [classUsername, setClassUsername] = useState("");
	const [classPassword, setClassPassword] = useState("");
	const [classNumber, setClassNumber] = useState("");

	useEffect(() => {
		const token = window.localStorage.getItem("access_token");
		if (token) {
			window.location.pathname = "/home";
		}
	}, []);

	useEffect(() => {
		(async () => {
			setClassUsername("");
			if (username && username.length < 5) {
				setClassUsername("warning");
				setMessage("Username must be greater than 5");
				setTimeout(() => setMessage(""), 2000);
			} else if (username && username.length > 5) {
				setClassUsername("");
				const { data } = await axios.post(`${ADDRESS}/create`, {
					username: username.trim(),
				});
				if (data.data) {
					setClassUsername("success");
				} else {
					setMessage("Username has already declared");
					setClassUsername("warning");
					setTimeout(() => setMessage(""), 2000);
				}
			}
		})();
	}, [username]);

	useEffect(() => {
		(async () => {
			setClassPassword("");
			if (password && password.length < 8) {
				setClassPassword("warning");
				setMessage("Password must be greater than 8");
				setTimeout(() => setMessage(""), 2000);
			} else if (password && password.length >= 8) {
				setClassPassword("success");
			}
		})();
	}, [password]);

	useEffect(() => {
		(async () => {
			setClassEmail("");
			if (email && email.length >= 12) {
				const stringArray = email.split("");
				const dog = stringArray.find((i) => i === "@");
				const fulstap = stringArray.find((i) => i === ".");
				if (dog && fulstap) {
					setClassEmail("");
					const { data } = await axios.post(`${ADDRESS}/create`, {
						email,
					});
					if (data.data) {
						setClassEmail("success");
					} else {
						setMessage(
							"This email already in use by another account"
						);
						setClassEmail("warning");
						setTimeout(() => setMessage(""), 2000);
					}
				} else {
					setClassEmail("warning");
					setMessage("Invalid email");
					setTimeout(() => setMessage(""), 2000);
				}
			}
		})();
	}, [email]);

	useEffect(() => {
		(async () => {
			setClassNumber("");
			if (number && number.length > 9) {
				setClassNumber("warning");
				setMessage("Only AB AAA BB CC");
				setTimeout(() => setMessage(""), 2000);
			} else if (number && number.length === 9) {
				setClassNumber("");
				const { data } = await axios.post(`${ADDRESS}/create`, {
					number,
				});
				if (data.data) {
					setClassNumber("success");
				} else {
					setMessage(
						"This phone number already in use by another account"
					);
					setClassNumber("warning");
					setTimeout(() => setMessage(""), 2000);
				}
			}
		})();
	}, [number]);

	useEffect(() => {
		(async () => {
			if (
				classUsername === "success" &&
				classPassword === "success" &&
				classEmail === "success" &&
				classNumber === "success"
			) {
				setButton({ disabled: false });
				if (button.click) {
					const { data } = await axios.post(`${ADDRESS}/create`, {
						username: username.trim(),
						password: password.trim(),
						number: number.trim(),
						email: email.trim(),
					});
					if (data.data) {
						setMessage(data.message);
						window.localStorage.setItem(
							"access_token",
							data.access_token
						);
						window.location.pathname = "/account";
					} else {
						setMessage(data.message);
						setTimeout(() => setMessage(""), 1000);
					}
				}
			}
		})();
	}, [
		button.click,
		classUsername,
		classPassword,
		classEmail,
		classNumber,
		username,
		password,
		number,
		email,
	]);

	function buttonClick(e) {
		e.preventDefault();
		return setButton({ disabled: true, click: true });
	}

	return (
		<>
			<Link className="exit" to="/home">
				<FaTimesCircle />
			</Link>
			<div className="create_container">
				<form>
					<h1>Sign Up</h1>

					<label htmlFor="username">Username</label>
					<input
						className={classUsername}
						onKeyUp={(e) => {
							setUsername(e.target.value);
						}}
						id="username"
						type="text"
						autoComplete="false"
						placeholder="Username"
						minLength="3"
						required
					/>

					<label htmlFor="password">Password</label>
					<input
						className={classPassword}
						onKeyUp={(e) => {
							setPassword(e.target.value);
						}}
						id="password"
						type="password"
						autoComplete="false"
						placeholder="Password"
						minLength="6"
						required
					/>

					<label htmlFor="number">Phone number (9* ABC AB AC)</label>
					<input
						className={classNumber}
						onKeyUp={(e) => {
							setNumber(e.target.value);
						}}
						id="number"
						type="number"
						autoComplete="false"
						placeholder="9* *** ** **"
						minLength="9"
						maxLength="9"
						required
					/>

					<label htmlFor="email">Email</label>
					<input
						className={classEmail}
						onKeyUp={(e) => {
							setEmail(e.target.value);
						}}
						id="email"
						type="mail"
						placeholder="Email"
					/>

					<p className="message">{message}</p>

					<Link className="loginLink" to="/login">
						Sign In
					</Link>
					<button
						disabled={button.disabled}
						onClick={(e) => buttonClick(e)}
						className="createBtn"
					>
						Create
					</button>
				</form>
			</div>
		</>
	);
};

export default Create;

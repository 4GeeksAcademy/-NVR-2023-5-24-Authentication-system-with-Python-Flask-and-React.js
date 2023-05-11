import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [credentials, setCredentials] = useState({
		email: "",
		password: ""
	});

	const handleLogin = async () => {
		const { email, password } = credentials;
		const response = await fetch(process.env.BACKEND_URL + "api/login", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});
		try {
			if (response.ok) {
				const data = await response.json();
				localStorage.setItem("token", data.token);
				store.token = data.token;
				store.user = email;
				navigate("/private");
			} else {
				throw new Error("Unable to retrieve token");
			}
		} catch (error) {
			console.error("Error logging in:", error);
		}
	};

	return (
		<div className="container-fluid d-flex justify-content-center align-items-center vh-100">
			<div className="col-sm-12 col-md-6 col-lg-4 p-3">
				<form className="Form-login py-3">
					<h2 className="Login-title">Login</h2>
					<div className="mb-3">

						<input
							type="email"
							placeholder="Enter email"
							className="form-control"
							id="exampleInputEmail1"
							aria-describedby="emailHelp"
							value={credentials.email}
							onChange={(event) => { setCredentials({ ...credentials, email: event.target.value }) }}
						/>
					</div>
					<div className="mb-3">
						<input
							type="password"
							placeholder="Enter password"
							className="form-control"
							id="exampleInputPassword1"
							value={credentials.password}
							onChange={(event) => { setCredentials({ ...credentials, password: event.target.value }) }}
						/>
					</div>
					<button
						type="submit"
						className={`btn ${credentials.email && credentials.password ? "btn btn-dark" : "btn btn-outline-light italic"} w-100`}
						onClick={() => handleLogin()}
						disabled={!credentials.email || !credentials.password}
					>
						{credentials.email && credentials.password ? "Login" : "Email and password required to login"}
					</button>
				</form>
			</div>
		</div>
	);
};

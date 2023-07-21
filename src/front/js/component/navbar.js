import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);



	return (
		<nav className="navbar g-0 Navigation">
			<div className="container my-3">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">
						<button className="btn btn-outline-light">Home</button>
					</span>
				</Link>
				<div className="ml-auto">
					{store.user !== null && store.user !== undefined && store.user !== "" ? (
						<>
							<span className="mx-1 User-label"><Link className="Link" to="/private">{store.user}</Link></span>
							<button className="btn btn-outline-danger mx-1 Logout" onClick={() => {
								actions.handleLogOut();
								navigate("/private");
								}}>
								Logout
							</button>
						</>
					) : (
						<>
							<Link to="/register">
								<button className="btn btn-outline-warning mx-1">Register</button>
							</Link>
							<Link to="/login">
								<button className="btn btn-success mx-1 Login">Login</button>
							</Link>
						</>
					)}
				</div>

			</div>
		</nav>
	);
};

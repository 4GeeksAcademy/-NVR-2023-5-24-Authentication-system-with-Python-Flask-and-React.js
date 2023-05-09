import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Register = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid">
            <p>Register</p>
		</div>
	);
};

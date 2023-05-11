import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Register = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    
    
    const registerNewUser = async () => {
        try {
            const response = await fetch(process.env.BACKEND_URL + "api/users", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(credentials)
            });
            if (response.ok) {
                navigate("/login");
            }


        } catch (error) {
            console.error("Error registering user:", error);
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center">
            <div className="col-sm-12 col-md-6 col-lg-4 p-3 border">
                <form>
                    <h2>Register</h2>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            value={credentials.email}
                            onChange={(event) => { setCredentials({ ...credentials, email: event.target.value }) }}
                        />
                        <div id="emailHelp" className="form-text">
                            We'll never share your email with anyone else.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            value={credentials.password}
                            onChange={(event) => { setCredentials({ ...credentials, password: event.target.value }) }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={() => registerNewUser()}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

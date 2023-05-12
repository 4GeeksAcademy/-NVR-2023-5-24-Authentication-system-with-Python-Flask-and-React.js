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

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            <div className="col-sm-12 col-md-6 col-lg-4 p-3 Form-wrapper">
                <form className="Form-register py-3">
                    <h2 className="Login-title">Register</h2>
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
                        className={`btn ${credentials.email && credentials.password ? "btn btn-dark" : "btn btn-outline-dark italic"} w-100`}
                        onClick={() => {
                            actions.registerNewUser(credentials);
                            navigate("/login");
                            }
                        }
                        disabled={!credentials.email || !credentials.password}
                    >
                        {credentials.email && credentials.password ? "Register" : "Email and password required to register"}
                    </button>
                </form>
            </div>
        </div>
    );
};

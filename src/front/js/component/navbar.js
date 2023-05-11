import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [user, setUser] = useState(store.user);

  useEffect(() => {
    setUser(store.user);
  }, [store.user]);

  const handleLogOut = () => {
	setUser("");
    actions.logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container g-0 my-1">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">
            <button className="btn btn-outline-dark">Home</button>
          </span>
        </Link>
        <div className="ml-auto">
          {user !== null && user !== undefined && user !== "" ? (
            <button className="btn btn-danger mx-1" onClick={handleLogOut}>
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="btn btn-success mx-1">Login</button>
            </Link>
          )}
          {user !== null && user !== undefined && user !== "" ? (
            <span className="mx-1">{user}</span>
          ) : (
            <Link to="/register">
              <button className="btn btn-warning mx-1">Register</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="card" style={{ width: "18rem" }}>
					<div className="card-body">
						<h5 className="card-title">Pet name</h5>
						<h6 className="card-subtitle mb-2 text-muted">Pet age</h6>
						<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
					</div>
				</div>

			</div>
		</div>
	);
};

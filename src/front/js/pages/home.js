import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid">
            <div className="row">
                {store.pets && store.pets.length > 0 ? store.pets.map((element) => {
                    return (
                        <div className="col mb-3">
                            <div key={element.id} className="card" style={{ width: "18rem" }}>
                                <div className="card-body text-center">
                                    <h5 className="card-title">{element.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{element.age}</h6>
                                </div>
                            </div>
                        </div>
                    )
                }) : <div>Pets cannot be displayed</div>
                }

            </div>
        </div>
    );
};

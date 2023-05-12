import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Private = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {

    const initialize = async () => {
      if (!actions.isLoggedIn()) {
        navigate("/");
      } else {
        await actions.getAllPetsByCurrentUser();
      }
    }

    initialize();
  }, [store.token]);
  

  return (
    <div className="container-fluid">
      <div className="row">
        {store.pets && store.pets.length > 0 ? (
          store.pets.map((element) => {
            return (
              <div className="col-sm-12 col-md-4 col-lg-2 mb-3" key={element.id}>
                <div className="card Card-wrapper">
                  <div className="card-header Card-header">{element.name}</div>
                  <div className="card-body Card-body">
                    <p className="card-text Card-subtitle ">{element.age}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="home-subtitle">No pets to display</div>
        )}
      </div>
    </div>
  );
};

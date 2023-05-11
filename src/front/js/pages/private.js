import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Private = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      if (!store.user || store.user === "") {
        navigate("/");
      } else {
        await actions.getAllPets();
      }
    }
    fetchPets();
  }, [store.user]);

  return (
    <div className="container-fluid">
      <div className="row">
        {store.pets && store.pets.length > 0 ? (
          store.pets.map((element) => {
            return (
              <div className="col mb-3" key={element.id}>
                <div className="card" style={{ width: "18rem" }}>
                  <div className="card-body text-center">
                    <h5 className="card-title">{element.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {element.age}
                    </h6>
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

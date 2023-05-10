const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			pets: [],
			token: null,
			user: {}

		},
		actions: {
			// Use getActions to call a function within a fuction
			// process.env.BACKEND_URL+"api/pets"

			login: async (email, password) => {
				const response = await fetch(process.env.BACKEND_URL + "api/login", {
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify({ email: email, password: password })
				});

				if (response.ok) {
					const data = await response.json();
					localStorage.setItem("token", data.token);
					setStore({ token: data.token });
					return true;
				}
				else {
					console.log("Unable to retrieve token");
					return false;
				}
			},

			getAllPets: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/pets", {
						headers: {
							"Authorization": "Bearer " + localStorage.getItem("token")
						}
					});
					const data = await response.json();
					setStore({ pets: data.pets });
				}
				catch (error) {
					console.log("Error fecthing Pet data:", error);
				}
			},

			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
		}
	};
};

export default getState;

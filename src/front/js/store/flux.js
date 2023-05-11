const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			pets: [],
			token: null,
			user: ""

		},
		actions: {
			logout: () => {
			setStore({ user: "", token: "" });
			localStorage.removeItem("token");
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



		}
	};
};

export default getState;

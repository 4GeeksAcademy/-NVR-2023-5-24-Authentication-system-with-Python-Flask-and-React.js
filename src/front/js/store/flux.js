const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			pets: [],
			
		},
		actions: {
			// Use getActions to call a function within a fuction
			//"https://nvr-2023-fantastic-doodle-9v4pg5q4xrwc495-3001.preview.app.github.dev/api/pets"
			// process.env.BACKEND_URL+"api/pets"
			
			getAllPets: async() => {
				try {
					const response = await fetch(process.env.BACKEND_URL+"api/pets");
					const data = await response.json();
					setStore({pets: data.pets})
					}
				catch (error) {
					console.log("Error fecthing Pet data:", error)
				}

			
			},
			
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
		}
	};
};

export default getState;

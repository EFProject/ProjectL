const BACKEND_URL = "http://localhost:5001"

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: "",
		},
		actions: {
			// Use getActions to call a function within a fuction

			login: async (formData, setErrors) => {
				const url = BACKEND_URL + '/users/login';
				try {
					// Send the form data to the server
					const response = await fetch(url, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(formData),
					});

					if (response.status === 200) {
						const responseData = await response.json();
						const accessToken = responseData.access_token;
						sessionStorage.setItem("token", accessToken);
						sessionStorage.setItem("user_id", responseData.id);
						sessionStorage.setItem("email", responseData.email);
						sessionStorage.setItem("name", responseData.name);
						setStore({ token: accessToken })
						window.alert("Bentornato " + responseData.name + "!")
						return true;
					} else if (response.status === 404) {
						return false;
					}
				} catch (error) {
					// Handle errors (e.g., network issues, server errors)
					console.error('Login error:', error.message);

					// Set error messages based on the specific error received
					setErrors({
						serverError: error.message,
					});

					// Display an error alert
					window.alert('Login failed. Please try again.');
				}
			},

			checkToken: async () => {

				const token = sessionStorage.getItem("token");

				if (token) {
					const url = BACKEND_URL + '/users/checkToken';

					try {
						const response = await fetch(url, {
							headers: {
								Authorization: "Bearer " + token,
							},
						});

						if (!response.ok) {
							console.log("Error Status Code:", response.status);
							const errorData = await response.json();
							console.log("Error Data:", errorData);
							sessionStorage.removeItem("token");
							setStore({ token: null })
						}

					} catch (error) {
						console.error("Error:", error);
					}

				}
			},

			logout: () => {
				sessionStorage.removeItem("token");
				setStore({ token: null })
			},

			syncTokenFromSessionStorage: () => {
				const token = sessionStorage.getItem("token");
				if (token && token !== "" && token !== undefined) setStore({ token: token })
			}

		}
	};
};

export default getState;
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: "",
		},
		actions: {
			// Use getActions to call a function within a fuction
			
			login: async (formData, setErrors) => {
				const url = 'http://localhost:5000/users/login';
				try {
					// Send the form data to the server
					const response = await fetch(url, {
					  method: 'POST',
					  headers: {
						'Content-Type': 'application/json',
					  },
					  body: JSON.stringify(formData),
					});
			  
					if (response.ok) {
					  const responseData = await response.json(); // Parse JSON response
					  const accessToken = responseData.access_token;
					  sessionStorage.setItem("token", accessToken);
					  setStore({token: accessToken})
					  return true;
					} else {
					  // Handle error
					  console.error('Failed to fetch data from the server');
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
					window.alert('Login failed. Please try again later.');
				  }
			},

			logout: ()=>{
				sessionStorage.removeItem("token");
				setStore({token: null})
			},

			checkToken: ()=>{
				if(!getState.store.token) return false
				const sessionToken = sessionStorage.getItem("token");
				console.log(sessionToken, getStore.token)
				return (sessionToken === getStore.token)
			},

			syncTokenFromSessionStorage: ()=>{
				const token = sessionStorage.getItem("token");
				if(token && token !== "" && token !== undefined) setStore({token: token})
			}

		}
	};
};

export default getState;
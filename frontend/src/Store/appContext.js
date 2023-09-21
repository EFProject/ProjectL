import React, { useEffect, useState } from "react";
import getState from "./flux.js";

export const Context = React.createContext(null);

// This function injects the global store to any view/component where you want to use it, we will inject the context to App.js
const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		//this will be passed as the context value
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		useEffect(() => {

			state.actions.checkToken();
			state.actions.syncTokenFromSessionStorage();

		// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;
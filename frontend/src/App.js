import React, { useState, useEffect } from 'react'
import { Members } from './Components/Members';

function App() {

	const [data, setData] = useState([{}])
	const url ="http://localhost:5000"

	useEffect(() => {
		fetch(url).then(response => {
			// eslint-disable-next-line eqeqeq
			if(response.status == 200){
				return response.json()
			}
		}).then(
			data => {
				setData(data)
				console.log(data)
			}
		).catch(error => {
			console.error("Error fetching data:", error);
		});
	}, [])

	return (
		<div>
			<Members data={data}></Members>
		</div>
	)

}

export default App
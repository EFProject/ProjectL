import React, { useState, useEffect } from 'react'
import NewsList from './Components/NewsList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

	const [data, setData] = useState()
	const url ="http://localhost:5000/events"

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
			{console.log(data)}
			{data ? <NewsList data={data}/> : <p>No data</p> }
		</div>
	)

}

export default App
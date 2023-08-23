import React, { useState, useEffect } from 'react'
import NavBar from '../Components/NavBar';
import NewsList from '../Components/NewsList';

function Home() {

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

		<NavBar></NavBar>
		{data ? <NewsList data={data}/> : <p>No data</p> }
			
	</div>
  );

}

export default Home;

import React, { useState, useEffect } from 'react';
import NewsList from '../Components/NewsList';
import NewsFilter from '../Components/FilterNews';
import Pagination from '../Components/Pagination';
import { Container } from 'react-bootstrap';

function Home() {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [filter, setFilter] = useState({
		country: '',
		q: '',
		pageSize: 20,
		page: 1,
	});

	const buildApiUrl = () => {
		let apiUrl = 'http://localhost:5000/news/?';

		if (filter.country) {
			apiUrl += `country=${filter.country}&`;
		}

		if (filter.q) {
			apiUrl += `q=${filter.q}&`;
		}

		apiUrl += `pageSize=${filter.pageSize}&page=${filter.page}`;

		return apiUrl;
	};

	const apiUrl = buildApiUrl();

	useEffect(() => {
		setIsLoading(true);
		fetch(apiUrl)
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				}
			})
			.then((data) => {
				setData(data);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
				setIsLoading(false);
			});
	}, [apiUrl]);

	const handleFilterChange = (newFilter) => {
		setFilter(newFilter);
	};

	const handlePageChange = (newPage) => {
		setFilter({ ...filter, page: newPage });
	};

	return (
		<div>
			<NewsFilter onFilterChange={handleFilterChange} />
			{isLoading ? (
				<Container className="mt-4"><h4>Loading News...</h4></Container>
			) : data && data.articles && data.articles.length > 0 ? (
				<>
					<NewsList data={data} />
					<Pagination
						currentPage={filter.page}
						totalPages={Math.ceil(data.totalResults / filter.pageSize)}
						onPageChange={handlePageChange}
					/>
				</>
			) : (
				<Container className="mt-4"><h4>No data</h4></Container>
			)}
		</div>
	);
}

export default Home;

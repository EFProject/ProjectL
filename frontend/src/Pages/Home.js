import React, { useState, useEffect } from 'react';
import NewsList from '../Components/NewsList';
import MyNews from '../Components/MyNews'; 
import NewsFilter from '../Components/FilterNews';
import Pagination from '../Components/Pagination';
import { Container, Button } from 'react-bootstrap';

function Home() {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [favorites, setFavorites] = useState([]);
	const [selectedTab, setSelectedTab] = useState('latest');
	const [filter, setFilter] = useState({
		country: 'it',
		q: '',
		pageSize: 10,
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

	const fetchFavorites = () => {
		const favoritesApiUrl = 'http://localhost:5000/news/' + sessionStorage.getItem('user_id');
		fetch(favoritesApiUrl)
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				} else {
					throw new Error('Failed to fetch favorites');
				}
			})
			.then((favoritesData) => {
				setFavorites(favoritesData.news);
			})
			.catch((error) => {
				console.error('Error fetching favorites:', error);
			});
	};

	const apiUrl = buildApiUrl();

	useEffect(() => {
		setIsLoading(true);
		fetchFavorites();
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

	const onAddToFavorites = (item, isFavorite) => {
		if (selectedTab === 'latest' && !isFavorite) {

			const createNewsApiUrl = 'http://localhost:5000/news/create';
			fetch(createNewsApiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(item),
			})
				.then(async (response) => {
					if (response.status === 200) {
						const responseData = await response.json();
						setFavorites([responseData, ...favorites]);
					} else {
						window.alert('Failed to add from favorities')
						console.error('Failed to create news item:', response.statusText);
					}
				})
				.catch((error) => {
					window.alert('Failed to add from favorities')
					console.error('Error creating news item:', error);
				});
		} else if (selectedTab === 'myNews' || isFavorite) {

			let id = ''
			if (!item.id) {
				const deletePref = favorites.find((fav) => fav.title === item.title);
				id = deletePref.id;
			} else {
				id = item.id
			}
			const deleteNewsApiUrl = 'http://localhost:5000/news/' + id;
			fetch(deleteNewsApiUrl, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(item),
			})
				.then((response) => {
					if (response.status === 200) {
						const updatedFavorites = favorites.filter((fav) => fav.id !== id);
						setFavorites(updatedFavorites);
					} else {
						window.alert('Failed to delete from favorities')
						console.error('Failed to delete news item:', response.statusText);
					}
				})
				.catch((error) => {
					window.alert('Failed to delete from favorities')
					console.error('Error deleting news item:', error);
				});
		}
	};

	return (
		<div>
			<Container className="mt-4 mb-4">
				<Button
					className={`${selectedTab === 'latest' ? 'form-button' : 'outline-form-button'
						} me-4`}
					onClick={() => setSelectedTab('latest')}
				>
					<h4 className="m-2">Latest News</h4>
				</Button>
				<Button
					className={`${selectedTab === 'myNews' ? 'form-button' : 'outline-form-button'
						} ms-4`}
					onClick={() => setSelectedTab('myNews')}
				>
					<h4 className="m-2">My News</h4>
				</Button>
			</Container>
			{selectedTab === 'latest' && (
				<>
					<NewsFilter onFilterChange={handleFilterChange} />
					{isLoading ? (
						<Container className="mt-4"><h4>Loading News...</h4></Container>
					) : data && data.articles && data.articles.length > 0 ? (
						<>
							<NewsList data={data} favorites={favorites} onAddToFavorites={onAddToFavorites} />
							<Pagination
								currentPage={filter.page}
								totalPages={Math.ceil(data.totalResults / filter.pageSize)}
								onPageChange={handlePageChange}
							/>
						</>
					) : (
						<Container className="mt-4"><h4>No data</h4></Container>
					)}
				</>
			)}
			{selectedTab === 'myNews' && (
				<>
					{favorites && favorites.length > 0 ? (
						<>
							<MyNews favorites={favorites} onAddToFavorites={onAddToFavorites} updatedFavorites={favorites} />
						</>
					) : (
						<Container className="mt-4"><h4>No news added to favorities, go to 'Latest News'</h4></Container>
					)}
				</>
			)}
		</div>
	);
}

export default Home;

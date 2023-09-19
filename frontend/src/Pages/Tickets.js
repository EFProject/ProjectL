import React, { useState, useEffect } from 'react';
import MyCollection from '../Components/MyNews'; 
import Pagination from '../Components/Pagination';
import { Container, Button } from 'react-bootstrap';
import TicketList from '../Components/TicketList';
import FilterTickets from '../Components/FilterTickets';

function Tickets() {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [collection, setCollection] = useState([]);
	const [selectedTab, setSelectedTab] = useState('store');
	const [filter, setFilter] = useState({
		locale: 'us',
		keyword: '',
		size: 10,
		page: 0,
	});

	const buildApiUrl = () => {
		let apiUrl = 'http://localhost:5002/tickets/?';

		if (filter.locale) {
			apiUrl += `locale=${filter.locale}&`;
		}

		if (filter.keyword) {
			apiUrl += `keyword=${filter.keyword}&`;
		}

		apiUrl += `size=${filter.size}&page=${filter.page}`;

		return apiUrl;
	};

	// const fetchCollection = () => {
	// 	const collectionApiUrl = 'http://localhost:5002/tickets/' + sessionStorage.getItem('user_id');
	// 	fetch(collectionApiUrl)
	// 		.then((response) => {
	// 			if (response.status === 200) {
	// 				return response.json();
	// 			} else {
	// 				throw new Error('Failed to fetch collection');
	// 			}
	// 		})
	// 		.then((collectionData) => {
	// 			setCollection(collectionData.tickets);
	// 		})
	// 		.catch((error) => {
	// 			console.error('Error fetching collection:', error);
	// 		});
	// };

	const apiUrl = buildApiUrl();

	useEffect(() => {
		console.log(filter)
		setIsLoading(true);
		// fetchCollection();
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

	const onAddToCollection = (item, collected) => {
		if (selectedTab === 'store' && !collected) {

			const createNewsApiUrl = 'http://localhost:5002/tickets/collect';
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
						setCollection([responseData, ...collection]);
					} else {
						window.alert('Failed to collect ticket in your profile')
						console.error('Failed to collect ticket:', response.statusText);
					}
				})
				.catch((error) => {
					window.alert('Failed to collect ticket in your profile')
					console.error('Error collect ticket:', error);
				});
		} else if (selectedTab === 'myCollection' || collected) {

			let id = ''
			if (!item.id) {
				const deletePref = collection.find((fav) => fav.title === item.title);
				id = deletePref.id;
			} else {
				id = item.id
			}
			const deleteNewsApiUrl = 'http://localhost:5002/tickets/' + id;
			fetch(deleteNewsApiUrl, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(item),
			})
				.then((response) => {
					if (response.status === 200) {
						const updateCollection = collection.filter((fav) => fav.id !== id);
						setCollection(updateCollection);
					} else {
						window.alert('Failed to delete ticket from collection')
						console.error('Failed to delete ticket from collection:', response.statusText);
					}
				})
				.catch((error) => {
					window.alert('Failed to delete from collection')
					console.error('Error deleting ticket item:', error);
				});
		}
	};

	return (
		<div>
			<Container className="mt-4 mb-4">
				<Button
					className={`${selectedTab === 'store' ? 'form-button' : 'outline-form-button'
						} me-4`}
					onClick={() => setSelectedTab('store')}
				>
					<h4 className="m-2">Ticket Store</h4>
				</Button>
				<Button
					className={`${selectedTab === 'myCollection' ? 'form-button' : 'outline-form-button'
						} ms-4`}
					onClick={() => setSelectedTab('myCollection')}
				>
					<h4 className="m-2">My Collection</h4>
				</Button>
			</Container>
			{selectedTab === 'store' && (
				<>
					<FilterTickets onFilterChange={handleFilterChange} />
					{isLoading ? (
						<Container className="mt-4"><h4>Loading Tickets...</h4></Container>
					) : data ? (
						<>
							<TicketList data={data} collection={collection} onAddToCollection={onAddToCollection} />
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
			{selectedTab === 'myCollection' && (
				<>
					{collection && collection.length > 0 ? (
						<>
							<MyCollection collection={collection} onAddToCollection={onAddToCollection}/>
						</>
					) : (
						<Container className="mt-4"><h4>No tickets in your collection, go to 'Ticket Store'</h4></Container>
					)}
				</>
			)}
		</div>
	);
}

export default Tickets;

import React, { useEffect, useState } from "react";
import Residence from "./components/Residence";
import Searchbox from "./components/SearchBox";
import axios from "axios";
import ReactPaginate from "react-paginate";

export default function Hostels(props) {
	const [hostels, setHostels] = useState([]);
	const [residences, setResidences] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(6);
	useEffect(() => {
		const fetchHostels = async () => {
			try {
				const res = await axios({
					method: "get",
					url: `${process.env.REACT_APP_API_URL}/api/v1/residences/hostels?page=${page}&limit=${limit}`,
				});
				setPageCount(Math.ceil(res.data.total / limit)); // set pageCount
				setHostels(res.data.data);
			} catch (error) {
				console.log(error);
			}
		};
		const fetchResidences = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/residences/hostels`,
			});
			setPageCount(Math.ceil(res.data.total / limit)); // set pageCount
			setResidences(res.data.data);
		};
		fetchResidences();
		fetchHostels();
	}, [page, limit]);

	useEffect(() => {
		// setInterval(() => {
		// 	const arr = hostels.sort(() => Math.random() - 0.5);
		// 	setHostels(arr);
		// }, 60000);
		// 480000
		// return () => clearInterval(timer);
	});

	const handlePageClick = (p) => {
		// var low = 1;
		// var high = pageCount;
		// var result = Math.floor(Math.random() * (1 + high - low)) + low;
		// setPage(result + 1);
		setPage(p.selected + 1);
		setLimit(limit);
	};
	return (
		<>
			<div className="container margin-top">
				<div>
					<Searchbox type="Hostel" data={residences} />
				</div>
				<div className="hostel-flex my-5">
					{hostels &&
						hostels.map((item, index) => {
							return <Residence residence={item} key={item._id} />;
						})}
				</div>

				<ReactPaginate
					breakLabel="..."
					nextLabel="Next >>"
					onPageChange={handlePageClick}
					// pageRangeDisplayed={5}
					pageCount={pageCount}
					previousLabel="<< Previous"
					renderOnZeroPageCount={null}
					containerClassName="pagination justify-content-center"
					pageClassName="page-item"
					pageLinkClassName="page-link"
					activeClassName=" active"
					activeLinkClassName="active"
					breakClassName="page-item"
					breakLinkClassName="page-link"
					nextClassName="page-item"
					nextLinkClassName="page-link"
					previousClassName="page-item"
					previousLinkClassName="page-link"
				/>
			</div>
		</>
	);
}

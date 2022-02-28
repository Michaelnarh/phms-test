import React, { useEffect, useState } from "react";
import { FaPen, FaEye, FaMinusCircle } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function Hostels(props) {
	const [hostels, setHostels] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(25);
	useEffect(() => {
		const fetchHostels = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/residences/hostels?page=${page}&limit=${limit}`,
			});
			console.log(res.data.total);
			setPageCount(Math.ceil(res.data.total / limit)); // set pageCount
			setHostels(res.data);
		};
		fetchHostels();
	}, [page, limit]);

	const handleView = async (id) => {
		const res = await axios({
			method: "get",
			url: `${process.env.REACT_APP_API_URL}/api/v1/residences/${id}`,
		});
		console.log(res.data);
	};
	const handleEdit = async (id) => {
		const res = await axios({
			method: "get",
			url: `${process.env.REACT_APP_API_URL}/api/v1/residences/${id}`,
		});
		console.log(res.data);
	};
	const handlePageClick = (p) => {
		setPage(p.selected + 1);
		setLimit(limit);
	};
	return (
		<>
			<div className="content-top-flex">
				<div className="search-area">
					<div>
						<input className="search-box" placeholder="Search Hostel" />
					</div>
					<div>
						<button className=" btn  form-control">SEARCH</button>
					</div>
				</div>
			</div>
			<div className="table-container">
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Hostel Name</th>
							<th>Location</th>
							<th>Zone/Constituency</th>
							<th>Digital Address</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{hostels.length !== 0 &&
							hostels.data.map((item, i) => (
								<tr key={item._id}>
									<td>{item._id.slice(20, 24)}</td>
									<td>{item.name}</td>
									<td>{item.location}</td>
									<td>{item.zone.name}</td>
									<td>{item.digitalAddress}</td>
									<td className="table-inline-flex">
										<FaEye
											size={20}
											onClick={() => handleView(item._id)}
											color="var(--darkBlue)"
											title="View"
										/>
										<FaPen
											size={20}
											onClick={() => handleEdit("edit")}
											color="var(--mainOrange)"
											title="Edit"
										/>
										<FaMinusCircle
											onClick={() => console.log("delete")}
											size={20}
											color="var(--mainRed)"
											title="Delete"
										/>
									</td>
								</tr>
							))}
					</tbody>
				</table>
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

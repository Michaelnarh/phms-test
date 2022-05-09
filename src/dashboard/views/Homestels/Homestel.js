import React, { useEffect, useState } from "react";
import { FaPen, FaEye, FaMinusCircle } from "react-icons/fa";
import axios from "axios";
import AxiosInstance from "../../utils/AxiosInstance";
import ReactPaginate from "react-paginate";
import SearchForm from "../../utils/SearchForm";

export default function Homestel(props) {
	const [homestels, setHomestels] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(25);

	useEffect(() => {
		const fetchHomestels = async () => {
			const res = await AxiosInstance({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/residences/homestels?page=${page}&limit=${limit}`,
			});
			setPageCount(Math.ceil(res.data.total / limit)); // set pageCount
			setHomestels(res.data.data);
		};

		fetchHomestels();
	}, [page, limit]);

	const handleView = async (id) => {
		const res = await AxiosInstance({
			method: "get",
			url: `${process.env.REACT_APP_API_URL}/api/v1/residences/${id}`,
		});
		console.log(res.data);
	};
	const handleEdit = async (id) => {
		const res = await AxiosInstance({
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
				<SearchForm data={homestels} type={`Homestels`} />
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
							<th className="text-center">Actions</th>
						</tr>
					</thead>
					<tbody>
						{homestels.length > 0 &&
							homestels.map((item) => (
								<tr key={item._id}>
									<td>{item._id.slice(20, 24)}</td>
									<td>{item.name}</td>
									<td>{item.location ? item.location.name : "N/A"}</td>
									<td>
										{item.location.zone ? item.location.zone.name : "N/A"}
									</td>
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

import React, { useEffect, useState } from "react";
import { FaPen, FaEye, FaMinusCircle } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomSpinner from "../../utils/CustomSpinner";

export default function Locations(props) {
	const navigate = useNavigate();
	const [locations, setLocations] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(25);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		setIsLoading(true);
		const fetchLocations = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/locations?page=${page}&limit=${limit}`,
			});
			setPageCount(Math.ceil(res.data.total / limit)); // set pageCount
			setLocations(res.data.data);
			setIsLoading(false);
		};

		const timer = setTimeout(() => fetchLocations(), 2000);

		return () => clearTimeout(timer);
	}, [page, limit]);

	const handleView = async (id) => {
		navigate(`/admin/locations/${id}`);
	};
	const handleEdit = async (id) => {
		navigate(`/admin/locations/${id}`);
		// console.log(res.data);
	};
	const handlePageClick = (p) => {
		setPage(p.selected + 1);
	};
	return (
		<>
			<div className="table-container">
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Location</th>
							<th>Zone/Constituency</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{locations === 0 ? (
							<tr></tr>
						) : (
							locations.map((item) => (
								<tr key={item._id}>
									<td>{item._id.slice(20, 24)}</td>
									<td>{item.name}</td>
									<td>{item.zone ? item.zone.name : "N/A"}</td>

									<td className="table-inline-flex">
										<FaEye
											size={20}
											onClick={() => handleView(item._id)}
											color="var(--darkBlue)"
											title="View"
										/>
										<FaPen
											size={20}
											onClick={() => handleEdit(item._id)}
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
							))
						)}
					</tbody>
				</table>
				<CustomSpinner isLoading={isLoading} type="circle" />
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

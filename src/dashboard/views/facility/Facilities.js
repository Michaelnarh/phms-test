import React, { useEffect, useState } from "react";
import { FaPen, FaEye, FaMinusCircle } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomSpinner from "../../utils/CustomSpinner";

export default function Zones(props) {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [facilities, setFacility] = useState([]);
	const [pageCount] = useState(1);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(25);
	useEffect(() => {
		setIsLoading(true);
		const fetchFacility = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/facilities?page=${page}&limit=${limit}`,
				headers: {
					"Content-Type": "application/json",
				},
			});

			// setPageCount(Math.ceil(res.data.total / limit)); // set pageCount
			setFacility(res.data.data);
			setIsLoading(false);
		};

		const timer = setTimeout(() => fetchFacility(), 2000);

		return () => clearTimeout(timer);
	}, [page, limit]);

	const handleView = async (id) => {
		// navigate(`details/${id}`);
	};
	const handleDelete = async (id) => {
		const res = await axios({
			method: "delete",
			url: `${process.env.REACT_APP_API_URL}/api/v1/facilities/${id}`,
			headers: {
				"Content-Type": "application/json",
			},
		});

		alert(JSON.stringify(res.data.message));
		navigate(`/admin/facilities`);
	};
	const handleEdit = async (id) => {
		navigate(`/admin/facilities/${id}`);
	};
	const handlePageClick = (p) => {
		setPage(p.selected + 1);
		setLimit(limit);
	};
	return (
		<>
			<div className="table-container">
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Description</th>
							<th>Action</th>
						</tr>
					</thead>

					<tbody>
						{facilities?.length == 0 ? (
							<tr></tr>
						) : (
							facilities.map((item) => (
								<tr key={item._id}>
									<td>{item._id.slice(20, 24)}</td>
									<td>{item.name}</td>
									<td>{item?.description?.slice(0, 20) + "..." ?? "N/A"}</td>

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
											onClick={() => handleDelete(item._id)}
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

import React, { useEffect, useState } from "react";
import { FaPen, FaEye, FaMinusCircle } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomSpinner from "../../utils/CustomSpinner";

export default function Zones(props) {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [classes, setClass] = useState([]);
	const [pageCount] = useState(1);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(25);
	useEffect(() => {
		setIsLoading(true);
		const fetchClasses = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/classes?page=${page}&limit=${limit}`,
				headers: {
					"Content-Type": "application/json",
				},
			});

			// setPageCount(Math.ceil(res.data.total / limit)); // set pageCount
			setClass(res.data.data);
			setIsLoading(false);
		};

		const timer = setTimeout(() => fetchClasses(), 2000);

		return () => clearTimeout(timer);
	}, [page, limit]);

	const handleView = async (id) => {
		navigate(`/admin/classes/${id}`);
	};
	const handleEdit = async (id) => {
		navigate(`/admin/classes/${id}`);
	};
	const handlePageClick = (p) => {
		setPage(p.selected + 1);
		setLimit(limit);
	};
	console.log(classes);
	return (
		<>
			<div className="table-container">
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>4 -in- 1</th>
							<th>3 -in- 1 </th>
							<th>2 -in- 1</th>
							<th>1 -in- 1</th>
							<th className="text-center">Actions</th>
						</tr>
					</thead>
					<tbody>
						{classes?.length === 0 ? (
							<tr></tr>
						) : (
							classes.map((item) => (
								<tr key={item._id}>
									<td>{item._id.slice(20, 24)}</td>
									<td>{item.name}</td>

									<td>{item?.category?.fourInOne ?? "N/A"}</td>
									<td>{item?.category?.threeInOne ?? "N/A"}</td>
									<td>{item?.category?.twoInOne ?? "N/A"}</td>

									<td>{item?.category?.oneInOne ?? "N/A"}</td>

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

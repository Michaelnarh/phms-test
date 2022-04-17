import React, { useEffect, useState } from "react";
import { FaPen, FaEye, FaMinusCircle } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchForm from "../../utils/SearchForm";
import { SpinnerCircular } from "spinners-react";

export default function Hostels(props) {
	const navigate = useNavigate();
	const [hostels, setHostels] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState();
	const [limit, setLimit] = useState(50);
	const [isLoading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		const fetchHostels = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/residences/hostels?page=${page}&limit=${limit}`,
			});

			setPageCount(Math.ceil(res.data.total / limit)); // set pageCount
			setHostels(res.data.data);
			setTotal(res.data.total);
		};
		fetchHostels();
		setLoading(false);
	}, [page, limit]);

	const handleView = async (slug) => {
		navigate(`details/${slug}`);
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
			<div className="page-number">
				<div className="d-flex ">
					<h5>
						<b>Total</b> <span>{total && total}</span>
					</h5>
					<h5 className="mx-auto">
						<b>Page</b>{" "}
						<span>
							{page} of {pageCount}
						</span>
					</h5>
				</div>
			</div>
			{!isLoading ? (
				<>
					<div className="content-top-flex">
						{hostels && <SearchForm data={hostels} type="Hostel" />}
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
								{hostels?.length > 0 &&
									hostels.map((item, i) => (
										<tr key={item._id}>
											<td>{item._id.slice(20, 24)}</td>
											<td>{item?.name}</td>
											<td>{item?.location ? item.location.name : "N/A"}</td>
											<td>
												{item?.location.zone ? item.location.zone.name : "N/A"}
											</td>
											<td>{item?.digitalAddress ?? "N/A"}</td>
											<td className="table-inline-flex">
												<FaEye
													size={20}
													onClick={() => handleView(item.slug)}
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
			) : (
				<div className="text-center mt-5">
					<SpinnerCircular speed={200} thickness={150} size={120} />
				</div>
			)}
		</>
	);
}

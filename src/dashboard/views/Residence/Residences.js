import React, { useEffect, useState } from "react";
import { FaPen, FaEye, FaMinusCircle } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import SearchForm from "../../utils/SearchForm";
import { ToastContainer, toast } from "react-toastify";
import AxiosInstance from "../../utils/AxiosInstance";
import { SpinnerCircular } from "spinners-react";

export default function Residences(props) {
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
			const res = await AxiosInstance({
				method: "get",
				url: `/api/v1/residences/?page=${page}&limit=${limit}`,
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
	const handleEdit = async (slug) => {
		navigate(`${slug}/edit`);
	};
	const handlePageClick = (p) => {
		setPage(p.selected + 1);
		setLimit(limit);
	};
	const handleDelete = async (id) => {
		const res = await AxiosInstance({
			method: "delete",
			url: `/api/v1/residences/${id}`,
		});

		if (res?.data?.status === "success") {
			// window.location.assign("/admin/residences");
			toast.success(res?.data?.message, { position: "top-center" });
			navigate("/admin/residences");
		}
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
						{hostels && <SearchForm data={hostels} type="Residence" />}
					</div>

					<div className="table-container">
						<ToastContainer style={{ marginTop: "60px" }} />
						<table>
							<thead>
								<tr>
									<th>ID</th>
									<th>Residence Name</th>
									<th>Type</th>
									<th>Location</th>
									<th>Zone/Constituency</th>
									<th>Digital Address</th>
									<th className="text-center">Actions</th>
								</tr>
							</thead>
							<tbody>
								{hostels?.length > 0 &&
									hostels.map((item, i) => (
										<tr key={item._id}>
											<td>{item._id.slice(20, 24)}</td>
											<td>{item?.name}</td>
											<td>{item?.residenceType}</td>
											<td>{item?.location ? item.location.name : "N/A"}</td>
											<td>{item?.location?.zone?.name ?? "N/A"}</td>
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
													onClick={() => handleEdit(item.slug)}
													color="var(--mainOrange)"
													title="Edit"
												/>
												<FaMinusCircle
													onClick={() => handleDelete(item?.id)}
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

import React, { useEffect, useState } from "react";
import { FaPen, FaEye, FaMinusCircle } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import AxiosInstance from "../../utils/AxiosInstance";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CustomSpinner from "../../utils/CustomSpinner";

export default function Zones(props) {
	const navigate = useNavigate();
	// const { message } = props?.location?.state;
	console.log(props?.location);
	const [zones, setZones] = useState([]);
	const [pageCount] = useState(1);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(25);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		setIsLoading(true);
		const fetchZones = async () => {
			try {
				const res = await AxiosInstance({
					method: "get",
					url: `/api/v1/zones?page=${page}&limit=${limit}`,
				});
				// setPageCount(Math.ceil(res.data.total / limit)); // set pageCount
				setZones(res.data.data);
				setIsLoading(false);
			} catch (err) {
				if (err?.response?.data?.message) {
					toast.error(err.response.data.message, { position: "top-center" });
				}
			}
		};
		const timer = setTimeout(() => fetchZones(), 2000);

		return () => clearTimeout(timer);
	}, [page, limit]);

	const handleView = async (id) => {
		navigate(`/admin/zones/${id}`);
		// navigate(`details/${id}`);
	};
	const handleEdit = async (id) => {
		navigate(`/admin/zones/${id}`);
	};
	const handlePageClick = (p) => {
		setPage(p.selected + 1);
		setLimit(limit);
	};
	const handleDelelte = async (id) => {
		try {
			const res = await AxiosInstance({
				method: "delete",
				url: `/api/v1/zones/${id}`,
			});
			setZones(res.data.data);
			setIsLoading(false);
			toast.success(res.data.message);
			navigate("/admin/zones");
		} catch (err) {
			if (err.response.data.message) {
				toast.error(err.response.data.message, { position: "top-center" });
			}
		}
	};

	if (props?.location?.state) {
		toast.success(props?.location?.state?.message);
	}

	return (
		<>
			<div className="table-container">
				<ToastContainer className="top-margin" />
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Zone/Constituency</th>
							<th>Senior Tutor In Charge</th>
							<th className="text-center">Actions</th>
						</tr>
					</thead>
					<tbody>
						{zones?.length === 0 ? (
							// <tr className="spinner-style">
							<tr></tr>
						) : (
							zones.map((item) => (
								<tr key={item._id}>
									<td>{item._id.slice(20, 24)}</td>
									<td>{item.name}</td>
									{item.tutor?.isCurrent ? (
										<td>{item.tutor ? item.tutor.name : "N/A"}</td>
									) : (
										<td> N/A</td>
									)}
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
											onClick={() => handleDelelte(item._id)}
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

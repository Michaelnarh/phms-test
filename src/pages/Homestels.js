import React, { useEffect, useState } from "react";
import Residence from "./components/Residence";
import Searchbox from "./components/SearchBox";
import ReactPaginate from "react-paginate";
import axios from "axios";
import noData from "../images/no-data.svg";

export default function Hostels(props) {
	const [homestels, setHomestels] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(24);
	useEffect(() => {
		const fetchHomestels = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/residences/homestels?page=${page}&limit=${limit}`,
			});
			console.log(res.data.total);
			setPageCount(Math.ceil(res.data.total / limit)); // set pageCount
			setHomestels(res.data.data);
		};

		fetchHomestels();
	}, [page, limit]);

	const handlePageClick = (p) => {
		setPage(p.selected + 1);
		setLimit(limit);
	};
	return (
		<>
			<div className="container margin-top">
				<div>
					<Searchbox type="Homestels" data={homestels} />
				</div>
				<div className="hostel-flex my-5">
					{homestels?.length === 0 ? (
						<>
							<img
								className="text-center"
								src={noData}
								alt="..."
								style={{ width: 250, height: 250 }}
							/>{" "}
							<br />
						</>
					) : (
						homestels.map((item, index) => {
							return (
								<>
									<Residence residence={item} key={index} />
								</>
							);
						})
					)}
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

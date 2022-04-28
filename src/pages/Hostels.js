import React, { useEffect, useState } from "react";
import Residence from "./components/Residence";
import Searchbox from "./components/SearchBox";
import axios from "axios";
import ReactPaginate from "react-paginate";

export default function Hostels(props) {
	const [hostels, setHostels] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(24);
	useEffect(() => {
		const fetchHostels = async () => {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}/api/v1/residences/hostels?page=${page}&limit=${limit}`,
			});
			setPageCount(Math.ceil(res.data.total / limit)); // set pageCount
			setHostels(res.data.data);
		};

		fetchHostels();
	}, [page, limit]);

	const handlePageClick = (p) => {
		setPage(p.selected + 1);
		setLimit(limit);
	};
	return (
		<>
			<div className="container margin-top">
				<div>
					<Searchbox type="Hostel" data={hostels} />
				</div>
				<div className="hostel-flex my-5">
					{hostels &&
						hostels.map((item, index) => {
							return (
								<>
									<Residence residence={item} key={index} />
								</>
							);
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

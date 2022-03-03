import React, { useEffect, useState } from "react";
import Residence from "./components/Residence";
import Searchbox from "./components/SearchBox";
import axios from "axios";
import ReactPaginate from "react-paginate";
const data = [
	{
		id: 1,
		name: "Adom Bi",
		img: "/imgs/adom_bi.jpg",
		location: "ayeduase",
		distance: 5,
		gpsAdrress: [12.2233, -12.23432],
	},
	{
		id: 2,
		name: "Amen hostel",
		img: "/imgs/amen-.jpg",
		location: "ayeduase",
		distance: 6,
		gpsAdrress: [12.2233, -12.23432],
	},
	{
		id: 3,
		name: "J&J hostel",
		img: "/imgs/jj.jpg",
		location: "Kotei",
		distance: 4.6,
		gpsAdrress: [12.2233, -12.23432],
		digitalAdrress: "AK-2670-1289",
	},
	{
		id: 4,
		name: "Nana Adoma Hostel",
		img: "/imgs/nana-adoma.jpg",
		location: "ayeduase",
		distance: 2,
		gpsAdrress: [12.2233, -12.23432],
		digitalAdrress: "AK-2670-1289",
	},
	{
		id: 5,
		name: "White house Hostel",
		img: "imgs/white-house.jpg",
		location: "Ayeduase",
		distance: 3,
		gpsAdrress: [72.2233, -12.23432],
		digitalAdrress: "AK-2670-1289",
	},
	{
		id: 6,
		name: "Canam Hall",
		img: "imgs/canam-hall-2.jpg",
		location: "Ayeduase",
		distance: 12,
		gpsAdrress: [72.2233, -12.23432],
		digitalAdrress: "AK-2670-1289",
	},
	{
		id: 7,
		name: "Frontline Court",
		img: "imgs/frontline-court.jpg",
		location: "Ayeduase",
		distance: 8,
		gpsAdrress: [72.2233, -12.23432],
		digitalAdrress: "AK-2670-1289",
	},
];

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
			console.log(res.data.total);
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
			<div className="container">
				<div>
					<Searchbox data={hostels} />
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

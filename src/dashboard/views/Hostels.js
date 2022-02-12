import React from "react";
import { CustomButton } from "./styledComponent";
import { FaPen, FaEye, FaMinusCircle } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import Toptitle from "./TopTitle";

export default function Hostels(props) {
	return (
		<>
			<div className="page-container mt-3">
				<Toptitle page="Hostels" />
				<div className="content-left-side">
					<button className=" btn mb-1 ">ADD HOSTEL</button>
				</div>

				<div className="content-top-flex">
					<div className="search-area">
						<div>
							<input className="search-box" placeholder="Search Hostel" />
						</div>
						<div>
							<button className=" btn  form-control">SEARCH</button>
						</div>
					</div>
				</div>
				<div className="table-container">
					<table>
						<th>ID</th>
						<th>Hostel Name</th>
						<th>Location</th>
						<th>Zone/Contituency</th>
						<th>Digital Address</th>
						<th>Action</th>

						<tbody>
							<tr>
								<td>4</td>
								<td>Stella Pusch</td>
								<td>Ayeduase </td>
								<td>Ayeduase North</td>
								<td>AK-780-3443</td>
								<td className="table-inline-flex">
									<FaEye size={20} color="var(--darkBlue)" title="View" />
									<FaPen size={20} color="var(--mainOrange)" title="Edit" />
									<FaMinusCircle
										size={20}
										color="var(--mainRed)"
										title="Delete"
									/>
								</td>
							</tr>
							<tr>
								<td>4</td>
								<td>Stella Pusch</td>
								<td>Ayeduase </td>
								<td>Ayeduase North</td>
								<td>AK-780-3443</td>
							</tr>
							<tr>
								<td>4</td>
								<td>Stella Pusch</td>
								<td>Ayeduase </td>
								<td>Ayeduase North</td>
								<td>AK-780-3443</td>
							</tr>
							<tr>
								<td>4</td>
								<td>Stella Pusch</td>
								<td>Ayeduase </td>
								<td>Ayeduase North</td>
								<td>AK-780-3443</td>
							</tr>
							<tr>
								<td>4</td>
								<td>Stella Pusch</td>
								<td>Ayeduase </td>
								<td>Ayeduase North</td>
								<td>AK-780-3443</td>
							</tr>
							<tr>
								<td>4</td>
								<td>Stella Pusch</td>
								<td>Ayeduase </td>
								<td>Ayeduase North</td>
								<td>AK-780-3443</td>
							</tr>
						</tbody>
					</table>
					<ReactPaginate
						breakLabel="..."
						nextLabel="next >"
						// onPageChange={handlePageClick}
						pageRangeDisplayed={5}
						pageCount={8}
						previousLabel="< previous"
						renderOnZeroPageCount={null}
						containerClassName="pagination justify-content-center"
						pageClassName="page-item"
						pageLinkClassName="page-link"
						// activeClassName=""
						// activeLinkClassName="page-link"
						breakClassName="page-item"
						breakLinkClassName="page-link"
						nextClassName="page-item"
						nextLinkClassName="page-link"
						previousClassName="page-item"
						previousLinkClassName="page-link"
					/>
				</div>
			</div>
		</>
	);
}

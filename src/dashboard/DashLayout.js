import react from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Emptypage from "./EmptyPage";
export default function DashLayout() {
	return (
		<>
			<div className="container-wrapper">
				<Navbar />
				<div className="layout">
					<Sidebar />
					<div className="content">
						<Emptypage />
					</div>
				</div>
			</div>
		</>
	);
}

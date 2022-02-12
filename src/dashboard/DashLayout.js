import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Drawer from "./Drawer";
import { useState } from "react";
export default function DashLayout() {
	const [isDrawerOpen, setDrawer] = useState(false);
	return (
		<>
			{isDrawerOpen && <Drawer />}
			<div className="container-wrapper">
				<Navbar func={setDrawer} isDrawerOpen={isDrawerOpen} />
				<div className="layout">
					<Sidebar />
					<div className="content">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
}

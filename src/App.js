import "./App.css";
import "./dashboard/dashStyles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-image-gallery/styles/css/image-gallery.css";
/***


/**
 * import of guest/regular users pages
 */
import MainLayout from "./Routes";

function App() {
	return (
		<>
			{/* {token && user?.role === "admin" ? <DashLayout /> : <Layout />} */}
			{/* <Route path="*" element={<Navigate to="/admin/login" />} /> */}

			<MainLayout />
		</>
	);
}

export default App;

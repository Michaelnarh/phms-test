import React from "react";
import "./App.css";
import "./dashboard/dashStyles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-image-gallery/styles/css/image-gallery.css";
import "spinners-react/lib/SpinnerCircular.css";
import "react-toastify/dist/ReactToastify.css";
/***


/**
 * import of guest/regular users pages
 * 
 */
import MainLayout from "./Routes";

function App() {
	return (
		<>
			<MainLayout />
		</>
	);
}

export default App;

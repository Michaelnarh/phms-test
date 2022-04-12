import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function NotFoundPage(props) {
	const navigate = useNavigate();
	return (
		<>
			<div className="text-center m-auto">
				<h2> The page you requested not found</h2>
				<Button onClick={() => navigate("/admin/dashboard")}>Back Home</Button>
			</div>
		</>
	);
}

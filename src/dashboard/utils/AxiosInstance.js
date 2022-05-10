import axios from "axios";
import AuthStore from "../../store/AuthStore";

const auth = new AuthStore();

const AxiosInstance = axios.create({
	baseURL: `${process.env.REACT_APP_API_URL}`,
	// timeout: 3000,
	headers: { Authorization: "Bearer " + auth.getToken() },
});

export default AxiosInstance;

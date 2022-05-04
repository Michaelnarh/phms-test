import { Navigate } from "react-router-dom";
import axios from "axios";
import Cookie from "universal-cookie";
const cookie = new Cookie();

export class AuthService {
	Login = async (payload) => {
		const res = await axios({
			method: "post",
			withCredentials: true,
			credentials: "include",
			url: `${process.env.REACT_APP_API_URL}/api/v1/users/login`,

			headers: {
				"Content-Type": "application/json",
			},
			data: payload,
		});
		if (res.data.status === "success") {
			console.log(res.data);
			localStorage.setItem("jwt", res.data.token);
			cookie.set("jwt", res.data.token);
			localStorage.setItem("user", JSON.stringify(res.data.user));
			localStorage.setItem("dumb", res.data.user._id);
			console.log("login successful");
			return res;
		}
		if (res.data.status === "failed") {
			console.log(res.data.message);
			throw new Error();
		}
	};
	signUp = async (payload) => {
		const res = await axios({
			method: "post",
			withCredentials: true,
			credentials: "include",
			url: `${process.env.REACT_APP_API_URL}/api/v1/users/signup`,

			headers: {
				"Content-Type": "application/json",
			},
			data: payload,
		});
		if (res.data.status === "success") {
			localStorage.setItem("jwt", res.data.token);
			localStorage.setItem("user", JSON.stringify(res.data.user));
			localStorage.setItem("dumb", res.data.user._id);
			console.log("login successful");
			window.location.assign("/admin/dashboard");
			return res;
		}
		if (res.data.status === "failed") {
			console.log(res.data.message);
			throw new Error();
		}
	};
	getUser = async (id) => {
		const res = await axios({
			method: "get",
			withCredentials: true,
			credentials: "include",
			url: `${process.env.REACT_APP_API_URL}/api/v1/users/${id}`,

			headers: {
				"Content-Type": "application/json",
			},
		});
		if (res.data.status === "success") {
			localStorage.setItem("jwt", res.data.token);
			// window.location.assign("/admin/dashboard");
		} else {
			throw new Error(res.data.message);
		}

		return res;
	};
}

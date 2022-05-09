import axios from "axios";
import Cookie from "universal-cookie";
import { parseJwt } from "./ModuleFunctions";
const cookie = new Cookie();

export class AuthService {
	Login = async (payload) => {
		try {
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
				localStorage.setItem("jwt", res.data?.token);
				cookie.set("jwt", res.data?.token);
				localStorage.setItem("user", JSON.stringify(res.data?.user));
				console.log("success");
				localStorage.setItem("dumb", res.data?.user?._id);
				console.log("login successful");
				window.location.assign("/admin/dashboard");
				return res;
			}
		} catch (err) {
			if (err.response) {
				console.log("response", err.response.data.message);
				console.log("response status", err.response.status);
				console.log("response request", err.response.headers);
				throw Error(err.response.data.message);
			} else if (err.request) {
				console.log("response,request", err.request);
				// throw  Error(err.request);
			} else if (axios.isCancel(err)) {
			} else {
				console.log("Error- message", err.message);

				throw new Error(err.message);
			}
			console.log(err);
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
			console.log("user has been added successfully");
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

	logOut() {
		localStorage.removeItem("dumb");
		localStorage.removeItem("user");
		localStorage.removeItem("id");
		localStorage.removeItem("jwt");
	}

	authVerify(token) {
		const decodedJwt = parseJwt(token);
		if (decodedJwt.exp * 1000 < Date.now()) {
			this.logOut();
		}
	}
}

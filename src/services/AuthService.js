import axios from "axios";
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
			localStorage.setItem("jwt", res.data.token);
			// window.location.assign("/admin/dashboard");
		}
		if (res.data.status === "failed") {
			console.log(res.data.message);
			throw new Error();
		}

		return res;
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

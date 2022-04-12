import { makeAutoObservable, when } from "mobx";
import { makePersistable } from "mobx-persist-store";
import Cookie from "universal-cookie";
const cookie = new Cookie();
class AuthStore {
	constructor() {
		makeAutoObservable(this);
	}

	token = localStorage.getItem("jwt");
	isLoggedIn = false;
	isAdmin = false;
	user = JSON.parse(localStorage.getItem("user"));

	//get functions
	getToken = () => this.token;
	getIsLoggedIn = () => this.isLoggedIn;
	getIsAdmin = () => this.isAdmin;
	getUser = () => this.user;

	//setters
	setToken = (t) => {
		this.token = t;
	};
	setIsAdmin = (state) => {
		this.isAdmin = state;
	};

	async function() {
		await when(this.token, this.setCookie());
	}
	setCookie = () => {
		localStorage.setItem("jwt", this.token);
		cookie.set("jwt", this.token);
	};

	setUser = (u) => {
		this.user.username = u.username;
		this.user.email = u.email;
		this.user.contact = u.contact;
		this.user.role = u.role;
		this.user.image = u.image;
	};
	setIsLoggedIn = (data) => {
		this.isLoggedIn = data;
	};
}
makePersistable(this, {
	name: "AuthStore",
	properties: ["user", "isLoggedIn", "isAdmin"],
	storage: window.localStorage,
});
export default AuthStore;

import { makeAutoObservable, runInAction } from "mobx";
import Cookie from "universal-cookie";
const cookie = new Cookie();
class AuthStore {
	constructor() {
		makeAutoObservable(this);
	}

	token = window.localStorage.getItem("jwt");
	isLoggedIn = false;
	isAdmin = false;
	user = {};

	//get functions
	getToken = () => this.token;
	getIsLoggeIn = () => this.isLoggedIn;
	getIsAdmin = () => this.isAdmin;
	getUser = () => this.user;

	//setters
	setToken = (t) => {
		this.token = t;
	};

	setCookie = () => {
		cookie.set("jwt", this.token);
	};

	setUser = (u) => {
		this.user = u;
	};
}

const Store = new AuthStore();

export { Store as default };

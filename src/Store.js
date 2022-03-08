import { makeAutoObservable, runInAction } from "mobx";
import Cookie from "universal-cookie";
const cookie = new Cookie();
class AuthStore {
	constructor() {
		makeAutoObservable(this);
	}

	token = "ammass";
	isLoggedIn = false;
	isAdmin = false;

	//get functions
	getToken = () => this.token;
	getIsLoggeIn = () => this.isLoggedIn;
	getIsAdmin = () => this.isAdmin;

	//setters
	setToken = (token) => {
		this.token = cookie.set("jwtttt", { user: 34 });
	};

	getCookie = (name) => {
		//  docCookies.get(name)
		// let c = document.cookie.match(`(?:(?:^|.*; *)${name}*= *([^;]).*$)|^.*$`)[1]
		// if (c) return decodedURIComponent(c)
	};
}

const Store = new AuthStore();

export { Store as default };

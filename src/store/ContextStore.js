import AuthStore from "./AuthStore";
import React from "react";

const authStore = new AuthStore();
const auth = new AuthStore();
export const ContextStore = React.createContext({ authStore, auth });

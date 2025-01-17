import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "remixicon/fonts/remixicon.css";
import Chatbot from "./components/Chatbot/Chatbot";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<ToastContainer
					theme="dark"
					position="top-right"
					autoClose={3000}
					closeOnClick
					pauseOnHover={false}
				/>

				<App />
				<Chatbot />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);

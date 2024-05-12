
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./API/store.jsx";
import { DataProvider } from './utils/context/DataContext.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
    <DataProvider>
    <App />
    </DataProvider>
    </Provider>
  </BrowserRouter>
);

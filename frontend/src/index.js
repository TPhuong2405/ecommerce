import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
// import 'antd/dist/antd.min.css'; // Import Ant Design styles

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

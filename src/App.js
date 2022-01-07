import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "normalize.css";
import "./styles.scss";
import Home from "./views/Home/Home";
import Day from "./views/Day/Day";
import { store } from "./redux/store";
import { Provider } from "react-redux";

//store.dispatch(fetchAllItems());

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/calendar/:month/:day/:year" component={Day} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

import React from "react";
import "./App.scss";
import Header from "./content/header/Header";
import OrderListController from "./content/orderList/OrderListController";

class App extends React.Component {
    render() {
        return (
            <div className="application">
                <Header/>
                <OrderListController/>
            </div>
        );
    }
}

export default App;

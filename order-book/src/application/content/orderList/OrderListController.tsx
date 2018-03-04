import React from "react";
import OrderList from "./OrderList";
import {Order} from "./types/Order";
import convert from "../../../common/OrderConverter";
import "./styles/orderBook.scss";
import {Orders} from "./types/Orders";
import Timer = NodeJS.Timer;

const URL = "ws://front-test-1.herokuapp.com/ob?key=210c01fe-1962-40f8-8730-f8387c321090&rate=2000";

interface State {
    bids: Order[];
    asks: Order[];
}

export default class OrderListController extends React.Component<any, State> {
    state: State = {bids: [], asks: []};
    socket: WebSocket;
    timer: Timer;

    componentDidMount() {
        this.socket = new WebSocket(URL);
        this.socket.addEventListener("open", (event: any) => {
            this.socket.send("ping");
            this.timer = setInterval(() => {
                this.socket.send("ping");
            }, 9999);
        });

        this.socket.addEventListener("message", (event: any) => {
            this.updateState(event.data);
        });
    }

    componentWillUnmount() {
        this.socket.close();
        clearInterval(this.timer);
    }

    updateState(rawData: string) {
        const orders: Orders = convert(rawData);
        let bids: Order[] = orders.bids;
        let asks: Order[] = orders.asks;
        if (this.state.bids.length + this.state.asks.length !== 0) {
            bids = bids.concat(this.state.bids);
            asks = asks.concat(this.state.asks);
        }
        this.setState({bids, asks});
    }

    render() {
        return (
            <div className="order-book">
                <OrderList rowData={this.state.bids}/>
                <OrderList rowData={this.state.asks}/>
            </div>
        );
    }
}
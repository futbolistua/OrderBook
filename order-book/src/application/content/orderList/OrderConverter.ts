import {Order} from "./types/Order";
import {replaceAll} from "../../../common/StringUtils";
import {Orders} from "./types/Orders";

export default function convert(dataString: string): Orders {
    const rawOrders: any[] = getOrders(dataString);
    const orders: Orders = {bids: [], asks: []};
    rawOrders.forEach((rawOrder: any[]) => {
        const order = convertOrder(rawOrder);
        if (order.total >= 0) {
            orders.bids.push(order);
        } else {
            orders.asks.push(order);
        }
    });

    return orders;
}

export function getOrders(dataString: string): any[] {
    const rawData = `{"orders":[ ${replaceAll(dataString, "][", "],[")}]}`;
    return JSON.parse(rawData)["orders"];
}

function convertOrder(order: any[]): Order {
    return {
        price: order[0],
        total: order[1]
    };
}
import React from "react";
import {AgGridReact, AgGridColumn} from "ag-grid-react";
import {GridReadyEvent} from "ag-grid";
import "./styles/orderList.scss";
import {Order} from "./types/Order";

function onGridReady(event: GridReadyEvent) {
    event.api.sizeColumnsToFit();
}

interface Props {
    rowData: Order[];
}

export default function OrderList(props: Props) {
    return (
        <div className="order-list ag-theme-dark">
            <AgGridReact
                rowData={props.rowData}
                onGridReady={onGridReady}
                animateRows={true}
                enableSorting={true}
                rowHeight={22}>
                <AgGridColumn headerName="Price"
                              field="price">{}</AgGridColumn>
                <AgGridColumn headerName="Total"
                              field="total"
                              sort="desc">{}</AgGridColumn>
            </AgGridReact>
        </div>
    );
}
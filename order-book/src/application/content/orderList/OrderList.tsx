import React from "react";
import {AgGridReact, AgGridColumn} from "ag-grid-react";
import {GridReadyEvent} from "ag-grid";
import "./styles/orderList.scss";
import {Order} from "./types/Order";
import {ValueGetterParams} from "ag-grid/dist/lib/entities/colDef";

function onGridReady(event: GridReadyEvent) {
    event.api.sizeColumnsToFit();
}

interface Props {
    rowData: Order[];
}

function totalValue(params: ValueGetterParams): number {
    const value = params.data["total"];

    return value < 0 ? -1 * value : value;
}

export default function OrderList(props: Props) {
    return (
        <div className="order-list ag-theme-dark">
            <AgGridReact
                rowData={props.rowData}
                onGridReady={onGridReady}
                animateRows={true}
                enableSorting={true}
                rowHeight={28}>
                <AgGridColumn headerName="Price"
                              field="price">{}</AgGridColumn>
                <AgGridColumn headerName="Total"
                              valueGetter={totalValue}
                              sort="desc">{}</AgGridColumn>
            </AgGridReact>
        </div>
    );
}
import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import SideBar from "./Sidebar";
import {
    deleteOrder,
    getAllOrders,
    clearOrderErrors as clearErrors,
    deleteOrderReset,
} from "../../slices/orderSlice";

const OrderList = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const { error, orders } = useSelector((state) => state.allOrders);
    const { error: deleteError, isDeleted } = useSelector((state) => state.order);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    };

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
        }

        if (deleteError) {
            dispatch(clearErrors());
        }

        if (isDeleted) {
            Navigate("/admin/orders");
            dispatch(deleteOrderReset());
        }

        dispatch(getAllOrders());
    }, [dispatch, error, deleteError, Navigate, isDeleted]);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) =>
                params.row.status === "Delivered" ? "greenColor" : "redColor",
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.4,
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => (
                <Fragment>
                    <Link to={`/admin/order/${params.row.id}`}>
                        <EditIcon />
                    </Link>
                    <Button onClick={() => deleteOrderHandler(params.row.id)}>
                        <DeleteIcon />
                    </Button>
                </Fragment>
            ),
        },
    ];

    const rows = [];

    orders &&
        orders.forEach((item) => {
            rows.push({
                id: item._id,
                itemsQty: item.orderItems.length,
                amount: item.totalPrice,
                status: item.orderStatus,
            });
        });

    return (
        <Fragment>
            <MetaData title={`ALL ORDERS - Admin`} />

            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL ORDERS</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default OrderList;

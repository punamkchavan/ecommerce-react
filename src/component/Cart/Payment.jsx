import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import axios from "axios";
import { createOrder, clearOrderErrors as clearErrors } from "../../slices/orderSlice";
import { useRazorpay } from "react-razorpay";
import { useNavigate } from "react-router-dom";
import "./Payment.css";
import { toast } from "react-toastify";

const proxy = import.meta.env.VITE_PROXY || "";

const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const { Razorpay } = useRazorpay();
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const payBtn = useRef(null);

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;

        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.post(`${proxy}/api/v1/payment/process`, {
                amount: orderInfo.totalPrice,
            }, {
                headers: {
                    Authorization: token
                }
            });
            const options = data.options;
            const successCallback = (payment_id) => {
                order.paymentInfo = {
                    id: payment_id,
                    status: "paid",
                };

                dispatch(createOrder(order));
                toast.success("Payment successful");
                Navigate("/success");
            };

            const cancelCallback = () => {
                payBtn.current.disabled = false;
            };
            const rzp1 = new Razorpay({
                key: options.key,
                amount: options.amount * 100,
                currency: options.currency,
                handler: successCallback,
                theme: {
                    color: "#3399cc",
                },
                modal: {
                    ondismiss: cancelCallback,
                },
            });
            rzp1.open();
        } catch (error) {
            payBtn.current.disabled = false;
        }
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error]);

    return (
        <Fragment>
            <MetaData title="Payment" />
            <CheckoutSteps activeStep={2} />
            <div className="paymentContainer">
                <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                    <Typography>Make payment to proceed</Typography>
                    <input
                        type="submit"
                        value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div>
        </Fragment>
    );
};

export default Payment;

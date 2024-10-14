import React, {useState} from 'react';
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";

const PaypalCheckoutButton = () => {
    const product = {
        description: "Learn how to build a website with React JS",
        price: 29,
    };

    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);

    const handleApprove = (orderId) => {
        setPaidFor(true);
    }

    if(paidFor){
        alert("Thank You for purchasing from Eazy2Code");
    }

    if(error){
        alert(error);
    }

  return (
    <PayPalScriptProvider>
        <PayPalButtons 
            onClick={(data, actions) => {
                const hasAlreadyBoughtCourse = false;
                if(hasAlreadyBoughtCourse){
                    setError("You Already bough this course");
                    return actions.reject();
                }else{
                    return actions.resolve();
                }
            }}
            createOrder = {(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            // description: product.description,
                            amount: {
                                value: 29,
                            },
                        },
                    ],
                });
            }}
            onApprove = { async (data, action) => {
                const order = await action.order.capture();
                console.log("order", order);

                handleApprove(data.orderID);
            }}
            onCancel={() => {}}
            onError={(err) => {
                setError(err);
                console.log("PayPal Checkout onError", err);
            }}
        />
    </PayPalScriptProvider>
  )
}

export default PaypalCheckoutButton
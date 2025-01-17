import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { Button } from "reactstrap";

const CheckoutForm = ({ totalAmount }) => {
	const stripe = useStripe();
	const elements = useElements();

	const handlePayment = async (event) => {
		event.preventDefault();
		if (!stripe || !elements) {
			return;
		}

		const cardElement = elements.getElement(CardElement);

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card: cardElement,
		});

		if (error) {
			console.log("[error]", error);
		} else {
			console.log("[PaymentMethod]", paymentMethod);
		}
	};

	return (
		<form onSubmit={handlePayment}>
			<CardElement />
			<Button type="submit" disabled={!stripe} className="buy__btn w-100">
				Pay £{totalAmount}
			</Button>
		</form>
	);
};

export default CheckoutForm;

"use client";
import CheckoutForm from "../../components/Home/CheckoutForm";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React from "react";

function Payment() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  const options = {
    mode: "payment",
    amount: Math.round(amount * 100),
    currency: "usd",
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
}

export default page;

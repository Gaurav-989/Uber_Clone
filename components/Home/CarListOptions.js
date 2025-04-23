import React, { use, useState } from "react";
import CarListItems from "./CarListItems";
import { CardListData } from "@/utils/CartListData";
import { useRouter } from "next/navigation";
function CarListOptions({ distance }) {
  // Fixed useState destructuring
  const [activeIndex, setActiveIndex] = useState(0); // Add default value (0 for first item)
  const [selectedCar, setSelectedCar] = useState([]); // Set default selected car
  const router = useRouter();
  const handlePayment = async () => {
    const res = await fetch("/api/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: selectedCar.price || 499 }),
    });

    const data = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: "INR",
      name: "Seat Booking System",
      description: `Booking for ${selectedCar.name}`,
      order_id: data.id,
      handler: function (response) {
        alert("Payment successful!");
        router.push("/payment-success"); // optional success page
      },
      prefill: {
        name: "Customer",
        email: "customer@example.com",
      },
      theme: {
        color: "#000",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="mt-5 p-5 overflow-auto h-[250px]">
      <h2 className="text-[22px] font-bold">Select a ride</h2>
      {CardListData.map((item, index) => (
        <div
          key={index}
          className={`cursor-pointer p-2 px-4 rounded-md ${
            activeIndex === index
              ? "border-[3px] border-black" // Add both width and color
              : "border-2 border-transparent" // Maintain layout with transparent border
          }`}
          onClick={() => {
            setActiveIndex(index);
            setSelectedCar(item);
          }}
        >
          <CarListItems car={item} distance={distance} />
        </div>
      ))}

      {selectedCar?.name ? (
        <div className="flex justify-between fixed bottom-5 bg-white p-3 shadow-xl w-full md:w-[30%] border-[1px] items-center rounded-lg">
          <h2>Make Payment For</h2>
          <button
            className="p-3 bg-black text-white rounded-lg text-center"
            onClick={handlePayment}
            onClickCapture={() =>
              router
                .push("/payment?amount=" + selectedCar.car.amount * distance)
                .toFixed(2)
            }
          >
            Request {selectedCar.name}
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default CarListOptions;

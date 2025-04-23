import React from "react";
import { HiUser } from "react-icons/hi2";
import Image from "next/image";
function CarListItems({ car, distance }) {
  return (
    <div>
      <div>
        <Image
          src={car.image}
          width={100}
          height={100}
          alt="car"
          className="rounded-lg"
        />
        <div>
          <h2 className="text-[14px] font-semibold flex gap-3 items-center">
            {car.name}

            <span className="flex gap-2 items-center text-[13px] font-normal">
              <HiUser /> {car.seat}
            </span>
          </h2>
          <p>{car.desc}</p>
        </div>
      </div>
      <h2 className="text-[14px] font-semibold">
        ${(car.amount * distance).toFixed(2)}
      </h2>
    </div>
  );
}

export default CarListItems;

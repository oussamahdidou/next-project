"use client";

import React from "react";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faStar,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Map = dynamic(() => import("./map"), {
  ssr: false,
});

const LastDeliveryCard = () => {
  return (
    <div className="card bg-base-100 w-full shadow-xl">
      <div className="card-body ">
        <div className="flex justify-between">
          <h2 className="card-title text-gray-500 mb-3">Your Last Delivery</h2>
          <Link
            className="link link-hover  flex items-center text-orange-600"
            href={"/home/dashboard/pages/deliveries"}
          >
            <FontAwesomeIcon className="h-5 w-5 me-2" icon={faCircleInfo} />
            View Details
          </Link>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2 pt-4">
            <p>
              <strong>From:</strong> Errachidia <strong>To:</strong> Rabat
            </p>
            <p>
              <strong>Date:</strong> Monday 26 December 2023
            </p>
            <p>
              <strong>Profit:</strong> 25 DH
            </p>
            <p>
              <strong>Score:</strong> 8.5
            </p>
            <p>
              <strong>Client Feedback: </strong>
              <FontAwesomeIcon
                className="h-5 w-5 text-orange-500"
                icon={faStar}
              />
              <FontAwesomeIcon
                className="h-5 w-5 text-orange-500"
                icon={faStar}
              />
              <FontAwesomeIcon
                className="h-5 w-5 text-orange-500"
                icon={faStar}
              />
              <FontAwesomeIcon
                className="h-5 w-5 text-orange-500"
                icon={faStar}
              />
              <FontAwesomeIcon
                className="h-5 w-5 text-orange-500"
                icon={faStarHalfStroke}
              />
              {/* <FontAwesomeIcon icon={regular("star")} /> */}
            </p>
          </div>
          <Map
            location={[31.9393074, -4.4593723]}
            warehouseName={"Errachidia"}
          />
        </div>
      </div>
    </div>
  );
};

export default LastDeliveryCard;

"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/api/userapi";
import { Delivery } from "../../types/Delivery";
import { AvailableDriver } from "../../types/AvailableDriver";

const AvailabileDriverTable = () => {
  const {
    data: availabledrivers,
    error,
    isLoading,
    isFetching,
  } = useQuery<AvailableDriver[]>({
    queryKey: ["availabledrivers"],
    queryFn: async () => {
      return (await api.getSortedAvailableDriver()).data;
    },
  });

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching availabile driver info</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-lg table-pin-rows">
        <thead>
          <tr>
            <th></th>
            <td>Start</td>
            <td>Waypoints</td>
            <td>Arrival</td>
            <td>Start Date</td>
            <td>End Date</td>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {availabledrivers?.map((availabledriver) => (
            <tr key={availabledriver.available_driver_id}>
              <th>{availabledriver.available_driver_id}</th>
              <td>{availabledriver.startWarehouse?.city}</td>
              <td>
                Waypoints:{" "}
                {availabledriver &&
                availabledriver.waypoints &&
                availabledriver.waypoints.length > 0
                  ? availabledriver.waypoints
                      .map((warehouse) => warehouse.city)
                      .join(", ")
                  : "None"}
              </td>
              <td>{availabledriver.destination?.city}</td>
              <td>{availabledriver.startTime.toString()}</td>
              <td>{availabledriver.endTime.toString()}</td>
              <td className="align-center">
                <button
                  onClick={() => {
                    document
                      .getElementById(
                        `info_modal_${availabledriver.available_driver_id}`
                      )
                      .showModal();
                  }}
                  className="text-white px-2 bg-blue-300 flex items-center rounded-full"
                >
                  <FontAwesomeIcon
                    className="w-4 h-4 me-1"
                    icon={faCircleInfo}
                  />
                  Infos
                </button>
              </td>

              <dialog
                id={`info_modal_${availabledriver.available_driver_id}`}
                className="modal"
              >
                <div className="modal-box">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <div>
                    <h3 className="font-bold text-lg">Delivery Information</h3>
                    <div>
                      <p>Start: {availabledriver.startWarehouse.city}</p>
                      <p>
                        Waypoints:{" "}
                        {availabledriver &&
                        availabledriver.warehouses &&
                        availabledriver.warehouses.length > 0
                          ? availabledriver.warehouses
                              .map((warehouse) => warehouse.city)
                              .join(", ")
                          : "None"}
                      </p>
                      <p>Arrival: {availabledriver.destination.city}</p>
                      <p>Date: {availabledriver.endTime.toString()}</p>
                    </div>
                  </div>
                </div>
              </dialog>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <td>Start</td>
            <td>Waypoints</td>
            <td>Arrival</td>
            <td>Start Date</td>
            <td>Score</td>
            <th>Actions</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default AvailabileDriverTable;

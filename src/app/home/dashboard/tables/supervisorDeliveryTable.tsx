"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faStar } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/api/userapi";
import { Delivery } from "../../types/Delivery";

const SupervisorDeliveriesTable = () => {
  const {
    data: deliveries,
    error,
    isLoading,
    isFetching,
  } = useQuery<Delivery[]>({
    queryKey: ["deliveries"],
    queryFn: async () => {
      return (await api.getDeliveriesWarhouses()).data;
    },
  });

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching deliveries info</div>;
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
            <th>Score</th>
            <td>Date</td>
            <td>Status</td>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveries?.map((delivery) => (
            <tr key={delivery.delivery_id}>
              <th>{delivery.delivery_id}</th>
              <td>{delivery.startWarehouse.city}</td>
              <td>{delivery.warehouses?.map((warehouse: any, index: any) => (
                  <p key={index}>- {warehouse.city}</p>
                ))}</td>
              <td>{delivery.endWarehouse?.city}</td>
              <td>
                {delivery.evaluations?.map((evaluation: any, index: any) => (
                  <p key={index}>- {evaluation.score}</p>
                ))}
              </td>
              <td>{delivery.endTime?.toString()}</td>
              <td>{delivery.status}</td>
              <td className="align-center flex flex-row gap-3">
                <button
                  onClick={() => {
                    document
                      .getElementById(`info_modal_${delivery.delivery_id}`)
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
                <button
                  onClick={() => {
                    document
                      .getElementById(`evaluate_modal_${delivery.delivery_id}`)
                      .showModal();
                  }}
                  className="text-white px-2 bg-orange-500 flex items-center rounded-full"
                >
                  <FontAwesomeIcon className="w-4 h-4 me-1" icon={faStar} />
                  Score
                </button>
              </td>

              <dialog
                id="`info_modal_${delivery.delivery_id}`"
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
                      {/* <p>Start: {delivery.startWarehouse}</p>
                      <p>Waypoints: {delivery.warehouses}</p>
                      <p>Arrival: {delivery.destination}</p>
                      <p>Score: {delivery.evaluations}</p>
                      <p>Date: {delivery.endTime.toString()}</p>
                      <p>Status: {delivery.status}</p> */}
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
            <th>Score</th>
            <td>Date</td>
            <td>Status</td>
            <th>Actions</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default SupervisorDeliveriesTable;

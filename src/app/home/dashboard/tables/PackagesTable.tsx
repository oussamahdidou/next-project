"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/api/userapi";
import { Product } from "../../types/Product";
import { Package } from "../../types/Package";

const ProductTable = () => {
  const {
    data: packages,
    error,
    isLoading,
    isFetching,
  } = useQuery<Package[]>({
    queryKey: ["packages"],
    queryFn: async () => {
      return (await api.getPackagesByWaerhouse()).data;
    },
  });

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching packages info</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-lg table-pin-rows">
        <thead>
          <tr>
            <th></th>
            <td>Products</td>
            <th>Weight</th>
            <td>Dimensions</td>
            <td>Status</td>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages?.map((packag) => (
            <tr key={packag.packageId}>
              <th>{packag.packageId}</th>
              <td>
                {packag.products.map((product, index) => (
                  <p key={index}>{product.name}</p>
                ))}
              </td>
              <td>{packag.weight}</td>
              <td>{packag.dimensions}</td>
              <td>{packag.status}</td>
              <td className="align-center">
                <button
                  onClick={() => {
                    document
                      .getElementById(`info_modal_${packag.packageId}`)
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

              <dialog id={`info_modal_${packag.packageId}`} className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <div>
                    <h3 className="font-bold text-lg">Product Information</h3>
                    <div>
                      <p>
                        Products List:{" "}
                        {packag.products.map((product, index) => (
                          <p key={index}>- {product.name}</p>
                        ))}
                      </p>
                      <p>Weight: {packag.weight}</p>
                      <p>Dimensions: {packag.dimensions}</p>
                      <p>Status: {packag.status}</p>
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
            <td>Products</td>
            <th>Weight</th>
            <td>Dimensions</td>
            <td>Status</td>
            <th>Actions</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ProductTable;

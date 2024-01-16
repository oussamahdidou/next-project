"use client"

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/api/userapi";
import { Product } from "../../types/Product";

const OwnerProductTable = () => {
  const {
    data: products,
    error,
    isLoading,
    isFetching,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      return (await api.getMyProducts()).data;
    },
  });

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching products info</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-lg table-pin-rows">
        <thead>
          <tr>
            <th></th>
            <td>Name</td>
            <td>Price</td>
            <td>Fragility</td>
            <th>Weight</th>
            <td>Dimensions</td>
            <td>Status</td>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product.productId}>
              <th>{product.productId}</th>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.fragility ? "Yes" : "No"}</td>
              <td>{product.weight}</td>
              <td>{product.dimensions}</td>
              <td>{product.status}</td>
              <td className="align-center">
                <button
                  onClick={() => {
                    document
                      .getElementById(`info_modal_${product.productId}`)
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
                id={`info_modal_${product.productId}`}
                className="modal"
              >
                <div className="modal-box">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <div>
                    <h3 className="font-bold text-lg">Product Information</h3>
                    <div>
                      <p>Name: {product.name}</p>
                      <p>Price: {product.price}</p>
                      <p>Fragility: {product.fragility ? "Yes" : "No"}</p>
                      <p>Weight: {product.weight}</p>
                      <p>Dimensions: {product.dimensions}</p>
                      <p>Status: {product.status}</p>
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
            <td>Name</td>
            <td>Price</td>
            <td>Fragility</td>
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

export default OwnerProductTable;

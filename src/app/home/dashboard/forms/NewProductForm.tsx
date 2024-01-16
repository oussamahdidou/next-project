"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faCarRear, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/app/api/userapi";
import { Product } from "../../types/Product";

const AddProductForm = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newProduct: Product) => {
      return api.addProduct(newProduct);
    },
    onSuccess: (data, variables, context) => {
      console.log("Product created successfully");
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      const form = document.getElementById(
        "addProductForm"
      ) as HTMLFormElement | null;
      if (form) {
        form.reset();
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const fragility = formData.get("fragility") === "true";
    const weight = parseFloat(formData.get("weight") as string);
    const dimensions = parseFloat(formData.get("dimensions") as string);
    const deliveryDate = new Date(formData.get("deliverydate") as string);

    const newProduct: Product = {
      name,
      price,
      fragility,
      weight,
      dimensions,
      deliveryDate,
    };

    try {
      mutation.mutate(newProduct);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form id="addProductForm" onSubmit={handleSubmit} className="space-y-4">
      <p className="text-2xl font-bold text-gray-500 mb-3">Add a Product</p>
      <div className="grid grid-cols-2 gap-10 p-6">
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-lg">Name</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              name="name"
              className="input input-bordered w-full border border-orange-600"
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-lg">Price</span>
            </div>
            <input
              type="number"
              placeholder="Type here"
              name="price"
              step="0.01"
              className="input input-bordered w-full border border-orange-600"
            />
          </label>

          <div className="form-control w-full flex">
            <div className="label">
              <span className="label-text text-lg">Fragility</span>
            </div>
            <div className="form-contro flex flex-row gap-5 items-center">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="fragility"
                  className="radio checked:bg-orange-600"
                  value={"true"}
                />
              </label>
              <span className="label-text text-lg">Yes</span>
            </div>
            <div className="form-control  flex flex-row gap-5  items-center">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="fragility"
                  className="radio checked:bg-orange-600"
                  value={"false"}
                />
              </label>
              <span className="label-text text-lg">No</span>
            </div>
          </div>
        </div>

        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-lg">Weight</span>
            </div>
            <input
              type="number"
              placeholder="Type here"
              name="weight"
              step="0.01"
              className="input input-bordered w-full border border-orange-600"
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-lg">Dimensions</span>
            </div>
            <input
              type="number"
              placeholder="Type here"
              name="dimensions"
              step="0.01"
              className="input input-bordered w-full border border-orange-600"
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-lg">Date</span>
            </div>
            <input
              type="date"
              name="deliverydate"
              className="input input-bordered w-full border border-orange-600"
            />
          </label>
        </div>
      </div>

      <div className="flex flex-row-reverse gap-3">
        <button
          type="submit"
          className="btn bg-orange-600 text-white hover:text-orange-600"
        >
          <FontAwesomeIcon className="w-5 h-5 me-1" icon={faBox} />
          Add Product
        </button>
        <button type="reset" className="btn">
          <FontAwesomeIcon className="w-5 h-5 me-1" icon={faTrashCan} />
          Reset
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;

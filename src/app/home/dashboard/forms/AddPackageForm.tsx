"use client";

import api from "@/app/api/userapi";
import {
  faCarRear,
  faCircleCheck,
  faCircleXmark,
  faLocationDot,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import Select from "react-select";
import { Product } from "../../types/Product";
import { Package } from "../../types/Package";

const AddPackageForm = () => {
  const queryClient = useQueryClient();

  const { data: products } = useQuery<Product[]>({
    queryKey: ["wearhouseproducts"],
    queryFn: async () => {
      return (await api.getProductsByWaerhouse()).data;
    },
  });

  const productsOption =
    products?.map((product) => ({
      value: product.productId,
      label: product.name,
    })) || [];

  const mutation = useMutation({
    mutationFn: (newPackage: Package) => {
      return api.addPackage(newPackage);
    },
    onMutate: (variables) => {
      console.log(`mutation is on`);
    },
    onError: (error, variables, context) => {
      console.log(`error${error.message}`);
    },
    onSuccess: (data, variables, context) => {
      console.log(`Package created succesufuly`);
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["packages"] });
      const form = document.getElementById(
        "addPackageForm"
      ) as HTMLFormElement | null;
      if (form) {
        form.reset();
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const weight = parseInt(
      (e.currentTarget.elements.namedItem("weight") as HTMLInputElement)?.value,
      10
    );
    const dimensions = parseInt(
      (e.currentTarget.elements.namedItem("volume") as HTMLInputElement)?.value,
      10
    );

    const productsElements = e.currentTarget.elements.namedItem(
      "products"
    ) as HTMLSelectElement | null;
    const products = Array.from(productsElements?.selectedOptions ?? []).map(
      (option) => parseInt(option.value, 10)
    );

    const newPackage: Package = {
      weight,
      dimensions,
      products,
    };

    try {
      mutation.mutate(newPackage);
    } catch (error) {
      console.log(error);
    }
  };




  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const handleProductChange = async (selectedOptions: any) => {
    const selectedProductIds = selectedOptions.map((option: any) => option.value);
    const selectedProductDetails = await Promise.all(
      selectedProductIds.map(async (productId: number) => {
        const product = products?.find((p) => p.productId === productId);
        return product;
      })
    );

    setSelectedProducts(selectedProductDetails.filter(Boolean));
  };

  const calculateTotalWeightAndDimensions = () => {
    const totalWeight = selectedProducts.reduce(
      (sum, product) => sum + (product?.weight || 0),
      0
    );

    const totalDimensions = selectedProducts.reduce(
      (sum, product) => sum + (product?.dimensions || 0),
      0
    );

    return { totalWeight, totalDimensions };
  };




  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      height: "48px",
    }),
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4" id="addPackageForm">
      <div className="grid grid-cols-2 gap-10 p-6">


        <div className="col-span-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-lg">Products</span>
            </div>
            <Select
              closeMenuOnSelect={false}
              isMulti
              name="products"
              options={productsOption}
              className="basic-multi-select"
              classNamePrefix="select"
              theme={(theme) => ({
                ...theme,
                borderRadius: "0.5rem",
                borderWidth: 0,
                colors: {
                  ...theme.colors,
                  primary: "#ea580c",
                  primary25: "#ffedd5",
                  neutral20: "#ea580c",
                },
              })}
              styles={customStyles}
              onChange={handleProductChange}
            />
          </label>
        </div>

        <div className="flex flex-row gap-4 col-span-2">
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text text-lg">Weight</span>
            </div>
            <input
              type="number"
              placeholder="Type here"
              name="weight"
              className="input input-bordered w-full border border-orange-600"
              value={calculateTotalWeightAndDimensions().totalWeight}
            />
          </label>

          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text text-lg">Volume</span>
            </div>
            <input
              type="number"
              placeholder="Type here"
              name="volume"
              className="input input-bordered w-full border border-orange-600"
              value={calculateTotalWeightAndDimensions().totalDimensions}
            />
          </label>
        </div>

      </div>

      <div className="flex flex-row-reverse gap-3">
        <button
          type="submit"
          className="btn bg-orange-600 text-white hover:text-orange-600"
        >
          <FontAwesomeIcon className="w-5 h-5" icon={faCircleCheck} />
          Confirm
        </button>
        <button type="reset" className="btn">
          <FontAwesomeIcon className="w-5 h-5" icon={faCircleXmark} />
          Reset
        </button>
      </div>
    </form>
  );
};

export default AddPackageForm;

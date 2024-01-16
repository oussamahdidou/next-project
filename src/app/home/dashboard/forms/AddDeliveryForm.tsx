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
import { Warehouse } from "../../types/Warehouse";
import { AvailableDriver } from "../../types/AvailableDriver";

const AddDeliveryForm = () => {
  const queryClient = useQueryClient();
  const [startPoint, setStartPoint] = useState(null);
  const [arrivalPoint, setArrivalPoint] = useState(null);
  const [waypoints, setWaypoints] = useState<number[]| null>(null);

  const { data: warehouses } = useQuery<Warehouse[]>({
    queryKey: ["mywarehouses"],
    queryFn: async () => {
      return (await api.getWarehouses()).data;
    },
  });

  const warehouseOptions =
    warehouses?.map((warehouse) => ({
      value: warehouse.id,
      label: warehouse.city,
    })) || [];

  const { data: availabledrivers } = useQuery<AvailableDriver[]>({
    queryKey: ["availabledrivers"],
    queryFn: async () => {
      return (await api.getSortedAvailableDriver()).data;
    },
  });

  const availableDriverOptions =
    availabledrivers?.map((availabledriver) => ({
      value: availabledriver.available_driver_id,
      label: availabledriver.vehicle.licensePlate,
    })) || [];

  const { data: packages } = useQuery<Package[]>({
    queryKey: ["wearhousepackages"],
    queryFn: async () => {
      return (await api.getPackagesByWaerhouse()).data;
    },
  });

  const packagesOption =
    packages?.map((packag) => ({
      value: packag.packageId,
      label: packag.products.map((product) => `(${product.name})`),
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

  const [selectedPackages, setSelectedPackages] = useState<Product[]>([]);

  const handlePackageChange = async (selectedOptions: any) => {
    const selectedProductIds = selectedOptions.map(
      (option: any) => option.value
    );
    const selectedPackageDetails = await Promise.all(
      selectedProductIds.map(async (packageId: number) => {
        const packag = packages?.find((p) => p.packageId === packageId);
        return packag;
      })
    );

    setSelectedPackages(selectedPackageDetails.filter(Boolean));
  };

  const handleAvailableDriverChange = async (selectedOption: any) => {
    const selectedDriverId: number = selectedOption.value;
    const selectedDriver: AvailableDriver | undefined = availabledrivers?.find(
      (driver) => driver.available_driver_id == selectedDriverId
    );
  
    setStartPoint(selectedDriver?.startWarehouse.id || null);
    setArrivalPoint(selectedDriver?.destination.id || null);
    setWaypoints(
      selectedDriver?.waypoints.map((waypoint) => waypoint.id) || null
    );
  };

  const calculateTotalWeightAndDimensions = () => {
    const totalWeight = selectedPackages.reduce(
      (sum, packag) => sum + (packag?.weight || 0),
      0
    );

    const totalDimensions = selectedPackages.reduce(
      (sum, packag) => sum + (packag.dimensions || 0),
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
              <span className="label-text text-lg">Packages</span>
            </div>
            <Select
              closeMenuOnSelect={false}
              isMulti
              name="packages"
              options={packagesOption}
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
              onChange={handlePackageChange}
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

        <div className="flex flex-row gap-4 col-span-2">
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text text-lg">Available Driver</span>
            </div>
            <Select
              closeMenuOnSelect={false}
              name="availabledriver"
              options={availableDriverOptions}
              className="basic-select "
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
              onChange={handleAvailableDriverChange}
            />
          </label>

          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text text-lg">Start point</span>
            </div>
            <Select
              closeMenuOnSelect={false}
              name="startpoint"
              options={warehouseOptions}
              className="basic-select "
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
            />
          </label>
        </div>
        <div className="flex flex-row gap-4 col-span-2">
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text text-lg">Arrival point</span>
            </div>
            <Select
              closeMenuOnSelect={false}
              name="arrivalpoint"
              options={warehouseOptions}
              className="basic-select "
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
            />
          </label>

          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text text-lg">Waypoints</span>
            </div>
            <Select
              closeMenuOnSelect={false}
              isMulti
              name="waypoints"
              options={warehouseOptions}
              className="basic-multi-select "
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

export default AddDeliveryForm;

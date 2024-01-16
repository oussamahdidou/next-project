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
import React from "react";
import Select from "react-select";
import { AvailableDriver } from "../../types/AvailableDriver";
import { Warehouse } from "../../types/Warehouse";
import { Vehicle } from "../../types/Vehicle";

const AvailabilityForm = () => {
  const queryClient = useQueryClient();

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

  const { data: vehicles } = useQuery<Vehicle[]>({
    queryKey: ["myvehicles"],
    queryFn: async () => {
      return (await api.getMyVehicles()).data;
    },
  });

  const vehicleOptions =
    vehicles?.map((vehicle) => ({
      value: vehicle.vehicle_id,
      label: vehicle.licensePlate,
    })) || [];

  const mutation = useMutation({
    mutationFn: (newAvailableDriver: AvailableDriver) => {
      return api.mentionAvailability(newAvailableDriver);
    },
    onMutate: (variables) => {
      console.log(`mutation is on`);
    },
    onError: (error, variables, context) => {
      console.log(`error${error.message}`);
    },
    onSuccess: (data, variables, context) => {
      console.log(`mention availability succesufuly`);
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["availableDrivers"] });
      const form = document.getElementById(
        "mentionAvailabilityForm"
      ) as HTMLFormElement | null;
      if (form) {
        form.reset();
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const vehicleId = parseInt(
      (e.currentTarget.elements.namedItem("vehicle") as HTMLSelectElement)
        ?.value
    );
    const availableWeight = parseInt(
      (
        e.currentTarget.elements.namedItem(
          "availableWeight"
        ) as HTMLInputElement
      )?.value,
      10
    );
    const availableVolume = parseInt(
      (
        e.currentTarget.elements.namedItem(
          "availableVolume"
        ) as HTMLInputElement
      )?.value,
      10
    );
    const startTime = new Date(
      (
        e.currentTarget.elements.namedItem("starttime") as HTMLInputElement
      ).value
    );
    const startWarehouse = parseInt(
      (e.currentTarget.elements.namedItem("startpoint") as HTMLSelectElement)
        ?.value
    );
    const destination = parseInt(
      (e.currentTarget.elements.namedItem("arrivalpoint") as HTMLSelectElement)
        ?.value
    );
    const waypointsElement = e.currentTarget.elements.namedItem(
      "waypoints"
    ) as HTMLSelectElement | null;
    const waypoints = Array.from(waypointsElement?.selectedOptions ?? []).map(
      (option) => parseInt(option.value, 10)
    );

    const endTime = new Date(
      (e.currentTarget.elements.namedItem("arrivaltime") as HTMLInputElement)
        ?.value
    );

    const newAvailableDriver: AvailableDriver = {
      vehicleId,
      startTime,
      endTime,
      availableVolume,
      availableWeight,
      startWarehouse,
      destination,
      waypoints,
    };

    try {
      mutation.mutate(newAvailableDriver);
    } catch (error) {
      console.log(error);
    }
  };

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      height: "48px",
    }),
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      id="mentionAvailabilityForm"
    >
      <div className="grid grid-cols-2 gap-10 p-6">
        <div>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text text-lg">Vehicle</span>
            </div>
            <Select
              closeMenuOnSelect={false}
              name="vehicle"
              options={vehicleOptions}
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
              <span className="label-text text-lg">Available Weight</span>
            </div>
            <input
              type="number"
              placeholder="Type here"
              name="availableWeight"
              className="input input-bordered w-full  border border-orange-600"
            />
          </label>

          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text text-lg">Available Volume</span>
            </div>
            <input
              type="number"
              placeholder="Type here"
              name="availableVolume"
              className="input input-bordered w-full  border border-orange-600"
            />
          </label>

          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text text-lg">Start time</span>
            </div>
            <input
              type="datetime-local"
              name="starttime"
              placeholder="Type here"
              className="input input-bordered w-full  border border-orange-600"
            />
          </label>
        </div>

        <div>
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

          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text text-lg">Arrival time</span>
            </div>
            <input
              type="datetime-local"
              placeholder="Type here"
              name="arrivaltime"
              className="input input-bordered w-full  border border-orange-600"
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

export default AvailabilityForm;

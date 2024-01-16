"use client";

import { useToast } from "@/app/providers/ToastProvider";
import {
  faCircleInfo,
  faPenToSquare,
  faTrash,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { Vehicle } from "../../types/Vehicle";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/app/api/axios";
import api from "@/app/api/userapi";
import { useState } from "react";

const VehicleTable = () => {
  const queryClient = useQueryClient();

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(0);
  const [licensePlate, setLicensePlate] = useState("");
  const [registration, setRegistration] = useState("");

  const {
    data: vehicles,
    error,
    isLoading,
    isFetching,
  } = useQuery<Vehicle[]>({
    queryKey: ["myvehicles"],
    queryFn: async () => {
      return (await api.getMyVehicles()).data;
    },
  });

  
  const updatemutation = useMutation({
    mutationFn: (newVehicle: Vehicle) => {
      return api.updateVehicle(newVehicle);
    },
    onMutate: (variables) => {
      console.log(`mutation is on`);
    },
    onError: (error, variables, context) => {
      console.log(`error${error.message}`);
    },
    onSuccess: (data, variables, context) => {
      console.log(`vehicle update succesufuly`);
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["myvehicles"] });
      const modal = document.getElementById(
        `update_modal_${variables.vehicle_id}`
      );
      if (modal) {
        modal.removeAttribute("modal-open");
      }
    },
  });

  const handleUpdateSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    vehicleId: number | undefined
  ) => {
    e.preventDefault();

    const newVehicle: Vehicle = {
      vehicle_id: vehicleId,
      marque: make,
      model: model,
      year: year,
      licensePlate: licensePlate,
      registrationNumber: registration,
    };

    try {
      updatemutation.mutate(newVehicle);
    } catch (error) {
      console.log(error);
    }
  };
  const [deleteModalVehicleId, setDeleteModalVehicleId] = useState<
    number | undefined
  >(undefined);
  const deletemutation = useMutation({
    mutationFn: (vehicle_id: number | undefined) => {
      setDeleteModalVehicleId(vehicle_id);
      return api.deleteVehicle(vehicle_id);
    },
    onMutate: (variables) => {
      console.log(`mutation is on`);
    },
    onError: (error, variables, context) => {
      console.log(`error${error.message}`);
    },
    onSuccess: (data, variables, context) => {
      console.log(`vehicle delete succesufuly`);
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["myvehicles"] });
      const modal = document.getElementById(
        `delete_modal_${deleteModalVehicleId}`
      );
      if (modal) {
        modal.removeAttribute("modal-open");
      }
    },
  });

  return (
    <div className="overflow-x-auto">
      <table className="table table-lg table-pin-rows">
        <thead>
          <tr>
            <td>Make</td>
            <td>Model</td>
            <td>License Plate</td>
            <td>Registration</td>
            <td>Year</td>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles?.map((vehicle) => (
            <tr key={vehicle.vehicle_id}>
              <td>{vehicle.marque}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.licensePlate}</td>
              <td>{vehicle.registrationNumber}</td>
              <td>{vehicle.year}</td>
              <th className="flex gap-1">
                <button
                  onClick={() => {
                    setMake(vehicle.marque);
                    setModel(vehicle.model);
                    setYear(vehicle.year);
                    setLicensePlate(vehicle.licensePlate);
                    setRegistration(vehicle.registrationNumber);
                    document
                      .getElementById(`update_modal_${vehicle.vehicle_id}`)
                      .showModal();
                  }}
                  className="text-white px-2 bg-green-600 flex items-center rounded-full"
                >
                  <FontAwesomeIcon
                    className="w-4 h-4 me-2"
                    icon={faPenToSquare}
                  />
                  update
                </button>
                <button
                  onClick={() => {
                    document
                      .getElementById(`delete_modal_${vehicle.vehicle_id}`)
                      .showModal();
                  }}
                  className="text-white px-2 bg-red-400 flex items-center rounded-full"
                >
                  <FontAwesomeIcon className="w-4 h-4 me-2" icon={faTrash} />
                  delete
                </button>
              </th>

              <dialog
                id={`update_modal_${vehicle.vehicle_id}`}
                className="modal"
              >
                <div className="modal-box">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <form
                    onSubmit={(e) => handleUpdateSubmit(e, vehicle.vehicle_id)}
                    className="space-y-4"
                  >
                    <p className="text-2xl font-bold text-gray-500 mb-3">
                      Update Your Vehicle
                    </p>
                    <div className="grid grid-cols-2 gap-10 p-6">
                      <div>
                        <label className="form-control w-full ">
                          <div className="label">
                            <span className="label-text text-lg">Make</span>
                          </div>
                          <input
                            type="text"
                            placeholder="Type here"
                            name="make"
                            className="input input-bordered w-full  border border-orange-600"
                            value={make}
                            onChange={(e) => setMake(e.target.value)}
                          />
                        </label>

                        <label className="form-control w-full ">
                          <div className="label">
                            <span className="label-text text-lg">Model</span>
                          </div>
                          <input
                            type="text"
                            placeholder="Type here"
                            name="model"
                            className="input input-bordered w-full  border border-orange-600"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                          />
                        </label>

                        <label className="form-control w-full ">
                          <div className="label">
                            <span className="label-text text-lg">Year</span>
                          </div>
                          <input
                            type="number"
                            placeholder="Type here"
                            name="year"
                            className="input input-bordered w-full  border border-orange-600"
                            value={year}
                            onChange={(e) =>
                              setYear(parseInt(e.target.value, 10))
                            }
                          />
                        </label>
                      </div>

                      <div>
                        <label className="form-control w-full ">
                          <div className="label">
                            <span className="label-text text-lg">
                              License Plate
                            </span>
                          </div>
                          <input
                            type="text"
                            placeholder="Type here"
                            name="licensePlate"
                            className="input input-bordered w-full  border border-orange-600"
                            value={licensePlate}
                            onChange={(e) => setLicensePlate(e.target.value)}
                          />
                        </label>

                        <label className="form-control w-full ">
                          <div className="label">
                            <span className="label-text text-lg">
                              Registration
                            </span>
                          </div>
                          <input
                            type="text"
                            placeholder="Type here"
                            name="registration"
                            className="input input-bordered w-full  border border-orange-600"
                            value={registration}
                            onChange={(e) => setRegistration(e.target.value)}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-row-reverse gap-3">
                      <button
                        type="submit"
                        className="btn bg-orange-600 text-white hover:text-orange-600"
                      >
                        <FontAwesomeIcon
                          className="w-5 h-5 me-1"
                          icon={faPenToSquare}
                        />
                        Update
                      </button>
                      <button type="reset" className="btn">
                        <FontAwesomeIcon
                          className="w-5 h-5 me-1"
                          icon={faTrashCan}
                        />
                        Reset
                      </button>
                    </div>
                  </form>
                </div>
              </dialog>

              <dialog
                id={`delete_modal_${vehicle.vehicle_id}`}
                className="modal gap-3"
              >
                <div className="modal-box p-10">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-gray-600 text-2xl mb-8">
                    Deleting vehicle
                  </h3>
                  <h3 className="font-bold text-lg text-center">
                    <FontAwesomeIcon
                      className="w-16 h-16 text-orange-600"
                      icon={faTrashCan}
                    />
                  </h3>

                  <p className="py-4 text-center text-gray-600">
                    Are you sure you want to delete {vehicle.marque} -{" "}
                    {vehicle.model}?
                  </p>
                  <div className="flex flex-row-reverse gap-3 mt-5">
                    <button
                      onClick={() => {
                        try {
                          deletemutation.mutate(vehicle.vehicle_id);
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                      type="button"
                      className="btn bg-orange-600 text-white hover:text-orange-600"
                    >
                      <FontAwesomeIcon
                        className="w-5 h-5 me-1"
                        icon={faTrashCan}
                      />
                      Delete
                    </button>
                  </div>
                </div>
              </dialog>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Make</td>
            <td>Model</td>
            <td>License Plate</td>
            <td>Registration</td>
            <td>Year</td>
            <th>Actions</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default VehicleTable;

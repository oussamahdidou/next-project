import { faCarRear, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Vehicle } from "../../types/Vehicle";
import api from "@/app/api/userapi";

const AddVehicleForm = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newVehicle:Vehicle) => {
      return api.addVehicle(newVehicle);
    },
    onMutate: (variables) => {  
      console.log(`mutation is on`)
    },
    onError: (error, variables, context) => {
      console.log(`error${error.message}`)
    },
    onSuccess: (data, variables, context) => {
      console.log(`vehicle create succesufuly`)
      console.log(data)
      queryClient.invalidateQueries({queryKey:["myvehicles"]})
      const form = document.getElementById("addVehicleForm") as HTMLFormElement | null;
      if (form) {
        form.reset();
      }
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const marque = formData.get("make") as string;
    const model = formData.get("model") as string;
    const year = parseInt(formData.get("year") as string, 10);
    const licensePlate = formData.get("licensePlate") as string;
    const registrationNumber = formData.get("registration") as string;

    const newVehicle: Vehicle = {
      marque,
      model,
      year,
      licensePlate,
      registrationNumber,
    };

    try {
      mutation.mutate(newVehicle);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form id="addVehicleForm" onSubmit={handleSubmit} className="space-y-4">
      <p className="text-2xl font-bold text-gray-500 mb-3">Add a Vehicle</p>
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
            />
          </label>
        </div>

        <div>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text text-lg">License Plate</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              name="licensePlate" 
              className="input input-bordered w-full  border border-orange-600"
            />
          </label>

          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text text-lg">Registration</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              name="registration" 
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
          <FontAwesomeIcon className="w-5 h-5 me-1" icon={faCarRear} />
          Add Vehicle
        </button>
        <button type="reset" className="btn">
          <FontAwesomeIcon className="w-5 h-5 me-1" icon={faTrashCan} />
          Reset
        </button>
      </div>
    </form>
  );
};

export default AddVehicleForm;

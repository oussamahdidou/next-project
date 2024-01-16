"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddVehicleForm from "../../../forms/vehicleform";
import { faBoxOpen, faCarRear, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import VehicleTable from "../../../tables/vehicletable";
import PackagesTable from "../../../tables/PackagesTable";
import AddPackageForm from "../../../forms/AddPackageForm";
import SupervisorDeliveriesTable from "../../../tables/supervisorDeliveryTable";
import AddDeliveryForm from "../../../forms/AddDeliveryForm";

const PackagesPage = () => {
  const handleAddPackageClick = () => {
    document.getElementById("my_modal").showModal();
  };

  return (
    <div className="flex flex-col w-full h-full  rounded-lg m-2 p-4 bg-white">
      <div className="flex p-2 mb-4 justify-between w-full">
        <p className="text-gray-500 font-bold text-2xl">Deliveries</p>
        <div className="">
          <button
            className="btn text-orange-600 border border-orange-600 hover:bg-orange-600 hover:text-white"
            onClick={handleAddPackageClick}
          >
            <FontAwesomeIcon className="w-6 h-6 me-2" icon={faTruckFast} />
            Add a Delivery
          </button>
          <dialog id="my_modal" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <div className="m-4">
                <AddDeliveryForm />
              </div>
            </div>
          </dialog>
        </div>
      </div>

      <div>
        <SupervisorDeliveriesTable />
      </div>
    </div>
  );
};

export default PackagesPage;

"use client";

import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from "next/dynamic";

interface Warehouse {
  location: number[];
  city: string;
}

interface WarehouseCardProps {
  warehouse: Warehouse;
}

const WarehouseCard: React.FC<WarehouseCardProps> = ({ warehouse }) => {
  const { location, city } = warehouse;
  const Map = dynamic(() => import("./map"), {
    ssr: false,
  });
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <Map location={location} warehouseName={city}/>
      <div className="card-body">
        <h2 className="card-title">Your Ways {city} Warehouse</h2>
        <p>
          <strong>Category:</strong> Storage
        </p>
        <p>Click the button to view details.</p>
        <div className="card-actions justify-end">
        <button
          type="submit"
          className="btn bg-orange-600 text-white hover:text-orange-600"
        >
          <FontAwesomeIcon className="h-5 w-5" icon={faMapLocationDot} />
          View Details
        </button>
        </div>
      </div>
    </div>
  );
};

export default WarehouseCard;

"use client";
import { Warehouse } from "@/app/home/types/Warehouse";
import WarehouseCard from "../../components/warehousecard";
import api from "@/app/api/userapi";
import { useQuery } from "@tanstack/react-query";


const Warehouses = () => {
  const {
    data: warehouses,
    error,
    isLoading,
    isFetching,
  } = useQuery<Warehouse[]>({
    queryKey: ["warehouses"],
    queryFn: async () => {
      return (await api.getWarehouses()).data;
    },
  });

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching Warehouses info</div>;
  }

  return (
    <div className="flex flex-col w-full h-full  rounded-lg m-2 p-4 gap-5 bg-white">
      <div className="flex p-2 mb-4 justify-between w-full">
        <p className="text-gray-500 font-bold text-2xl">Available Warehouses</p>
      </div>

      {warehouses?.map((warehouse) => (
        <WarehouseCard
          key={warehouse.id}
          warehouse={{
            location: [warehouse.location.x,warehouse.location.y],
            city: warehouse.city,
          }}
        />
      ))}

    </div>
  );
};

export default Warehouses;

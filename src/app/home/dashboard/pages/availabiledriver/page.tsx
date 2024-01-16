import AvailabileDriverTable from "../../tables/AvailabileDriverTable";

const MyDeliveries = () => {
  return (
    <div className="flex flex-col w-full h-full  rounded-lg m-2 p-4 bg-white">
      <div className="flex p-2 mb-4 justify-between w-full">
        <p className="text-gray-500 font-bold text-2xl">Availabile Driver</p>
      </div>

      <div>
        <AvailabileDriverTable />
      </div>
    </div>
  );
};

export default MyDeliveries;

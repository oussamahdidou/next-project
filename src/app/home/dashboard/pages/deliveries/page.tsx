import DeliveryTable from "../../tables/deliverytable";

const MyDeliveries = () => {
  return (
    <div className="flex flex-col w-full h-full  rounded-lg m-2 p-4 bg-white">
      <div className="flex p-2 mb-4 justify-between w-full">
        <p className="text-gray-500 font-bold text-2xl">My Deliveries</p>
      </div>

      <div>
        <DeliveryTable />
      </div>
    </div>
  );
};

export default MyDeliveries;

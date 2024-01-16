import SupervisorProductsTable from "../../../tables/SupervisorProductsTable";

const MyProducts = () => {
  return (
    <div className="flex flex-col w-full h-full  rounded-lg m-2 p-4 bg-white">
      <div className="flex p-2 mb-4 justify-between w-full">
        <p className="text-gray-500 font-bold text-2xl">Products</p>
      </div>
      <div>
        <SupervisorProductsTable />
      </div>
    </div>
  );
};

export default MyProducts;

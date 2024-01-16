import OwnerProductTable from "../../tables/OwnerProductsTable";

const MyProducts = () => {
  return (
    <div className="flex flex-col w-full h-full  rounded-lg m-2 p-4 bg-white">
      <div className="flex p-2 mb-4 justify-between w-full">
        <p className="text-gray-500 font-bold text-2xl">My Products</p>
      </div>
      <div>
        <OwnerProductTable />
      </div>
    </div>
  );
};

export default MyProducts;

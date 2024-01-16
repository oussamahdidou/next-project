import ApiClient from "./axios";
import { User } from "../home/types/User";
import axios from "axios";
import { Vehicle } from "../home/types/Vehicle";
import { AvailableDriver } from "../home/types/AvailableDriver";
import { Product } from "../home/types/Product";
import { Package } from "../home/types/Package";

const api = {
  signin: async (email: string, password: string) => {
    const data = await axios.post("http://localhost:3333/auth/signin", {
      email,
      password,
    });
    return data;
  },

  get: async (id: string) => {
    const data = await ApiClient.get(`/${id}`);
    return data.data;
  },

  getAll: async () => {
    return await ApiClient.get("/");
  },

  findme: async () => {
    return await ApiClient.get("/user/info");
  },

  create: async (user: User) => {
    return await ApiClient.post("/", user);
  },

  update: async (user: User) => {
    return await ApiClient.put(`/${user.id}`, user);
  },

  delete: async (id: string) => {
    return await ApiClient.delete(`/${id}`);
  },

  getMyVehicles: async () => {
    return await ApiClient.get("/vehicles");
  },

  addVehicle: async (newvehicle: Vehicle): Promise<Vehicle> => {
    return (await ApiClient.post("/vehicles", newvehicle)).data;
  },

  updateVehicle: async (newvehicle: Vehicle): Promise<Vehicle> => {
    return (
      await ApiClient.patch(`/vehicles/${newvehicle.vehicle_id}`, newvehicle)
    ).data;
  },

  deleteVehicle: async (vehicle_id: number | undefined) => {
    return await ApiClient.delete(`/vehicles/${vehicle_id}`);
  },

  mentionAvailability: async (
    newAvailableDriver: AvailableDriver
  ): Promise<AvailableDriver | any> => {
    return (await ApiClient.post("/driver/available", newAvailableDriver)).data;
  },
  addPackage: async (newPackage: Package): Promise<Package | any> => {
    return (await ApiClient.post("/package", newPackage)).data;
  },

  getWarehouses: async () => {
    return await ApiClient.get("/warehouse");
  },

  getMyDeliveries: async () => {
    return await ApiClient.get("/delivery/mine");
  },

  getMyProducts: async () => {
    return await ApiClient.get("/product/mine");
  },

  addProduct: async (newproduct: Product): Promise<Product> => {
    return (await ApiClient.post("/product", newproduct)).data;
  },

  getSortedAvailableDriver: async () => {
    return await ApiClient.get("/driver/available/find-all");
  },

  getPackagesByWaerhouse: async () => {
    return await ApiClient.get("/package");
  },

  getProductsByWaerhouse: async () => {
    return await ApiClient.get("/supervisor/products/in-warehouse");
  },

  getDeliveriesWarhouses: async () => {
    return await ApiClient.get("/delivery");
  },
};

export default api;

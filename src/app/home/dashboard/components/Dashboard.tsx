"use client";
import LineChart from "./charts/linechart";
import LastDeliveryCard from "./lastdeliverycard";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import {
  faTruckFast,
  faSackDollar,
  faStarHalfStroke,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./card";
import { User } from "../../types/User";
import { useToast } from "@/app/providers/ToastProvider";
import api from "@/app/api/userapi";

const Dashboard: React.FC = () => {
  const { showToast } = useToast();

  const {
    data: user,
    error,
    isLoading,
    isFetching
  } = useQuery<User>({
    queryKey: ["userinfo"],
    queryFn: async () => {
      return ((await api.findme()).data);
    },
  });

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching user info</div>;
  }

  return (
    <div className="flex flex-col w-full h-full rounded-lg m-2 p-4 bg-white">
      <div className="text-2xl font-bold p-2 mb-4 text-gray-500">
        <p>Welcome back, {user?.lastName + " " + user?.firstName} !</p>
      </div>

      <div className="flex justify-between gap-4 w-full">
        <Card
          icon={<FontAwesomeIcon className="w-6 h-6" icon={faTruckFast} />}
          label="Deleveries"
          value="10"
        />
        <Card
          icon={<FontAwesomeIcon className="w-6 h-6" icon={faSackDollar} />}
          label="Net Profit"
          value="1000 DH"
        />
        <Card
          icon={<FontAwesomeIcon className="w-6 h-6" icon={faStarHalfStroke} />}
          label="Score"
          value="844"
        />
        <Card
          icon={
            <FontAwesomeIcon className="w-6 h-6" icon={faCircleExclamation} />
          }
          label="Penalty"
          value="01"
        />
      </div>

      <div className="text-xl font-bold p-2 mb-4 mt-4 text-gray-500">
        <p>Charts And Graphs</p>
      </div>
      <div className="flex flex-row gap-4">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center text-gray-500">
            <h2 className="card-title">Monthly Profit</h2>
            <LineChart />
          </div>
        </div>
        <LastDeliveryCard />
      </div>
    </div>
  );
};

export default Dashboard;

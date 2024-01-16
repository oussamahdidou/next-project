"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuItem from "./menuitem";
import {
  faBox,
  faBoxOpen,
  faCar,
  faCarSide,
  faChartPie,
  faCubes,
  faEnvelopeOpenText,
  faGauge,
  faLocationDot,
  faRoute,
  faTruckFast,
  faUser,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";
import { User } from "../../types/User";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import axios from "@/app/api/axios";
import { useToast } from "@/app/providers/ToastProvider";
import api from "@/app/api/userapi";

const Sidebar: React.FC = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const { data: user, error } = useQuery<User>({
    queryKey: ["userinfo1"],
    queryFn: async () => {
      return (await api.findme()).data;
    },
    initialData: () => {
      const data = queryClient.getQueryData<User>(["userinfo"]);
      return data || undefined;
    },
  });

  if (error) {
    showToast(error.message, "info");
  }

  return (
    <div className="flex fixed w-56 flex-col rounded-lg m-2 mt-[100px] gap-y-24  bg-white  pr-3.5 pt-10 pb-10 h-full">
      <ul className="menu bg-base-100 w-56">
        <li>
          <h2 className="menu-title">Menu</h2>
          <ul>
            <MenuItem
              icon={<FontAwesomeIcon className="w-5 h-5" icon={faGauge} />}
              label="Dashboard"
              link="/home/dashboard"
            />

            {user?.role === "driver" && (
              <MenuItem
                icon={<FontAwesomeIcon className="w-5 h-5" icon={faRoute} />}
                label="Availability"
                link="/home/dashboard/pages/availability"
              />
            )}

            {user?.role === "driver" && (
              <MenuItem
                icon={
                  <FontAwesomeIcon className="w-5 h-5" icon={faTruckFast} />
                }
                label="Deliveries"
                link="/home/dashboard/pages/deliveries"
              />
            )}

            {user?.role === "driver" && (
              <MenuItem
                icon={<FontAwesomeIcon className="w-5 h-5" icon={faCar} />}
                label="Vehicles"
                link="/home/dashboard/pages/vehicles"
              />
            )}

            {user?.role === "owner" && (
              <MenuItem
                icon={<FontAwesomeIcon className="w-5 h-5" icon={faBoxOpen} />}
                label="Add Product"
                link="/home/dashboard/pages/addproduct"
              />
            )}

            {user?.role === "owner" && (
              <MenuItem
                icon={<FontAwesomeIcon className="w-5 h-5" icon={faCubes} />}
                label="Products"
                link="/home/dashboard/pages/products"
              />
            )}

            {user?.role === "owner" && (
              <MenuItem
                icon={
                  <FontAwesomeIcon
                    className="w-5 h-5"
                    icon={faEnvelopeOpenText}
                  />
                }
                label="Complaints"
                link="/complaints"
              />
            )}

            {user?.role === "supervisor" && (
              <MenuItem
                icon={
                  <FontAwesomeIcon className="w-5 h-5" icon={faTruckFast} />
                }
                label="Deliveries"
                link="/home/dashboard/pages/supervisor/deliveries"
              />
            )}

            {user?.role === "supervisor" && (
              <MenuItem
                icon={<FontAwesomeIcon className="w-5 h-5" icon={faCarSide} />}
                label="Drivers available"
                link="/home/dashboard/pages/availabiledriver"
              />
            )}

            {user?.role === "supervisor" && (
              <MenuItem
                icon={<FontAwesomeIcon className="w-5 h-5" icon={faCubes} />}
                label="Products"
                link="/home/dashboard/pages/supervisor/products"
              />
            )}

            {user?.role === "supervisor" && (
              <MenuItem
                icon={<FontAwesomeIcon className="w-5 h-5" icon={faBox} />}
                label="Packages"
                link="/home/dashboard/pages/supervisor/packages"
              />
            )}
            <MenuItem
              icon={<FontAwesomeIcon className="w-5 h-5" icon={faWarehouse} />}
              label="Warehouses"
              link="/home/dashboard/pages/warehouses"
            />
            <MenuItem
              icon={<FontAwesomeIcon className="w-5 h-5" icon={faChartPie} />}
              label="Statics"
              link="/statics"
            />
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

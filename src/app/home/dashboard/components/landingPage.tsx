import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

const LandingPage = () => {
  return (
    <div className="flex justify-between items-center h-screen p-12 ms-12 ">
      <div className="flex flex-col justify-center items-start w-1/2">
        <h1 className="text-4xl font-bold mb-4">
          Revolutionizing Deliveries:{" "}
          <span className="text-red-500">Your Ways </span>Your Drivers
        </h1>
        <p className=" text-xl text-gray-600 mb-6">
          Where Speed Meets Precision: Welcome to YOUR WAYS DELIVERY ,
          Delivering Dreams, One Package at a Time ,Unbox the Future
        </p>
        <button className="bg-gradient-to-r flex  items-center justify-between from-red-500 to-orange-500 text-white px-6 py-3 rounded-full hover:from-red-500 hover:to-orange-500 font-bold  shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce">
          Get Staeted With Your Ways{" "}
          <FontAwesomeIcon className="w-5 h-5 ms-2 " icon={faCaretRight} />
        </button>
      </div>

      <div className="w-1/2 flex justify-center items-center">
        <div className="relative rounded-[25px] overflow-hidden hover:shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce">
          <Image
            src="/images/Envision_a_heartwarming_scene_outside_a_vibrant_.jpg"
            alt="Your Image"
            placeholder = "empty"
            width="450"
            height="400"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

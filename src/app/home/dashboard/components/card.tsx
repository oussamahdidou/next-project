import Link from "next/link";

interface CardProps {
  icon: JSX.Element;
  label: string;
  value: string;
}

const Card: React.FC<CardProps> = ({ icon, label, value }) => {
  return (
    <div className="card w-80 z-auto bg-gradient-to-r from-red-500 to-orange-500   hover:from-red-500 hover:to-orange-500  shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 hover:brightness-110 hover:animate-pulse active:animate-bounce text-primary-content">
      <div className="card-body">
        <h1 className="card-title text-2xl">{label}</h1>
        <div className="flex justify-between mt-3 w-full">
          <span>{icon}</span>
          <h2 className="card-title">{value}</h2>
        </div>
        <p></p>
      </div>
    </div>
  );
};

export default Card;

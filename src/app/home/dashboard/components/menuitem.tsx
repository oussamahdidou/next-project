import Link from "next/link";

interface MenuItemProps {
  icon: JSX.Element;
  label: string;
  link: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, link }) => {
  return (
    <li className="hover:text-orange-600 hover:bg-orange-50">
      <Link className="" href={link}>
        <label className="me-2">{icon}</label>
        <label className="self-stretch flex-row">{label}</label>
      </Link>
    </li>
  );
};

export default MenuItem;

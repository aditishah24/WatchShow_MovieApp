import { MdHome } from "react-icons/md";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { BiCameraMovie } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";

export const navigation = [
  {
    label: "TV Show",
    href: "tv",
    icon: <PiTelevisionSimpleBold />,
  },
  {
    label: "Movies",
    href: "movie",
    icon: <BiCameraMovie />,
  },
];

export const mobileNavigation = [
  {
    label: "Home",
    href: "/",
    icon: <MdHome />,
  },
  ...navigation,
  {
    label: "search",
    href: "/search",
    icon: <CiSearch />,
  },
];

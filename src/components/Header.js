import React, { useEffect, useState } from "react";
import logo from "../assets/movielogo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import userIcon from "../assets/user.png";
import { CiSearch } from "react-icons/ci";
import { navigation } from "../constants/navigation";

const Header = () => {
  const location = useLocation();
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ");
  const [searchInput, setSearchInput] = useState(removeSpace);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header className="fixed top-0 w-full h-14 bg-neutral-800 bg-opacity-50 z-40">
      <div className="container mx-auto px-4 py-1 flex items-center h-full">
        <Link to={"/"}>
          <img src={logo} alt="logo" width={50} />
        </Link>
        <nav className="hidden lg:flex items-center gap-4 ml-8">
          {navigation.map((nav, index) => (
            <NavLink
              key={nav.label}
              to={nav.href}
              className={({ isActive }) =>
                isActive
                  ? "px-2 text-neutral-100"
                  : "px-2 hover:text-neutral-100"
              }
            >
              {nav.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-5">
          <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search here..."
              className="bg-transparent px-4 py-1 outline-none border-none hidden lg:block"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button className="text-2xl text-white">
              <CiSearch />
            </button>
          </form>

          <div className="w-9 h-9 cursor-pointer active:scale-90 transition-all">
            <img src={userIcon} className="w-full h-full" alt="User Icon" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

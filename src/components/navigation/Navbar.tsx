import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="border-b-2 flex p-2 justify-between w-screen ">
      <h1>KerjaKuApp</h1>
      <div className="flex gap-2 items-center">
        <Link href="/login">
          <button
            className="border-2 p-2 border-blue-500 text-xs uppercase text-blue-500 font-semibold text-center hover:bg-blue-500 hover:text-white "
            style={{ letterSpacing: "2px" }}
          >
            Login
          </button>
        </Link>
        <Link href="/register">
          <button
            className="border-2 p-2 border-gray-500 text-xs uppercase text-gray-500 font-semibold text-center"
            style={{ letterSpacing: "2px" }}
          >
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

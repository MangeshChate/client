import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import {Link} from "react-router-dom"
import logo from "../../images/logo.png";

const NavBarItem = ({ title, classprops  }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = ({ account , display}) => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <Link to="/" className="md:flex-[0.5] flex-initial justify-center items-center " style={{display:"flex" , justifyContent:"start" , alignItems:"center" , fontWeight:"bold"}}>
        <img src="https://cdn-icons-png.flaticon.com/512/802/802338.png" alt="logo" width="45"  className=" cursor-pointer" />
        <span className="text-white text-2xl d-lg-block d-none">RabbitCloud</span>
      </Link>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Home", "About", "Tutorials", "Rabbitchat"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))}
       {display ? (
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
       {account ? (account.length > 10 ? `${account.slice(0 ,15)}...` : account) : "Connect"}
        </li>
         
       ):
       (

          <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          Start
        </li>
       )
       }

    
        
      </ul>
      <a href="" className="d-lg-none d-block btn white-glassmorphism text-light input-glow font-monospace ">Click For Mobile</a>
      <div className="flex relative">
        
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            {["Home", "About", "Tutorials", "RabbitChat"].map(
              (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />,
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

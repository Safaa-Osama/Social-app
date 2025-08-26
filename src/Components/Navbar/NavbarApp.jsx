import React, { useContext } from "react";
import { Navbar, NavbarBrand, NavbarItem } from "@heroui/navbar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@heroui/react";
import { AuthContext } from "../Context/AuthContext";

export default function NavbarA() {
  const navigate = useNavigate();
  let { userToken, isLoggedIn,userData, setIsLoggedIn, setUserData} = useContext(AuthContext)

  function logOut() {
    localStorage.removeItem("token");
    setUserToken('');
    setIsLoggedIn(null);
    setUserData(null)
    navigate("/login");
    }

  return (
    <>
      <Navbar className="bg-white shadow-2xl">
        <NavbarBrand>
         <Link to="/"><p className="font-bold text-inherit">Postify</p></Link> 
        </NavbarBrand>

        {userToken ? (
          <> <NavbarItem>
            <Link to="/profile">
              <img src={userData?.photo} className="size-10 rounded-full cursor-pointer" alt="profile" />
            </Link>
          </NavbarItem>
            <NavbarItem>
              <Button onPress={logOut} as={Link} className="bg-black text-white" variant="flat" >LogOut</Button>
            </NavbarItem>
          </>)
          : (<>
            <NavbarItem>
              <Button as={Link} className="bg-black text-white" to="/login" variant="flat"> Login</Button>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link}className="bg-black text-white" to="register" variant="flat">SignUp </Button>
            </NavbarItem>
          </>)}
      </Navbar>
    </>
  );
}

import React, { useContext } from "react";
import { Navbar, NavbarBrand, NavbarItem } from "@heroui/navbar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@heroui/react";
import profile from "../../assets/img/user..png";
import { AuthContext } from "../Context/AuthContext";

export default function NavbarA() {
  const navigate = useNavigate();
  let { userToken, isLoggedIn, setIsLoggedIn, setUserData} = useContext(AuthContext)

  function logOut() {
    localStorage.removeItem("token");
    setUserToken('');
    setIsLoggedIn(null);
    setUserData(null)
    navigate("/login");
    }

  return (
    <>
      <Navbar className="bg-gray-200">
        <NavbarBrand>
         <Link to="/"><p className="font-bold text-inherit">Postify</p></Link> 
        </NavbarBrand>

        {userToken ? (
          <> <NavbarItem>
            <Link to="/profile">
              <img src={profile} className="size-10 cursor-pointer" alt="profile" />
            </Link>
          </NavbarItem>
            <NavbarItem>
              <Button onPress={logOut} as={Link} color="primary" variant="flat">LogOut</Button>
            </NavbarItem>
          </>)
          : (<>
            <NavbarItem>
              <Button as={Link} color="primary" to="/login" variant="flat"> Login</Button>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" to="register" variant="flat">SignUp </Button>
            </NavbarItem>
          </>)}
      </Navbar>
    </>
  );
}

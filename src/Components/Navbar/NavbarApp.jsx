import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@heroui/react';


export default function NavbarA() {
  const navigate = useNavigate()
  function logOut(){
    localStorage.removeItem('token');
    navigate('/login')

    console.log('logOut')
  }

  return (<>
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Social-app</p>
      </NavbarBrand>

      {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href="#">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent> */}
      <NavbarItem>
        <Button as={Link} color="primary" to="/login" variant="flat"> Login </Button>     
           </NavbarItem>
      <NavbarItem>
        <Button as={Link} color="primary" to="register" variant="flat"> SignUp</Button>     
         </NavbarItem>

      <NavbarItem>
        <Button onPress={logOut} as={Link} color="primary" to="#" variant="flat">   LogOut  </Button>     
           </NavbarItem>
    </Navbar >
  </>
  )
}

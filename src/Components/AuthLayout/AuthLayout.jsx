import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return <>
  <main className='bg-gray-100 min-h-screen flex justify-center items-center'>

  <Outlet></Outlet>

  </main>
  </>

}

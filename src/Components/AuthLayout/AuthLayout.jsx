import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return <>
  <main className='bg-gray-100'>
  <Outlet></Outlet>

  </main>
  </>

}

import React, { useContext, useEffect, useState } from 'react'
import { Input, Button } from "@heroui/react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { logSchema } from '../Schema/loginSchema';
import { Link, useNavigate } from 'react-router-dom';
import { sendSignInData } from '../Services/authService';
import { AuthContext } from '../Components/Context/AuthContext';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  let navigate = useNavigate();
   const {setUserToken,setIsLoggedIn} = useContext(AuthContext);



  let { handleSubmit, register, formState: { errors }, } = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: zodResolver(logSchema),
  });


  async function signIn(userData) {
    setLoading(true);

    const res = await sendSignInData(userData);

     if (res.message === 'success') {

      setUserToken(res.token);
      setIsLoggedIn(true);

      localStorage.setItem('token', res.token);
      
      navigate('/');

    } else {

      setLoginError(res.error);

    }

    setLoading(false);
  }
  


  return (
    <>
      <form onSubmit={handleSubmit(signIn)} className='min-w-lg shadow-2xl rounded-2xl bg-white mx-auto m-10 flex flex-col gap-4 p-6'>
        {loginError && <p className="text-white bg-red-500 rounded-md py-2 mt-2 w-full text-center text-lg">
          {loginError}
          <i className="fa-solid fa-triangle-exclamation ml-2"></i>
        </p>}
        <h1 className='font-bold text-2xl'>Login in</h1>
        <Input isInvalid={Boolean(errors.email)} errorMessage={errors.email?.message} variant="bordered" label="Email"
          {...register("email")} type="email" />
        <Input isInvalid={Boolean(errors.password)} errorMessage={errors.password?.message} variant="bordered" label="password"
          {...register("password",{onChange: ()=>setLoginError('')})} type="password"/>
        <Button isLoading={loading} type='submit' variant="faded" className='bg-black text-white text-xl'>Login</Button>
        <p className='text-center'>If you haven't an acount <Link to='/register' className="text-blue-400">SignUp</Link> </p>

      </form>
    </>
  )
}

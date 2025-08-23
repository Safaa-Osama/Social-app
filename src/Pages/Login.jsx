import React, { useContext, useState } from 'react'
import { Input, Button } from "@heroui/react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { logSchema } from '../Schema/loginSchema';
import { Link, useNavigate } from 'react-router-dom';
import { sendSignInData } from '../Services/authService';
import { AuthContext } from '../Components/Context/AuthContext';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [apiresponse, setapiResponse] = useState('');

  let navigate = useNavigate();
   const {setUserToken} = useContext(AuthContext)



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
    console.log( res);

     if (res.message === 'success') {
      setUserToken(res.token);
      localStorage.setItem('token', res.token);
      
      navigate('/');
    } else {
      setapiResponse(res.error);
    }

    setLoading(false);
  }


  return (
    <>
      <form onSubmit={handleSubmit(signIn)} className='max-w-lg shadow-2xl bg-white mx-auto m-10 flex flex-col gap-4 p-6'>
        <h1 className='font-bold text-2xl'>Login in</h1>
        <Input isInvalid={Boolean(errors.email)} errorMessage={errors.email?.message} variant="bordered" label="Email"  {...register("email")} type="email" />
        <Input isInvalid={Boolean(errors.password)} errorMessage={errors.password?.message} variant="bordered" label="password"  {...register("password")} type="password" />
        <Button type='submit' variant="faded">Login</Button>
        <p className='text-center'>If you haven't an acount <Link to='/register' className="text-blue-400">SignUp</Link> </p>

      </form>
    </>
  )
}

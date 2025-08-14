import React from 'react'
import { Input, Button } from "@heroui/react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { logSchema } from '../Schema/loginSchema';

export default function Login() {

  let { handleSubmit, register, formState: { errors }, } = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: zodResolver(logSchema),
  });

  function signIn(userData) {
    console.log(userData);

  }

  return (
    <>
      <form onSubmit={handleSubmit(signIn)} className='max-w-lg shadow-2xl bg-gray-2 00 mx-auto m-10 flex flex-col gap-4 p-6'>
        <h1 className='font-bold text-2xl'>Login in</h1>
        <Input isInvalid={Boolean(errors.email)} errorMessage={errors.email?.message} variant="bordered" label="Email"  {...register("email")} type="email" />
        <Input isInvalid={Boolean(errors.password)} errorMessage={errors.password?.message} variant="bordered" label="password"  {...register("password")} type="password" />
        <Button type="submit" variant="faded">Login</Button>
      </form>
    </>
  )
}

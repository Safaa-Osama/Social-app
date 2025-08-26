import React, { useState } from "react";
import { Input, Button, Select, SelectItem } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendData } from "../Services/authService";
import { regSchema } from "../Schema/RegisterSchema";
import { Link, useNavigate } from "react-router-dom";



export default function Register() {
  const [loading, setLoading] = useState(false);
  const [apiresponse, setapiResponse] = useState('');
 let navigate = useNavigate();

  let { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(regSchema),
  });


  async function signUp(userData) {
    setLoading(true);

    const apiMsg = await sendData(userData);
    if (apiMsg == 'success') {
      navigate('/login')
    } 
    else {
      setapiResponse(apiMsg);
    }


    setLoading(false);
  }

  return (
    <>
      <div className="mx-auto min-w-lg bg-white shadow-2xl py-2 m-6  rounded-lg">
        <h1 className="font-bold px-6 text-2xl">Register Now</h1>
        <form
          onSubmit={handleSubmit(signUp)}
          className="m-6 flex flex-col gap-4 "
        >
          <Input
            isInvalid={Boolean(errors.name)}
            errorMessage={errors.name?.message}
            variant="bordered"
            label="Name"
            {...register("name")}
            type="text"
          />

          <Input
            isInvalid={Boolean(errors.email)}
            errorMessage={errors.email?.message}
            variant="bordered"
            label="Email"
            {...register("email")}
            type="email"
          />
          <Input
            isInvalid={Boolean(errors.password)}
            errorMessage={errors.password?.message}
            variant="bordered"
            label="Password"
            {...register("password")}
            type="Password"
          />
          <Input
            isInvalid={Boolean(errors.rePassword)}
            errorMessage={errors.rePassword?.message}
            variant="bordered"
            label="Confirm Password"
            {...register("rePassword")}
            type="Password"
          />
          <div className="flex gap-4">
            <Input
              isInvalid={Boolean(errors.dateOfBirth)}
              errorMessage={errors.dateOfBirth?.message}
              variant="bordered"
              label="Date of birth"
              {...register("dateOfBirth")}
              type="date"
            />

            <Select
              isInvalid={Boolean(errors.gender)}
              errorMessage={errors.gender?.message}
              {...register("gender")}
              className="max-w-xs"
              variant="bordered"
              label="Select Your Gender"
            >
              <SelectItem key={'male'}>Male</SelectItem>
              <SelectItem key={'female'} >Female</SelectItem>
            </Select>
          </div>

          <Button type="submit" variant="faded" className='bg-black text-white text-xl'>
            Register
          </Button>

          <p className="text-center">If you have an acount <Link to='/login' className="text-blue-400">SignIn</Link> </p>

          {apiresponse =='success'? <span className="text-center text-green-600">Success</span>
          : apiresponse && <span className="text-center text-red-600"> {apiresponse} </span>}
        </form>
      </div>
    </>
  );
}

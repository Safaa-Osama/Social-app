import * as zod from "zod"


export const regSchema = zod.object({
  name: zod.string().nonempty('Name is required').min(3, 'Name must be at least 3 letters').max(20, 'Name must be 20 letters '),

  email: zod.string().nonempty('Email is required').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter valid Email'),

  password: zod.string().nonempty('Password is required')
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Please enter valid password'),

  rePassword: zod.string().nonempty('rePassword is required')
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Please enter valid password'),

  dateOfBirth: zod.coerce.date(),

  gender: zod.string().nonempty('Gender is required')
})
  .refine((data) => data.password === data.rePassword, {
    path: ['rePassword'], message: 'password and repassword do not match'
  })


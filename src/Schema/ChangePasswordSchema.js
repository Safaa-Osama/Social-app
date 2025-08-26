import * as zod from "zod"


export const changePasswordSchema = zod.object({
  password: zod.string().nonempty('Password is required')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/, 'Please enter valid password'),

  newPassword: zod.string().nonempty('Password is required')
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Please enter valid new password'),
    

  rePassword: zod.string().nonempty('rePassword is required')
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Please enter valid password'),
})
  .refine((data) => data.newPassword === data.rePassword, {
    path: ['rePassword'], message: 'password and repassword do not match'
  })


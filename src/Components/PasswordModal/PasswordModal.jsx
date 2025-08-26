import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { changePasswordSchema } from "../../Schema/ChangePasswordSchema";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChangePasswordApi } from "../../Services/UserServices";

export default function PasswordModal({ openModal, setOpenModal, setSuccess }) {

  const { userToken, setUserToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  let { handleSubmit, register, formState: { errors }, setError } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
      rePassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
  });


  async function changePassword(data) {

    setLoading(true);

    // const { rePassword, ...body } = data;
    const body = { password: data.password, newPassword: data.newPassword }

    const response = await ChangePasswordApi(body, userToken);

    if (response.data?.message === 'success') {

      setUserToken(response.data.token);

      setSuccess(true);

      setOpenModal(false);

    } else {
      if (response.error === 'incorrect email or password')
        setError("password" ,{
          message: "Incorrect Old Password!!"
        });

      setSuccess(false);

    }

    setLoading(false);
  }

  function hideModal() {
    errors.password = '';
    errors.newPassword = '';
    errors.rePassword = '';

    setOpenModal(Boolean(errors.password));
  }





  return (
    <div className={`fixed inset-0 flex h-full w-full items-center justify-center bg-black/50 py-10 z-[999] transition-opacity duration-300
        ${openModal ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    >
      <div className={`max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white transform transition-all duration-300
          ${openModal ? "scale-100 translate-y-0" : "scale-95 -translate-y-5"}
        `}
      >
        <div className="w-full">
          <div className="m-8 my-20 max-w-[400px] mx-auto">

            <form onSubmit={handleSubmit(changePassword)}>
              <div className="mb-8 space-y-4">
                <h1 className="mb-4 text-3xl font-extrabold">

                </h1>

                <Input isInvalid={Boolean(errors.password)} errorMessage={errors.password?.message} variant="bordered" label="Old Password"  {...register("password")} type="password" />
                <Input isInvalid={Boolean(errors.newPassword)} errorMessage={errors.newPassword?.message} variant="bordered" label="New Password"  {...register("newPassword")} type="password" />
                <Input isInvalid={Boolean(errors.rePassword)} errorMessage={errors.rePassword?.message} variant="bordered" label="Confirm Password" {...register("rePassword")} type="Password" />
              </div>
              <div className="space-y-4">
                <Button className="p-3 bg-black rounded-full text-white w-full font-semibold cursor-pointer" type="submit" isLoading={loading}>
                  Change Password
                </Button>
                <Button
                  onPress={hideModal}
                  className="p-3 bg-white border rounded-full w-full font-semibold cursor-pointer"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

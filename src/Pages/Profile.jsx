import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Components/Context/AuthContext'
import PasswordModal from '../Components/PasswordModal/PasswordModal';
import { Button } from '@heroui/react';
import { ChangePhotoApi, getLoggedUserDataApi } from '../Services/UserServices';

export default function Profile() {
  const { userData, userToken, setUserData } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);


  async function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setLoading(true);
      const formData = new FormData();
      formData.append('photo', file);

      const response = await ChangePhotoApi(formData, userToken);
      if (response.data.message === 'success') {
        getLoggedUserDAta();
      }
    }
    setLoading(false);
  }

  async function getLoggedUserDAta() {
    const response = await getLoggedUserDataApi(userToken);

    if (response.message) {
      setUserData(response.user);
    }
  }


  return <>
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-2xl p-5">



      <div className='relative w-32 h-32 mx-auto'>
        <img className="w-32 h-32 rounded-full mx-auto" src={preview || userData?.photo} alt="Profile picture" />
        <label className='absolute right-1 bottom-0 bg-black w-7 h-7 rounded-full flex justify-center items-center cursor-pointer'>
          <i className="fa-solid fa-pen-to-square text-white"></i>
          <input onChange={handleImageChange} accept="image/*" type="file" className='hidden' />
        </label>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>



      <h2 className="text-center text-2xl font-semibold mt-3">{userData?.name}</h2>
      <p className="text-center text-gray-600 mt-1">Software Engineer</p>
      <div className="flex justify-center mt-5">
        <Button className="py-3 px-10 bg-black rounded-full text-white font-semibold cursor-pointer" onPress={() => setOpenModal(true)}>
          Change Password
        </Button>
      </div>
      <div className="mt-5">
        {success && <p className="text-white bg-green-600 rounded-md py-2 mt-2 w-full text-center text-lg">
          Password has been changed
          <i className="fa-solid fa-thumbs-up ml-2"></i>
        </p>}
      </div>
    </div>


    <PasswordModal openModal={openModal} setOpenModal={setOpenModal} setSuccess={setSuccess} />


  </>
}

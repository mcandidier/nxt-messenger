'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { CldUploadButton } from 'next-cloudinary';

import Image from 'next/image';
import { toast } from 'react-hot-toast';
import Modal from './Modal';
import InputWithErrors from '../input';

import API from '@/app/API';

import { useGetUser } from '@/app/hooks/useUser';


const SettingsModal = ({ 
  isOpen, 
  onClose, 
  currentUser
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const values = {name: currentUser?.name};

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    trigger,
    formState: {
      errors,
    }
  } = useForm({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image
    },
    values
  });

  const image = watch('image');
  const {data, mutate:mutateUser} = useGetUser(currentUser?.id)

  const updateProfile = (data) => {
    API.post(`accounts/user/${currentUser?.id}/`, data)
    .then(() => {
      mutateUser();
      onClose();
      toast.success('Profile updated successfully.')
    })
    .catch(() => toast.error('Something went wrong!'))
    .finally(() => setIsLoading(false));
  }


  const handleUpload = (result) => {
    setValue('image', result.info.secure_url, { 
      shouldValidate: true 
    });

    updateProfile({
      profile_image: result.info.secure_url
    });
  }


  const onSubmit = (data) => {
    setIsLoading(true);
    updateProfile(data);
  }

  const pattern = {
    value: /[A-Za-z]/,
    message:"Sorry this CodeSandbox can only handle names with characters"
  }

  const handleOnKeyUp = (event) => {

    if (event.key === 'Enter') {
      const name = getValues('name');
      const error = trigger('name').then((res) => {
          console.log(res)
          if(res) {
            updateProfile({name: name});
          }
      });
      event.stopPropagation();
      event.preventDefault();
    }
  }


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
     <div>
     <form>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 
                  className="
                    text-base 
                    font-semibold 
                    leading-7 
                    text-gray-900
                  "
                >
                  Profile
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Edit your public information.
                </p>

                <div className="mt-10 flex flex-col gap-y-2">
                  <input
                    type='text'
                    name='name'
                    {...register('name', {
                        required: 'This field is required',
                        pattern: {
                          value: /[A-Za-z]/,
                          message:"Sorry, invalid name"
                        }
                    })}
                    className={`w-full px-4 py-2  border rounded-md focus:outline-none focus:border-blue-500 shadow-sm transition duration-300 ease-in-out
                    ${errors.name ? 'border-red-500' : ''}`}
                    onKeyDown={handleOnKeyUp}
                  />
                
                  { errors?.name && (
                    <p className="text-red-500 text-xs">{errors?.name.message || 'This field is required'}</p>
                  )}

                  <div className='mt-2'>
                    <label 
                      htmlFor="photo" 
                      className="
                        block 
                        text-sm 
                        font-medium 
                        leading-6 
                        text-gray-900
                      "
                    >
                      Photo
                    </label>
                    <div className="mt-2 flex items-center gap-x-3">
                      <Image
                        width="48"
                        height="48" 
                        className="rounded-full" 
                        src={image || currentUser?.image || '/images/placeholder.jpg'}
                        alt="Avatar"
                      />
                      <CldUploadButton 
                      options={{ maxFiles: 1 }} 
                      onUpload={handleUpload} 
                      uploadPreset="ammv4nmu"
                      >
                         Change
                    </CldUploadButton>
                    </div>
                </div>
            </div>
            </div>
            </div>

          </form>
     </div>
    </Modal>
  )
}

export default SettingsModal;
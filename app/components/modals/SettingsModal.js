'use client';

import axios from 'axios';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { CldUploadButton } from 'next-cloudinary';

import Image from 'next/image';
import { toast } from 'react-hot-toast';
import Modal from './modal';
import InputWithErrors from '../input';

const SettingsModal = ({ 
  isOpen, 
  onClose, 
  currentUser = {}
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  console.log(currentUser, '&TEST_CURRENT_USER')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    }
  } = useForm({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image
    }
  });

  const image = watch('image');

  const handleUpload = () => {
    setValue('image', result.info.secure_url, { 
      shouldValidate: true 
    });
  }

  const onSubmit = (data) => {
    setIsLoading(true);

    axios.post('/api/settings', data)
    .then(() => {
      router.refresh();
      onClose();
    })
    .catch(() => toast.error('Something went wrong!'))
    .finally(() => setIsLoading(false));
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
     <div>
     <form onSubmit={handleSubmit(onSubmit)}>
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

                <div className="mt-10 flex flex-col gap-y-8">
                  <InputWithErrors
                    label="Name" 
                    name='name'
                    errors={errors} 
                    required 
                    register={register}
                    type='text'
                  />
                  <div>
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
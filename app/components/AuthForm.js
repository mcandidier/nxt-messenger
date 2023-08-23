'use client';

import { useState } from "react";
import { useForm, useFormContext } from 'react-hook-form';

import InputWithErrors from "./input";
import Button from "./button";
import { BsGithub, BsGoogle } from 'react-icons/bs';


import SocialButton from "./SocialButton";


function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  })

  const onSubmit = (data) => {
    // setIsLoading(true);
    console.log('submit')

    console.log('error', errors)
  }
  return (
    <div>
      <form 
        className="space-y-5"
        onSubmit={handleSubmit(onSubmit)}>
        <InputWithErrors 
            name='email' 
            label='Email' 
            required
            errors={errors}
            register={register}/>

        <InputWithErrors 
            name='password' 
            label='Password'
            required
            errors={errors}
            register={register}/>

          <Button
            fullWidth
            type='submit'
          >Sign in</Button>
      </form>


      <div className="mt-6">
        <div className="relative">
          <div className="
            absolute
            inset-0
            flex
            items-center
          ">
            <div className="
            w-full
            border-t
            border-gray-300"></div>
          </div>

          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray">
              Or continue with
            </span>
          </div>
        </div>

        <div className="flex mt-5  gap-3 justify-center">
            <SocialButton icon={<BsGithub/>} onClick={() => {}}/>
            <SocialButton icon={<BsGoogle/>} onClick={() => {}}/>
          </div>
      </div>

      <div className="flex mt-5 gap-3 justify-center">
        <div>
          <p>New to Messenger? <span className="underline text-sky-700 cursor-pointer">
          Create an Account</span> </p>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
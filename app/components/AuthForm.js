'use client';

import { useEffect, useMemo, useState } from "react";
import { useForm, useFormContext } from 'react-hook-form';

import InputWithErrors from "./input";
import Button from "./button";
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import SocialButton from "./SocialButton";
import { setCookie } from 'nookies';
import API from "../API";


function AuthForm({isLogin}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [passwordError, setPasswordError] = useState('');


  const linkTo = (path) => {
    router.push(path);
  }



  const fieldss  = useMemo(() => {
    if(isLogin) {
      return {
        email: '',
        password: '',
      }
    } else {
      return {
        name: '',
        email: '',
        password: '',
      }
    }
  }, [isLogin])

 
  const {
    register,
    handleSubmit,
    setError,
    formState: {
      errors
    }
  } = useForm({
    defaultValues: fieldss
  })


  const onSubmit = async (data) => {
    const url = isLogin ? 'accounts/token/': 'accounts/register/';
    try {
      const response = await API.post(url, data);
      const {access:token, refresh} = await response.data;
      const access = token;
      if(access) {
        setCookie(null, 'token', access, {
          maxAge: 30 * 24 * 60 * 60, // 30 days
          path: '/',
        });
        location.replace('/messages');
      } else {
        toast.success('Account successfully created.')
        router.push('/login');
      }
    } catch(error) {
      if(isLogin) {
        setPasswordError('Invalid username or password.');
      } else {
        const response = error.response;
        const data = response.data;
        Object.keys(data).map(fieldName => {
          setError(fieldName, {
              type: 'manual',
              message: data[fieldName],
          });
        });
      }
    }
  }
  return (
    <div className="mt-5">
      <form 
        className="space-y-5"
        onSubmit={handleSubmit(onSubmit)}>
          {Object.keys(fieldss).map((fieldName) => (
            <InputWithErrors
              key={fieldName}
              label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
              name={fieldName}
              register={register}
              errors={errors}
              required
              type={fieldName === 'password'? 'password': 'text'}
            />
          ))}
          {passwordError && <span className="text-sm mt-0.5 text-rose-800 block">{passwordError}</span>}

          <Button
            fullWidth
            type='submit'
          >{isLogin ? 'Login': 'Register'}</Button>
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

        <div className="flex mt-5 gap-2 justify-center">
            <SocialButton icon={<BsGithub/>} onClick={() => {}}/>
            <SocialButton icon={<BsGoogle/>} onClick={() => {}}/>
          </div>
      </div>

      <div className="flex mt-5 gap-3 justify-center">
          <p
          >{isLogin ? 'New to Messenger?': 'Already have an account?'}
            <span className="underline text-sky-700 ml-2 cursor-pointer"
              onClick={() => {linkTo(isLogin? 'register':'login' )}}
            >
          {isLogin ? 'Create an Account': 'Login here'}</span> </p>
      </div>
    </div>
  )
}

export default AuthForm
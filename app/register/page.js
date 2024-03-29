'use client'

import React from 'react'
import Image from 'next/image'
import AuthForm from '@/app/components/AuthForm'


function page() {
  return (
    <div 
    className="
      flex 
      min-h-full 
      flex-col 
      justify-center 
      py-12 
      sm:px-6 
      lg:px-8 
      bg-white
    ">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <Image src='/images/logo.png' alt='logo' height={48} width={48} className='mx-auto w-auto'></Image>
      <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
         Create your account
      </h2>
      <AuthForm isLogin={false}></AuthForm>
    </div>
    </div>
  )
}

export default page
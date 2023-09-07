'use client';

import React from 'react'

import { useForm, FieldValues } from 'react-hook-form';
import API from '../API';

import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import MessageInput from './MessageInput';


function Form({params}) {
  const {messageId} = params;
  const {register, handleSubmit, setError, formState: {
    errors
  }, reset} = useForm({
    defaultValues: {
      message: ''
    }
  })

  const onSubmit = async (data) => {
    console.log(data);
    reset()
    // todo send to API
    const resp = await API.post(`conversations/${messageId}/messages/`, data);
    console.log(await resp.data, 'posted');
  }

  return (
    <div className='py-4 px-4 bg-white border-t flex items-center gap-2 w-full'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex items-center justify-center w-full gap-3'>
        <HiPhoto className='text-sky-400 inline-flex' size={40}/>
        <div className='w-full'>
          <MessageInput
            register={register}
            errors={errors}
            required
            name='content'
            placeholder='Type your message here!'
          />
        </div>
        <button type='submit' className='p-3 bg-sky-500 hover:bg-sky-600 rounded-full cursor-pointer transition'>
          <HiPaperAirplane size={18} className='text-white'></HiPaperAirplane>
        </button>
      </form>
      </div>
    )
}

export default Form
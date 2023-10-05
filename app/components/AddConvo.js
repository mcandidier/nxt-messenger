'use client';

import React, { useState } from 'react';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

import {constant, isObject, map} from 'lodash';
import { useSelector } from 'react-redux';

import createConversation from '../actions/postConversation';
import postMessage from '../actions/postMessage';



import { 
  FieldValues,
  SubmitHandler,
  useForm
 } from 'react-hook-form';


import Button from './button';
import InputWithErrors from './input';
import { toast } from 'react-hot-toast';

function AddConvo({onClose}) {
  const [isLoading, setIsLoading] = useState(false)
  const accounts = useSelector((state) => state.accounts);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    clearErrors,
    formState: {
      errors,
      isValid
    }
  } = useForm({
    defaultValues: {
      participants: [],
      message: null,
    }
  })

  const onSubmit = (values) => {
    setIsLoading(true);
    createConversation(values).then((resp) => {
      const {id:conversation_id} = resp.data;
      postMessage(conversation_id, {content: values.message}).then((resp) => {
        onClose();
      }).catch(err => {
        toast.error('Something went wrong.');
        onClose();
      });

    }).catch((err) => {
      toast.error('Something went wrong.');
      onClose();
    });
  }


  const options = _.map(accounts, 'name');
  const handleOnSelect = (value) => {
    let val = value;

    if(isObject(val)) {
      val = val.target.value;
    }

    if(!val) {
      setError('participants', { type: 'required', message: 'This field is required.' });
    } else {
      const user  = accounts.filter((obj) => {
        if(obj.name === val.trim()) {
          return obj;
        }
      })[0];
      if(user) {
        clearErrors("participants");
        setValue('participants', [user.id], { shouldValidate: true })
      }else {
        setError('participants', { type: 'custom', message: 'Invalid user.' });
        setValue('participants', null, { shouldValidate: false })
      }
    }
  }

  return (
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
            Send a new message
            </h2>
        </div>
        
        <div className='mt-10 flex flex-col gap-y-8'>
          <label for='contact'>To:
            <TextInput 
              className='first-letter:`w-full px-4 border-bottom rounded-md focus:outline-none focus:border-blue-500 shadow-sm transition duration-300 ease-in-out justify-center h-8 py-2'
              options={options}
              trigger='' 
              onSelect={handleOnSelect} 
              onBlur={handleOnSelect} 
              name='member-pl'
              ></TextInput>
              
            <input type="hidden" {...register("participants",{
              required: 'This field is required.'
            })}/>
            { errors.member && (
              <p className="text-red-500 text-xs">{errors?.member.message || 'This field is required'}</p>
            )}
          </label>

      
          <InputWithErrors
            type='text'
            name='message'
            placeholder='Your message here'
            required={true}
            register={register}
            errors={errors}
          />
          
        </div>
        <div className='mt-6 flex flex-row-reverse'>
           <Button disabled={isLoading || !isValid} type="submit">
            Send
          </Button>
        </div>
      </div>
   </form>
  )
}

export default AddConvo
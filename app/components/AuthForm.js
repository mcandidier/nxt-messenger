'use client';

import { useState } from "react";
import { useForm, useFormContext } from 'react-hook-form';

import InputWithErrors from "./input";
import Button from "./button";


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
            label='password'
            required
            errors={errors}
            register={register}/>

          <Button
            fullWidth
            type='submit'
          >Sign in</Button>
      </form>
    </div>
  )
}

export default AuthForm
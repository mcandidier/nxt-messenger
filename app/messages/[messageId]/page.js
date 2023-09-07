import React from 'react'
import Header from '../Header'
import Body from '../Body'
import Form from '../Form'



async function  Message({params}) {

  return (
    <div className='lg:pl-80 h-full'>
      <div className='h-full flex flex-col'>
        <Header></Header>
        <Body params={params}/>
        <Form params={params}></Form>
      </div>
    </div>
  )
}

export default Message
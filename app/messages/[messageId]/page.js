import React from 'react'

import Convo from './convo'

async function  Message({params}) {
  return (
    <div className='lg:pl-80 h-full'>
        <Convo params={params}/>
    </div>
  )
}

export default Message
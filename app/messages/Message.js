import React from 'react'

function Message({message}) {

  const handleClick = (e) => {
    e.stopPropagation();
    console.log('handle click');
  }

  return (
    <>
    <div
      onClick={() => { console.log('test')}}
      className='cursor-pointer'
    >{message.content}
    </div>
    </>
  )
}

export default Message
import React from 'react'

const Alerta = ({ message }) => {
  return (
    <div className={`${message.error ? 'from-red-400 my-5 to-red-600' : 'from-blue-400 my-5 to-blue-600'} uppercase bg-gradient-to-br p-3 rounded-md font-bold text-white text-center`}>
      {message.msg}
    </div>
  )
}

export default Alerta

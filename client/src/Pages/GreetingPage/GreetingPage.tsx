import React from 'react'

const GreetingPage = () => {

    const info = localStorage.getItem('currentUserName')
    const user = info !== null ? JSON.parse(info) : ''

  return (
    <div>
        <div className="alert alert-success" role="alert">
            Hello {user && user}.
        </div>
    </div>
  )
}

export default GreetingPage
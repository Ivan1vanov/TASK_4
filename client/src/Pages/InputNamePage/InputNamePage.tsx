import React, { useEffect, useState } from 'react'
import { Container, Button } from 'react-bootstrap';
import styles from './inputName.module.scss'
import {useNavigate} from 'react-router-dom'

const InputNamePage = () => {

  const navigate = useNavigate()

  const [currentUserName, setCurrentUserName] = useState('')

  const my = localStorage.getItem('currentUserName')
  const localName = my !== null ? JSON.parse(my) : ''
  useEffect(() => {
      if(localName) {
        navigate('/')
      }
  }, [])

  const confirmNameHandler = (e: React.MouseEvent<HTMLElement>) => {
    console.log(currentUserName)
    localStorage.setItem('currentUserName', JSON.stringify(currentUserName))
    navigate('/greeting')
  }

  return (
    <Container className={styles.container}>
    <input type='text' 
      className='col-md-6 input mb-1 mt-5'
      id="receiverInput"
      placeholder='Enter your name'
      onChange={(e) => setCurrentUserName(e.target.value)}
      value={currentUserName}
      />
      <Button
      variant='success'
      className='mt-2'
      onClick={confirmNameHandler}
      > Confirm </Button>
    </Container>
  )
}

export default InputNamePage
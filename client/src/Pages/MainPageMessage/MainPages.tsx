import React, { useEffect, useState } from 'react'
import {Container, Button} from 'react-bootstrap'
import styles from './names.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import { getNameAction } from '../../store/actions/nameAction';
import {  getReceiverMessagesAPI } from '../../api/apis';
import ReceiverMessages from '../../Components/Messages/ReceiverMessages';
import { createMessageAction, getReceiverMessagesAction } from '../../store/actions/messageActions';
import {useLocation} from 'react-router-dom'

import * as io from 'socket.io-client'
import MessageComponent from '../../Components/Messages/message/MessageComponent';



const MainPage = () => {

  var socket = io.connect('https://task4-email.herokuapp.com/') 

  const getLocalName = localStorage.getItem('currentUserName')
  const localName = getLocalName !== null ? JSON.parse(getLocalName) : ''

  
  const [arrivalMessage, setArrivalMessage] = useState<any>([])
  const [allNewMessages, setAllNewMessage] = useState<any>([])

  useEffect(() => {
      socket.emit("addUser", localName);
      console.log(localName)

  }, [])

  useEffect(() => {
    if(arrivalMessage) {
      setAllNewMessage([arrivalMessage, ...allNewMessages])
      console.log(allNewMessages)
    }
    
}, [arrivalMessage])

  // console.log(allNewMessages.length)
  useEffect(() => {
    socket.on("get-message", (data: any) => {
      console.log(data)
      setArrivalMessage(data)
    
    })
  }, [socket])
 
  const dispatch: any = useDispatch()

  const names = useSelector((state: any) => state.names)


  const [text, setText] = useState<any>('')

  const [errorValidMessage, setErrorValidMessage] = useState<string>('')


  const [suggestions, setSuggestions] = useState([])
  const [messageData, setMessageData] = useState({
        sender: localName,
        receiver: '',
        title: "",
        text: ""
  })

  const onChangeMessageData = (e: any) => {
        setMessageData({
          ...messageData,
          [e.target.name]: e.target.value
        })
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value
    setMessageData({
      ...messageData,
      receiver: currentValue
    })
    let matches = []
    if(currentValue.length >= 0) {

      matches = names?.names
      if(currentValue.length > 1) {
        matches = names?.names.filter((user: any) => { 
          const regex = new RegExp(`${currentValue}`, 'gi')
          return user.name.match(regex)
        })
      }
    }

    setSuggestions(matches)
    // console.log(matches)
  }

  const setNameIntoInputHandler = (name: string) => {
        setMessageData({
          ...messageData,
          receiver: name
        })
        setSuggestions([])
  }

 
  useEffect(() => {
    dispatch(getNameAction())
  }, [dispatch])



 

  const createMessageHandler = (e: React.MouseEvent<HTMLElement>) => {
    if(!messageData.receiver || !messageData.title || !messageData.text) {
      setErrorValidMessage('All fields are required')
    } else {
      setErrorValidMessage('')
     
      createMessageAction(messageData).then((data: any) => {
        socket.emit("send-message", data);
      })
      setMessageData({
        ...messageData,
        sender: localName,
        title: "",
        text: ""
      })
    }

  }

  return (
    <Container className={styles.container}>
      <div className={styles.titleBody}>
      <h3>Hello {localName && localName}.</h3> <br/> 
      <h4>Send a message to someone</h4>
 
        </div>
      <div className={styles.inputBlock}>
      <label htmlFor="receiverInput">Receiver</label>
      <input type='text' 
      className='col-md-12 input mb-1'
      id="receiverInput"
      value={messageData.receiver}
      onChange={onChangeHandler}
      placeholder='Enter the receiver name'
      onBlur={() => setTimeout(() => {
        setSuggestions([])
      }, 1000)}
      />

      <div className={styles.suggestionBlock}>
      {suggestions && suggestions.map((sug: any, index: number) => (
        <div onClick={() => setNameIntoInputHandler(sug.name)} className={'col-md-12 justify-content-md-center' && styles.suggestion} key={index}>
          {sug.name}
        </div>
      ))}
      </div>
      </div>
      <div className={styles.bodyMessage}>
      <div className="form-group">
      <label htmlFor="exampleFormControlInput1">Title</label>
      <input type="text" name='title' value={messageData.title} onChange={onChangeMessageData} className="col-md-12 input mb-1" id="exampleFormControlInput1" placeholder="Message Title"/>
      </div>  

      <div className="form-group">
      <label htmlFor="exampleFormControlTextarea1">Message</label>
      <textarea name='text' value={messageData.text} onChange={onChangeMessageData} className="col-md-12 input mb-1" id="exampleFormControlTextarea1" rows={3}></textarea>
      </div>
      </div>
      {errorValidMessage && (
        <div className="alert alert-danger" role="alert">
        {errorValidMessage}
      </div>
      )}
      <Button onClick={createMessageHandler} className={styles.setButton}>Send message</Button>

        {allNewMessages.map((message: any, index: number) => (
          <div style={{width: '100%'}} key={index}>
            {message.sender && (
                <MessageComponent message={message} isNew={true}  />
            )}
          
          </div>
        ))}

      <ReceiverMessages/>
    </Container>
  )
}

export default MainPage
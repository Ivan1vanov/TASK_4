import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getsendedMessagesAction } from '../../store/actions/messageActions';
import { Container } from 'react-bootstrap';
import { IMessageResponse } from '../../store/types/messageActionTypes';
import MessageComponent from '../../Components/Messages/message/MessageComponent';

const SendedMessages = () => {

  const dispatch: any = useDispatch()

  const getLocalName = localStorage.getItem('currentUserName')
  const localName = getLocalName !== null ? JSON.parse(getLocalName) : ''

  const {messages, loading} = useSelector((state: any) => state.messages)

  useEffect(() => {
    dispatch(getsendedMessagesAction(localName))
  }, [])
    

  return (
    <Container>
        <h4>Sended messages</h4>
        {loading && (
          <span>Loading...</span>
        )}
         {messages?.map((message: IMessageResponse, index: number) => (
          <MessageComponent key={index} message={message}/>
        ))}
    </Container>

  )
}

export default SendedMessages
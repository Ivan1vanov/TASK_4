import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getReceiverMessagesAction } from '../../store/actions/messageActions';
import { Container } from 'react-bootstrap';
import useState from 'react';
import { IMessageResponse } from '../../store/types/messageActionTypes';
import MessageComponent from './message/MessageComponent';

interface IMessagesProps {
  allMessages: IMessageResponse[]
}

const ReceiverMessages= () => {

    const dispatch: any = useDispatch()

    const getLocalName = localStorage.getItem('currentUserName')
    const localName = getLocalName !== null ? JSON.parse(getLocalName) : ''

    const {messages, loading} = useSelector((state: any) => state.messages)
  
    useEffect(() => {
      dispatch(getReceiverMessagesAction(localName))
    }, [])

  return (
    <Container>
      {loading && (
        <span>Loading...</span>
      )}
        {messages?.map((message: IMessageResponse, index: number) => (
          <MessageComponent key={index} message={message}/>
        ))}
    </Container>
  )
}

export default ReceiverMessages
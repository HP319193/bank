// components/WhatsAppButton.js

// import handler from '../pages/api/sendMessage'
import { sendMessage } from '../pages/api/sendMessage'
import React, {useState} from 'react'
// import { Client } from "twilio";


const WhatsAppButton = () => {
    

    
    const handleSendMessage = async () => {
      try {
        
        message = sendMessage();
        
        
        
      } catch (error) {
        // console.error('Error sending message:', error);
        // alert('There was an error sending the message.');
      }
    };
  
    return (
      <div>
        <div classname = "text-3xl bg-sky-300 p-3 m-7 w-36 text-center hover:cursor-pointer" onClick={handleSendMessage}>
        Start
        </div>
        
      </div>
      
    );
  };
  
  export default WhatsAppButton;
  
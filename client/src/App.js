import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import socketIOClient from "socket.io-client";

const host = "http://localhost:3000";

function App() {
  const [mess, setMess] = useState([]);
  const [message, setMessage] = useState('');
  const [id, setId] = useState();
  const [user, setUser] = useState('');

  const socketRef = useRef(null);



  useEffect(() => {
    //user test
    if (!user || (user !== 'user1' && user !== 'user2')) {
      return
    }
    const socketOptions = {
      extraHeaders: {
        Authorization: user//token
      }
    }
    socketRef.current = socketIOClient(host, socketOptions);

    //get room conversation info and join in
    socketRef.current.on('room', room => {
      setId(room.id);
      socketRef.current.emit('join_room');
    });

    //receive message from server 
    socketRef.current.on('receive_message', messages => {
      if (Array.isArray(messages)) {
        setMess(oldMsgs => [...oldMsgs, ...messages])
      }
      else {
        setMess(oldMsgs => [...oldMsgs, messages])
      }
    }) // mỗi khi có tin nhắn thì mess sẽ được render thêm 

    return () => {
      socketRef.current.disconnect();
    };
  }, [user]);


  const sendMessage = () => {
    if (message !== null) {
      const msg = {
        content: message,
        createdBy: user,
      }
      socketRef.current.emit('send_message', msg)

      /*Khi emit('send_message') bên phía server sẽ nhận được sự kiện có tên 'send_message' và handle như câu lệnh trong file index.js
        socket.on("send_message", function(data) { // Handle khi có sự kiện tên là send_message từ phía client
          socketIo.emit("receive_message", { data });// phát sự kiện  có tên receive_message cùng với dữ liệu tin nhắn từ phía server
        })
      */
      setMessage('')
    }
  }

  const Msg = ({ isMine, content, user }) => (
    <div style={{ width: '30%', background: isMine ? 'aliceblue' : 'white', border: '1px solid black', borderRadius: 5, alignSelf: isMine ? 'end' : 'start', padding: 5, margin: 5 }}>
      {!isMine ? <><b>{user}</b><br /></> : null}
      {content}
    </div>
  )

  const renderMess = mess.map((m, index) =>
    <Msg
      key={index}
      isMine={m.createdBy === user}
      content={m.content}
      user={m.user}
    />
  )

  return (<div className="box-chat">
    <input value={user} onChange={e => setUser(e.target.value)} />
    <div className="box-chat_message" style={{ 'width': 200, display: 'flex', flexDirection: 'column' }}>
      {renderMess}
    </div>

    <div className="send-box">
      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Nhập tin nhắn ..."
      />
      <button onClick={sendMessage}>
        Send
      </button>
    </div>
  </div>);
}

export default App;

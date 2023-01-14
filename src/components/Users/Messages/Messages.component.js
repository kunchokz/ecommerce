import React, { Component } from 'react';
import * as io from 'socket.io-client';
import './Messages.component.css'
import { FaPaperPlane } from 'react-icons/fa'
import { getCurrentUser } from '../../../utils';
import { relativeTime } from '../../../utils/date.util';
import { notify } from '../../../utils/notify';

const socket_url = process.env.REACT_APP_SOCKET_URL;
const defaultMessageBody = {
  senderId: '',
  receiverId: '',
  senderName: '',
  receiverName: '',
  message: '',
  time: ''
}

export default class MessageComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messageBody: {
        ...defaultMessageBody
      },
      messages: [],
      users: []
    }
  }
  componentDidMount() {
    this.currentUser = getCurrentUser();
    this.socket = io.connect(socket_url);
    this.runSocket();
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(pre => ({
      messageBody: {
        ...pre.messageBody,
        [name]: value
      }
    }))
  }

  send = (e) => {
    e.preventDefault();
    const { messageBody, users } = this.state;
    if (!messageBody.receiverId) {
      return notify.showInfo("please select a user to continue")
    }
    const me = users.find((user, index) => user.name === this.currentUser.username);

    messageBody.senderName = this.currentUser.username;
    messageBody.time = Date.now();
    messageBody.senderId = me.id;
    this.socket.emit('new-message', messageBody)
    this.setState(pre => ({
      messageBody: {
        ...pre.messageBody,
        message: ''
      }
    }))

  }
  selectUser = user => {
    console.log('selected user is .>', user)
    const { messageBody } = this.state;
    messageBody.receiverId = user.id;
    messageBody.receiverName = user.name;
    this.setState({
      messageBody
    })
  }

  runSocket = () => {
    this.socket.emit('new-user', this.currentUser.username);
    this.socket.on('reply-message-own', (data) => {
      const { messages } = this.state;
      messages.push(data);
      this.setState({
        messages
      })
    })
    this.socket.on('reply-message', (data) => {
      const { messages, messageBody } = this.state;
      messageBody.receiverId = data.senderId;
      messageBody.receiverName = data.senderName;
      messages.push(data);
      this.setState({
        messages,
        messageBody
      })
    })
    this.socket.on('users', (users) => {
      this.setState({
        users
      })
    })
  }

  render() {
    return (
      <>
        <h2>Let's Chat</h2>
        <div className="row">
          <div className="col-md-6">
            <h4>Messages</h4>
            <div className="message-box">
              {
                this.state.messages.map((msg, index) => (
                  <div key={index} className={`container ${this.currentUser.username === msg.senderName && 'darker'}`}>
                    {/* <img src="/w3images/bandmember.jpg" alt="Avatar" /> */}
                    <h3>{msg.senderName}</h3>
                    <p>{msg.message}</p>
                    <span className="time-right">{relativeTime(msg.time, 'minute')}</span>
                  </div>

                ))
              }
            </div>
            <form className="form-group" onSubmit={this.send}>
              <input type="text" value={this.state.messageBody.message} className="form-control" placeholder="message here..." name="message" onChange={this.handleChange} />
              <span title="send message" style={{ color: 'blue', marginLeft: '5px' }}>
                <FaPaperPlane></FaPaperPlane>
              </span>
            </form>

          </div>
          <div className="col-md-6">
            <h4>Users</h4>
            <div className="message-box">
              {this.state.users.map((user, index) => (
                <button
                  key={index}
                  style={{ display: 'block' }}
                  className="btn btn-default"
                  onClick={() => this.selectUser(user)}
                >
                  {user.name}
                </button>
              ))}
            </div>

          </div>

        </div>
      </>
    )
  }
}

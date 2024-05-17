import React, { Component } from "react";

import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Card, CardContent } from "@mui/material";

import { io } from "socket.io-client";

import Contacts from "../contacts/contacts.js";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationList,
  Conversation,
  ConversationHeader,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';


export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      conversations: [],
      activeChat: null,
      showChat: true,
      showDiscussions: false,
      showContacts: false,
      contacts: {},
      allUsers: {},
      usersBack: {},
      historicalData: {},
    };

    this.InitSocketIO = this.InitSocketIO.bind(this)
  }

  InitSocketIO = () => {
    this.socket = io(`https://${process.env.host}`, {
      withCredentials: true
    }, { resource: 'nodejs' });

    this.socket.on("connect", () => {
      console.log(`Socket Connected`);

      this.socket.emit("get_historical_messages", this.props.username);
    })

    this.socket.on("historical_messages", (data) => {
      this.setState({ conversations: data });

      if (this.state.activeChat !== null) {
        this.SetActiveConversation(this.state.activeChat.conversationName);
      }

      for (let conversation of data) {
        this.socket.emit("joinConversation", conversation.conversationName);
      }
    });

    this.socket.on("refreshMessages", (() => {
      this.socket.emit("get_historical_messages", this.props.username);
    }))
  }

  SetActiveConversation = (conversationName) => {
    this.state.conversations.forEach((conversation) => {
      if (conversation.conversationName === conversationName) {
        this.setState({ activeChat: conversation })
      }
    })
  }

  getAllUsers = (data) => {
    let usersOut = {};

    console.log(`Get All: ${JSON.stringify(this.state.allUsers)}`);
    console.log(`Data: ${JSON.stringify(data, null, 2)}`);

    Object.values(data).forEach((user) => {
      if (!JSON.stringify(this.state.contacts).includes(user.username)) {
        usersOut[user.username] = user;
      }
    });

    this.setState({ allUsers: usersOut });
    console.log(
      `ALLusers after: ${JSON.stringify(this.state.allUsers, null, 2)}`
    );
  };

  getAllContacts = (data) => {
    this.setState({ contacts: data });
  };

  clearUsers = () => {
    this.setState({ usersBack: {} });
  };

  getReturnedUsers = (user) => {
    let usersNow = this.state.usersBack;

    usersNow[user.username] = user;

    this.setState({ usersBack: usersNow });
    console.log(`AllUsers: ${JSON.stringify(this.state.usersBack)}`);
  };

  showContacts = () => {
    this.setState({
      showContacts: !this.state.showContacts,
    });
  };

  showDiscussions = () => {
    this.setState({
      showDiscussions: !this.state.showDiscussions,
    });
  };

  showChat = () => {
    this.setState({
      showChat: !this.state.showChat,
    });
  };

  showMessages = () => {
    this.setState({
      showMessages: !this.state.showMessages,
    });
  };
  renderSidebar = () => {
    {
      this.state.showDiscussions && (
        <div class="col grid-margin ">
          <div class="card">
            <div class="card-body">
              <h3> End of Discussions </h3>
              <p> Ask a question or post a new topic to discuss </p>
            </div>
          </div>
        </div>
      );
    }

    {
      this.state.showMessages && this.Messages();
    }
  };

  send = (message) => {
    let recieversRaw = this.state.activeChat.conversationName.split("__")

    let recievers = recieversRaw.splice(recieversRaw.indexOf(this.props.username), 1);

    let Message = {
      message: message,
      conversationName: this.state.activeChat.conversationName,
      recievers: recievers
    };

    this.socket.emit("sendMessage", Message);
  }

  renderChat = () => {
    if (this.state.activeChat !== null) {
      let messages = this.state.activeChat.messages.map((message) => (
        <>
          <Message
            model={{
              message: message.message,
              sentTime: message.sentTime,
              sender: message.sender,
              direction: message.direction
            }}
          ><Avatar src={message.avatarLink} name={message.sender} /></Message>
        </>
      ));

      return (
        <div class="col">

          <ChatContainer>
            <ConversationHeader>
              <p>{JSON.stringify(this.state.activeChat.conversationName)}</p>
            </ConversationHeader>

            <MessageList>{messages} </MessageList>

            <MessageInput
              placeholder="Type message here"
              onSend={this.send}
            />
          </ChatContainer>

        </div>
      );
    }
  };

  componentDidMount() {
    this.InitSocketIO();
  }

  render() {
    let conversations = this.state.conversations.map(
      (conversation) => (

        <Conversation
          name={conversation.conversationName}
          lastSenderName={conversation.lastSenderName}
          info={conversation.info}
          unreadCnt={conversation.unreadCnt}
          unreadDot={conversation.unreadDot}
          lastActivityTime={conversation.lastActivityTime}
          onClick={() => {
            this.setState({ activeChat: conversation });
          }}
        >
          <Avatar src={conversation.avatarLink} />
        </Conversation>

      )
    );

    if (this.state.conversations !== null) {
      let conversations = this.state.conversations.map(
        (conversation) => (
          <Conversation
            name={conversation.conversationName}
            lastSenderName={conversation.lastSenderName}
            info={conversation.info}
            unreadCnt={conversation.unreadCnt}
            unreadDot={conversation.unreadDot}
            lastActivityTime={conversation.lastActivityTime}
            onClick={() => this.setActiveChat(conversation.conversationName)}
          >
            <Avatar src={conversation.avatarLink} />
          </Conversation>
        )
      );
    } else {
      let conversations = (
        <div class="col grid-margin ">
          <div class="card">
            <div class="card-body">
              <h3> No Messages </h3>
            </div>
          </div>
        </div>
      )
    }

    return (
      <Card variant="outlined">
        <CardContent>
          <div class="row">
            <div class="col-sm-2" >
              <Card variant="outlined" style={{ height: 160 }}>
                <CardContent>
                  <Menu>
                    <MenuItem
                      icon={<PeopleOutlinedIcon />}
                      onClick={() => {
                        this.showChat();
                      }}
                    >
                      Chats
                    </MenuItem>

                    <MenuItem
                      icon={<ContactsOutlinedIcon />}
                      onClick={() => {
                        this.showContacts();
                      }}
                    >
                      Contacts
                    </MenuItem>
                  </Menu>
                </CardContent>
              </Card>
            </div>

            <div class="col">
              {this.state.showChat && (
                <div class="row">

                  <MainContainer>

                    <div class="col-sm-3">
                      <ConversationList>{conversations}</ConversationList>
                    </div>

                    <div class="col">
                      {this.renderChat()}
                    </div>

                  </MainContainer>
                </div>


              )}
            </div>

            {this.state.showContacts && (
              <Contacts
                username={this.props.username}
                allUsers={this.state.allUsers}
                usersBack={this.state.usersBack}
                contacts={this.state.contacts}
                getReturnedUsers={this.getReturnedUsers}
                clearUsers={this.clearUsers}
                getAllContacts={this.getAllContacts}
                getAllUsers={this.getAllUsers}
                setActiveChat={this.SetActiveConversation}
              />
            )}

          </div>
        </CardContent>
      </Card >
    );
  }
}
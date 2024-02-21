import React, { Component } from "react";

import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Card, CardContent } from "@mui/material";
import axios from "axios";

import { io } from "socket.io-client";

import Contacts from "../contacts/contacts.js";

import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
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

import strftime from "strftime";

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      conversations: {},
      activeChat: null,
      activeMessages: {},
      showChat: true,
      showDiscussions: false,
      showContacts: false,
      contacts: {},
      allUsers: {},
      usersBack: {},
      historicalData: {},
    };
  }

  InitSocketIO = () => {
    const socket = io(`http://${process.env.host}`, { resource: 'nodejs' });

    socket.on("connect", () => {
      console.log(`Socket Connected`);

      socket.emit("get_historical_messages", this.props.username);
    })

    socket.on("historical_messages", (data) => {
      console.log(`Historical Data: ${JSON.stringify(data, null, 2)}`);

      this.setState({ historicalData: data });
    })
  };

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

  getMessages = () => {
    axios
      .put(
        `http://${process.env.host}/messages/get_messages`,
      )
      .then((result) => {
        console.log(`Axios update: ${JSON.stringify(result.data, null, 2)}`);
        this.setState({ conversations: result.data });
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };

  renderChat = () => {
    if (this.state.activeChat !== null) {
      let activeChatName = this.state.activeChat;

      let messages = Object.values(this.props.activeMessages).map((message) => (
        <>
          <Message
            model={{
              message: message.message,
              sentTime: message.sentTime,
              sender: message.sender,
            }}
          />
        </>
      ));

      return (
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Content>
              <Avatar src={JSON.stringify(this.props.avatarLink)} />
            </ConversationHeader.Content>
          </ConversationHeader>

          <MessageList>{messages} </MessageList>
          <MessageInput placeholder="Type message here" />
        </ChatContainer>
      );
    }
  };

  setActiveChat = (conversation) => {
    this.props.getActiveMessages(conversation.messages);
    this.props.getAvatarLink(conversation.avatarLink);
    this.setState({ activeChat: conversation.conversationName });
  };

  componentDidMount() {
    this.getMessages();
    this.InitSocketIO();
  }

  render() {
    let conversations = Object.values(this.state.conversations).map(
      (conversation) => (
        <Conversation
          name={conversation.name}
          lastSenderName={conversation.lastSenderName}
          info={conversation.info}
          unreadCnt={conversation.unreadCnt}
          unreadDot={conversation.unreadDot}
          lastActivityTime={conversation.lastActivityTime}
          onClick={() => this.setActiveChat(conversation)}
        >
          {" "}
          <Avatar src={conversation.avatarLink} />
        </Conversation>
      )
    );

    return (
      <>
        <div class="col">
          <Sidebar style={{ height: "100vh" }}>
            <Menu>
              <MenuItem
                icon={<MenuOutlinedIcon />}
                onClick={() => {
                  this.collapseSidebar();
                }}
                style={{ textAlign: "center" }}
              >
                Discussions & Chat
              </MenuItem>

              <MenuItem
                icon={<HomeOutlinedIcon />}
                onClick={() => {
                  this.showDiscussions();
                }}
              >
                Discussions
              </MenuItem>
              <MenuItem icon={<ReceiptOutlinedIcon />}>New Discussion</MenuItem>

              <MenuItem
                icon={<PeopleOutlinedIcon />}
                onClick={() => {
                  this.showChat();
                }}
              >
                Chat
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
          </Sidebar>
        </div>
        <div class="row">
          {this.state.showChat && (
            <Card variant="outlined">
              <CardContent>
                <div style={{ height: "500px" }}>
                  <MainContainer>
                    <div class="col-6">
                      <br />

                      <div class="row">
                        <h4> Chat </h4>
                      </div>

                      <div class="row">
                        <div class="col">
                          <ConversationList>{conversations}</ConversationList>
                        </div>
                      </div>
                    </div>
                    <div class="col">{this.renderChat()}</div>
                  </MainContainer>
                </div>
              </CardContent>
            </Card>
          )}{" "}
        </div>{" "}
        <div class="row">
          {this.state.showDiscussions && (
            <div class="col grid-margin ">
              <div class="card">
                <div class="card-body">
                  <h3> End of Discussions </h3>
                  <p> Ask a question or post a new topic to discuss </p>
                </div>
              </div>
            </div>
          )}{" "}
        </div>
        <div class="row">
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
            />
          )}
        </div>
      </>
    );
  }
}
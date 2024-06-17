import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";

import { Avatar, ChatContainer, Conversation, ConversationHeader, ConversationList, MainContainer, Message, MessageList } from "@chatscope/chat-ui-kit-react";

import { io } from "socket.io-client";


export default class SundaySocialChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      conversations: [],
      activeChat: null,
      showChat: true,
      showDiscussions: false,
      showContacts: false,
      historicalData: {},
      showVideoChat: false,
      videoChatURL: ""
    };

    this.InitSocketIO = this.InitSocketIO.bind(this)
  }

  InitSocketIO = () => {
    this.socket = io(`https://${process.env.host}`, {
      withCredentials: true
    }, { resource: 'nodejs' });

    this.socket.on("connect", () => {
      this.socket.emit("get_historical_SS_Messages", this.props.username);
    })

    this.socket.on("historical_SS_messages", (data) => {
      this.setState({ conversations: data });

      if (this.state.activeChat !== null) {
        this.SetActiveConversation(this.state.activeChat.conversationName);
      }

      for (let conversation of data) {
        this.socket.emit("join_SS_Conversation", conversation.conversationName);
      }
    });

    this.socket.on("refresh_SS_Messages", (() => {
      this.socket.emit("get_historical_SS_messages", this.props.username);
    }))

    this.socket.on("Start_SS_VideoChatURL", (URL) => {
      this.setState({
        showVideoChat: true,
        videoChatURL: URL
      })
    })
  }

  SetActiveConversation = (conversationName) => {
    this.state.conversations.forEach((conversation) => {
      if (conversation.conversationName === conversationName) {
        this.setState({ activeChat: conversation })
      }
    })
  }

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

  send = (message) => {
    let recieversRaw = this.state.activeChat.conversationName.split("__");

    const recievers = recieversRaw.filter((item) => {
      return item !== this.props.username;
    })

    let Message = {
      message: message,
      conversationName: this.state.activeChat.conversationName,
      recievers: recievers
    };

    this.socket.emit("sendMessage", Message);
  }

  StartVideoChat = () => {
    console.log("Start Video Chat");
    this.socket.emit("StartVideoChat", {
      conversationName: this.state.activeChat.conversationName,
      caller: this.props.username,
      recievers: this.state.activeChat.conversationName.split("__").filter((item) => { return item !== this.props.username })
    });
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
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Actions>
              <VideoCallButton
                onClick={() => {
                  this.StartVideoChat();
                }}
              />
              <InfoButton />
            </ConversationHeader.Actions>
          </ConversationHeader>

          <MessageList>{messages} </MessageList>

          <MessageInput
            placeholder="Type message here"
            onSend={this.send}
          />
        </ChatContainer>
      );
    }
  };

  NewConversation = (username) => {
    this.socket.emit("NewConversation", this.props.username, username);
  }

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
      <Card>
        <CardContent>
          <div class="col-5">
            Chats

            <br />

            {this.state.showChat && (
              <MainContainer>
                <div class="col-sm-5">
                  <ConversationList>{conversations}</ConversationList>
                </div>

                <div class="col">
                  {this.renderChat()}
                </div>
              </MainContainer>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
}

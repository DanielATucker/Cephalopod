import React, { Component } from 'react';
import Terminal from 'terminal-in-react';
 
export default class MyTerminal extends Component {
  showMsg = () => 'Hello World'
 
  render() {
    return (
        <Terminal>
          color='red'
          backgroundColor='black'
          barColor='black'
          style={{ fontWeight: "bold", fontSize: "1em" }}
          commands={{
            'open-google': () => window.open('https://www.google.com/', '_blank'),
            showmsg: this.showMsg,
            popup: () => alert('Terminal in React')
          }}
          descriptions={{
            'open-google': 'opens google.com',
            showmsg: 'shows a message',
            alert: 'alert', popup: 'alert'
          }}
          msg='You can write anything here. Example - Hello! My name is Foo and I like Bar.'
        </Terminal>
    );
  }
}
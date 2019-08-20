import React, { Fragment } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import io from 'socket.io-client';


class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  connectSocketIO = () => {
    // Socket io
    this.socket = io('http://localhost:8000');
    this.socket.onopen = () => socket.send(JSON.stringify({ type: 'greet', payload: 'Hello Mr. Server!' }))
    this.socket.onmessage = ({ data }) => console.log(JSON.parse(data).payload)
    this.socket.on('getMessage', message => {
      console.log(`${message}`);
    })
  }

  sendSocketIOMsg = () => {
    console.log('sendSocketIOMsg');
    this.socket.emit('sayhi', 'HELLO socket.io'); // emit action named sayhi
  }

  sendAndReceiveSocketIOMsg = () => {
    console.log('sendAndReceiveSocketIOMsg');
    this.socket.emit('getMessage', 'Client send hello'); // emit action named sayhi
  }

  connectWebsocket = () => {
    // WebSocket 
    this.ws = new WebSocket('ws://localhost:8080/');
    this.ws.onopen = () => {
      console.log('ws.onopen')
      // connection opened
      this.ws.send('client send connected msg'); // send a message
    };

    this.ws.onmessage = (e) => {
      // a message was received
      console.log(e.data);
    };

    this.ws.onclose = (e) => {
      // connection closed
      console.log('Client onCloseWebSocket')
      console.log(e.code, e.reason);
    };

    this.ws.onerror = (e) => {
      console.log('Client onErrorWebSocket')
      // an error occurred
      console.log(e.message);
    };
  }

  onSendWebSocket = () => {
    console.log('onSendWebSocket')
    this.ws.send('Hello WebSocket!');
  }

  render() {
    return (
      <View style={styles.buttonSection}>
        <TouchableHighlight style={styles.submit}
          underlayColor="#3751B8"
          onPress={this.connectSocketIO}
        >
          <Text style={styles.submitText}>Socket.io Connect</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.submit}
          underlayColor="#3751B8"
          onPress={this.sendSocketIOMsg}
        >
          <Text style={styles.submitText}>Socket.io Send</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.submit}
          underlayColor="#3751B8"
          onPress={this.sendAndReceiveSocketIOMsg}
        >
          <Text style={styles.submitText}>Socket.io Send and Receive</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.submit}
          underlayColor="#3751B8"
          onPress={this.connectWebsocket}
        >
          <Text style={styles.submitText}>WebSocket Connect</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.submit}
          underlayColor="#3751B8"
          onPress={this.onSendWebSocket}
        >
          <Text style={styles.submitText}>WebSocket Send</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default HomeScreen;

const styles = StyleSheet.create({

  buttonSection: {
    // width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 5,
  },
  submit: {
    width: '100%',
    backgroundColor: '#4869ee',
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 4,
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
  },
});
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import './App.css';
import './Chat.css';
import InstantMessengerChat from './containers/InstantMessengerChat'
import InstantMessenger from './containers/InstantMessenger'
import FriendsList from './containers/FriendsList'
import { API_ROOT, HEADERS } from './constants'
import CreateUser from './containers/CreateUser'
import { Route, Switch } from "react-router-dom";

class App extends Component {
  state = {
    showInstantMessenger: true,
    showFriendsList: false,
    showInstantMessengerChat: false,
    clickedFriend:{},
    user: {}
  }

  componentDidMount() {
    fetch(`${API_ROOT}get_user`, {
      method: `GET`,
      headers: HEADERS
    })
    .then(res => res.json())
    .then(user => {
      if (user.error){
        return <Redirect to="/" />;
      } else {
        this.setState({ user })
      }
    })
  }



  showHandler = (chatName) =>{
    if(chatName === "Friends List" || chatName === "Sign On") {
      this.setState({
        showFriendsList: !this.state.showFriendsList,
        showInstantMessenger: !this.state.showInstantMessenger
      })
    }
    else {
      this.setState({
        showInstantMessengerChat: !this.state.showInstantMessengerChat
      })
    }
  }

  newChatHandler = (friendObj) =>{
    this.showHandler()
    this.setState({
      clickedFriend: friendObj,
      showInstantMessengerChat: !this.state.showInstantMessengerChat
    })
  }

  signupHandler = userInfo => {
  fetch(`${API_ROOT}users`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ user: userInfo })
  })
    .then(resp => resp.json())
    .then(data => {
      localStorage.setItem("token", data.jwt);
      this.setState({ user: data.user });
    });
};

authenticateUser = (e, username, password) => {
  e.preventDefault();
  let user = {username: username, password: password}
  fetch(`${API_ROOT}login`, {
    method: `POST`,
    headers: HEADERS,
    body: JSON.stringify({ user })
  })
  .then(resp => resp.json())
<<<<<<< HEAD
  .then(data => {this.testFunction(data)})
    // localStorage.setItem("token", data.jwt);
    // this.setState({ user: data.user })
  // })
}

  testFunction = (data) => {
    // console.log(HEADERS)
    console.log(data.user)
    fetch(`${API_ROOT}chats`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `${data.jwt}`
      }
    })
    .then(res => res.json())
    .then(console.log)
  }


  render() {
    // console.log(this.state.user)
    // console.log(HEADERS)
=======
  .then(data => {
    localStorage.setItem("token", data.jwt);
    this.setState({ user: data.user });
    document.cookie = 'X-Authorization=' + data.jwt + '; path=/';
  })
}


  render() {
>>>>>>> c013ffd6ec645c191861720369520849ffd03449
    return (
      <div>
      <Switch>
        <Route path="/signup" component={CreateUser} />
      </Switch>
      {this.state.showInstantMessenger ?
      <InstantMessenger testFunction={this.testFunction} showHandler={this.showHandler} authenticateUser={this.authenticateUser}/> :
      <FriendsList newChatHandler={this.newChatHandler} showHandler={this.showHandler} />}
      {this.state.showInstantMessengerChat ? <InstantMessengerChat clickedFriend={this.state.clickedFriend} showHandler={this.showHandler}/> : null}
      </div>
    )
  }
}

export default App;

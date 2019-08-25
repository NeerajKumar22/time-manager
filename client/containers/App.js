import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import '../scss/index.scss';
import { getCurrentUser, noToken } from '../actions'



import HomePage from '../components/home/HomePage';
import NavBar from '../components/navbar/NavBar'
import Register from '../components/navbar/Register'
import Login from '../components/navbar/Login'

class App extends Component {
  state = { 
    token: ""
  }

  componentDidMount() {
    var token = localStorage.getItem('authToken') || '';
    if(token) {
      this.setState({token: token})
      this.props.dispatch(getCurrentUser())
    } else {
      this.props.dispatch(noToken());
    }
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/navbar" component={NavBar} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.user
  }
}

export default connect(mapStateToProps)(App);





  
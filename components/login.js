import React from 'react';
import firebase from 'firebase';

var Login = React.createClass({
  getInitialState: function() {
    return {
      email: '',
      password: '',
      mode: 'login',
      error: null
    }
  },

  render: function() {
    return <section className="ui form">
      { this.state.error ? <div>{ this.state.error }</div> : null }
      <div className="inline fields">
          <div className="field">
            <input className="ui checkbox" type='radio' value='login' checked={ this.state.mode == 'login' } onChange={ this.setMode } />
            <label>Login</label>
          </div>
          <div className="field">
            <input className="ui checkbox" type='radio' value='signup' checked={ this.state.mode == 'signup' } onChange={ this.setMode } />
            <label>Signup</label>
          </div>
      </div>
      <div className="inline fields">
        <label for='email' className="ui violet horizontal label">Email</label>
        <input className="ui large input" type='text' name='email' value={ this.state.email } onChange={ this.setEmail } />
      </div>
      <div className="inline fields">
        <label for='email' className="ui violet horizontal label">Password</label>
        <input className="ui large input" type='password' name='password' value={ this.state.password } onChange={ this.setPassword } />
      </div>
      <div className="inline fields">
        <button className="ui violet button" onClick={ this.login }>
          { this.state.mode == 'login' ? "Login" : "Sign Up" }
        </button>
      </div>
    </section>
  },

  setEmail: function(evt) { this.setState({ email: evt.target.value }); },
  setPassword: function(evt) { this.setState({ password: evt.target.value }); },
  setMode: function(evt) { this.setState({ mode: evt.target.value }); },

  login: function() {
    var component = this;
    if (this.state.mode == 'login') {
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(function() {
        component.props.onLogin(component.state.email)
      })
      .catch(function(error) {
        component.setState({ error: error.message })
      })
    } else {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(function() {
        component.props.onLogin(component.state.email)
      })
      .catch(function(error) {
        component.setState({ error: error.message })
      })
    }
  }
})

export default Login;

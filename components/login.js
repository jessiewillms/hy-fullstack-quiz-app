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
    return <div>
      { this.state.error ? <div>{ this.state.error }</div> : null }
      <div>
        <label>
          <input type='radio' value='login' checked={ this.state.mode == 'login' } onChange={ this.setMode } />
          Login
        </label>
        <label>
          <input type='radio' value='signup' checked={ this.state.mode == 'signup' } onChange={ this.setMode } />
          Signup
        </label>
      </div>
      <div>
        <label for='email'>Email</label>
        <input type='text' name='email' value={ this.state.email } onChange={ this.setEmail } />
      </div>
      <div>
        <label for='email'>Password</label>
        <input type='password' name='password' value={ this.state.password } onChange={ this.setPassword } />
      </div>
      <div>
        <button onClick={ this.login }>
          { this.state.mode == 'login' ? "Login" : "Sign Up" }
        </button>
      </div>
    </div>
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

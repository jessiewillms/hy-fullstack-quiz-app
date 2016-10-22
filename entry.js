var ReactDOM = require('react-dom');
var React = require('react');
var firebase = require('firebase');

var $ = require('jquery');

// 1. create a Quiz component to store the entire Quiz
// 2. create a Quiz Question component to create a single Question
// 3. Create a button to add a new Quiz Question

var Quiz = React.createClass({
  getInitialState: function() {
    return {
      data: {},
      error: false,
      loading: true,
      firebasekey: ""
    }
  },

  render: function() {
    <Quiz />
    console.log(this.state);
  }
});

var QuizQuestion = React.createClass({
  getInitialState: function() {
    return {
      question_structure: [
        { text: "Question one" },
      ]
    }
  },
  render: function() {
    return <section>
      <h2>Add your question using this form: </h2>
      <input type="text"
       className="form-control"
       placeholder="Add question here"
       value={ this.state.newQuestion }
      />
    <button onClick={ this.addNewQuestion }></button>
    </section>
  }
});

ReactDOM.render(
  <div><QuizQuestion /></div>,
  document.getElementById('placeholder'));

var React = require('react');
var ReactDOM = require('react-dom');
var firebase = require('firebase');
var $ = require('jquery');

var config = {
  apiKey: "AIzaSyBggrk6xdeoMro2VthGdD84K5glFOyp7uo",
  authDomain: "quiz-hy.firebaseapp.com",
  databaseURL: "https://quiz-hy.firebaseio.com",
  storageBucket: "quiz-hy.appspot.com",
  messagingSenderId: "388978898226"
};

firebase.initializeApp(config);

// Single question component
var Question = React.createClass({

    getInitialState: function() {
        return {
          quiz: {
            note: '',
            author: '',
            questions: [{
              'q_1': '',
              'q_2': '',
            }]
          }
        }
    },

    // when *this Question* component (list of questions) is about to go on the screen - on render
    // componentWillMount() {
    //   // console.log('initial state', this.state.quiz.questions_object);
    //   console.log('log initial state', this.state);
    //   this.firebase = firebase.database().ref('hy-quiz-9');
    //
    //   this.firebase.on('child_added', function(dataSnapshot){
    //
    //     this.setState({
    //       questions_object: dataSnapshot.val(),
    //     });
    //
    //   }.bind(this));
    //
    // },
    AddNewQuestion() {

        var newMultipleChoiceQuestion = {
          'q_1': '',
          'q_2': '',
        };

        console.log('AddNewQuestion -- add a question', newMultipleChoiceQuestion);

        var newQuestions = this.state.quiz['questions_object'].concat(newMultipleChoiceQuestion);
        console.log(this.state);

        console.log('logs --  newQuestions', newQuestions);
        // updates state to have another question

        this.setState({
          quiz: newQuestions
        });

        // console.log('line 81', this.state);
      // add a new empty to the questions array on the state


    },
    SetQuizQuestionText: function(key, index, event) {
      // TODO: investigate immutability in react state
      // console.log(event.target.value);
      this.state.quiz.questions_object[index][key] = event.target.value;

      // console.log('73 logs this.state.question --', this.state.questions);
      // console.log(this.state.quiz.questions_object);

      this.setState({
        quiz: this.state.quiz
      })
    },

    sendToFirebase: function(data) {
      console.log(this.state);

      // var quiz = this.state.quiz;
      // this.setState({quiz: quiz});

      this.setState({
        quiz: this.state.quiz
      });

      // console.log('97 -- questions', this.state.questions);
      this.firebase.push(data);
    },

    render: function() {
      var component = this;
      return (
        <div>
          <input name='note' placeholder='NotName' value={ this.state.quiz.note } onChange={ this.updateField } />
          <input name='author' placeholder='Author' value={ this.state.quiz.author } onChange={ this.updateField } />

          <input name='q_1' placeholder='question_one' value={ this.state.quiz.q_1 } onChange={ this.updateField } />
          <input name='q_2' placeholder='question_two' value={ this.state.quiz.q_2 } onChange={ this.updateField } />

          <button onClick={ this.AddNewQuestion } >Add news question</button>
        </div>
      )
    },

    updateField: function(evt) {
    var quiz = this.state.quiz;

      quiz[evt.target.name] = evt.target.value;
      console.log('log state', this.state);

      this.setState({
        quiz: quiz
      });

      console.log('quiz', quiz);
    }
});

var App = React.createClass({

  render: function(){
    return (
      <div>
        <div className="ui sizer vertical segment">
          <h1 className="ui huge header">This is my App component</h1>
        </div>
        <Question />
      </div>
    )
  }
})

ReactDOM.render(
  <div>
        <App/>
  </div>,
  document.getElementById('placeholder'));

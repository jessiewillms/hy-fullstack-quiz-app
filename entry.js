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
          title: "",
          questions_object: [{
            question : "",
            option_a : "",
            option_b : "",
            option_c : "",
            option_d : "",
            answer : "",
          }]
        },
        // questions: [{
        //     title : "",
        //     question : "",
        //     option_a : "",
        //     option_b : "",
        //     option_c : "",
        //     option_d : "",
        //     answer : "",
        //     question_number: "",
        //   }],
          firebasekey: "",
          dummy_key_fake: "with a set string value",
          error: false
      }
    },

    // when *this Question* component (list of questions) is about to go on the screen - on render
    componentWillMount() {
      // console.log('initial state', this.state.quiz.questions_object);

      this.firebase = firebase.database().ref('hy-quiz-9');

      this.firebase.on('child_added', function(dataSnapshot){

        this.setState({
          questions: dataSnapshot.val(),
        });

      }.bind(this));

    },

    AddNewQuestion() {

      // console.log('AddNewQuestion -- add a question');

        var newMultipleChoiceQuestion = {
          question : "",
          option_a : "",
          option_b : "",
          option_c : "",
          option_d : "",
          answer : "",
        };

        var newQuestions = this.state.quiz.questions_object.concat(newMultipleChoiceQuestion);

        // console.log('logs --  newQuestions', newQuestions);
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

      this.setState({
        quiz: this.state.quiz
      });
      // console.log('97 -- questions', this.state.questions);
      this.firebase.push(data);
    },

    render: function() {
      var component = this;

      console.log('line 116', this.state);

      return (
        <div>

          { this.state.quiz.questions.map(function(singleQuestion, index) {

            return (
              <div className="ui form" key={ index } >
                <section className="card">
                  <input value={ singleQuestion.question } onChange={ component.SetQuizQuestionText.bind(component, "question", index) } placeholder='Question' />
                  <input value={ singleQuestion.option_a } onChange={ component.SetQuizQuestionText.bind(component, "option_a", index) } placeholder='Option a' />
                  <input value={ singleQuestion.option_b } onChange={ component.SetQuizQuestionText.bind(component, "option_b", index) } placeholder='Option b' />
                  <input value={ singleQuestion.option_c } onChange={ component.SetQuizQuestionText.bind(component, "option_c", index) } placeholder='Option c' />
                  <input value={ singleQuestion.option_d } onChange={ component.SetQuizQuestionText.bind(component, "option_d", index) } placeholder='Option d' />
                  <input value={ singleQuestion.answer } onChange={ component.SetQuizQuestionText.bind(component, "answer", index) } placeholder='Answer' />
                </section>
              </div>
            )

          }) }

            <button className="ui button" onClick={ this.AddNewQuestion } type="submit">Add a new multiple choice question</button>
            <button className="ui primary button" onClick={() => { this.sendToFirebase(this.state.quiz); }} type="submit">send To Firebase</button>
        </div>
      )
    }
});

var App = React.createClass({
  onButtonSubmit: function() {
    // console.log('<Question />');
  },
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

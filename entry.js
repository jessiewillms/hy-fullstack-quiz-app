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
        questions: [{
            title : "",
            question : "",
            option_a : "",
            option_b : "",
            option_c : "",
            option_d : "",
            answer : "",
          }],
          firebasekey: "",
          error: false
      }
    },
    // when *this Question* component (list of questions) is about to go on the screen - on render
    componentWillMount() {

      console.log('title', this.state.questions.title);

      this.firebase = firebase.database().ref('hy-quiz-3');

      this.firebase.on('child_added', function(dataSnapshot){
        this.setState({
          questions: dataSnapshot.val(),
        });
      }.bind(this));
    },

    AddNewQuestion() {

      console.log('AddNewQuestion -- add a question');

        var newMultipleChoiceQuestion = {
          question : "",
          option_a : "",
          option_b : "",
          option_c : "",
          option_d : "",
          answer : "",
        };

        var newQuestions = this.state.questions.concat(newMultipleChoiceQuestion);

        console.log('logs --  newQuestions', newQuestions);

        // updates state to have another question
        this.setState({
          questions: newQuestions
        });

        console.log('newQuestion -- ', newMultipleChoiceQuestion);
      // add a new empty to the questions array on the state


    },

    setText: function(key, index, event) {
      // whatever is the text of the input field (event.target)

      // TODO: investigate immutability in react state
      this.state.questions[index][key] = event.target.value;

      console.log('73 logs this.state.question --', this.state.questions);

      this.setState({
        questions: this.state.questions
      })

    },

    sendToFirebase: function(data) {

      this.setState({
        questions: this.state.questions
      });

      console.log('97 -- questions', this.state.questions);

      this.firebase.push(data);

    },

    render: function() {
      var component = this;

      return (
        <div>

          <input value={ this.state.questions.title } onChange={ component.setText.bind(component, "Title of Quiz", index) } placeholder='Title of entire quiz' />

          { this.state.questions.map(function(singleQuestion, index) {
            return (
              <form key={ index } className="ui form">
                <div>

                  <p>new row</p>

                  <section className="wrapper__question-wrap">

                    <input value={ singleQuestion.question } onChange={ component.setText.bind(component, "question", index) } placeholder='Question' />
                    <input value={ singleQuestion.option_a } onChange={ component.setText.bind(component, "option_a", index) } placeholder='Option a' />
                    <input value={ singleQuestion.option_b } onChange={ component.setText.bind(component, "option_b", index) } placeholder='Option b' />
                    <input value={ singleQuestion.option_c } onChange={ component.setText.bind(component, "option_c", index) } placeholder='Option c' />
                    <input value={ singleQuestion.option_d } onChange={ component.setText.bind(component, "option_d", index) } placeholder='Option d' />

                    <input value={ singleQuestion.answer } onChange={ component.setText.bind(component, "answer", index) } placeholder='Answer' />
                  </section>
                </div>
              </form>
            )
          }) }

            <button className="ui button" onClick={ this.AddNewQuestion } type="submit">Add a new multiple choice question</button>
            <button className="ui primary button" onClick={() => { this.sendToFirebase(this.state.questions); }} type="submit">send To Firebase</button>
        </div>
      )
    }
});

var App = React.createClass({
  onButtonSubmit: function() {
    console.log('<Question />');
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

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var firebase = require('firebase');
var $ = require('jquery');

var config = {
  apiKey: "AIzaSyBggrk6xdeoMro2VthGdD84K5glFOyp7uo",
  authDomain: "quiz-hy.firebaseapp.com",
  databaseURL: "https://quiz-hy.firebaseio.com",
  storageBucket: "quiz-hy.appspot.com",
  messagingSenderId: "388978898226"
};

var $number_of_questions = 1;

firebase.initializeApp(config);

var AddMoreQuestionsModal = React.createClass({
  render: function() {
    return <div>
      <h1 className='greeting'>Add more</h1>
    </div>
  }
});
// Single question component
var Question = React.createClass({

    getInitialState: function() {
      return {
        questions: [{
            question : "",
            option_a : "",
            option_b : "",
            option_c : "",
            option_d : "",
            answer : "",
            question_number: "",
          }],
          firebasekey: "",
          error: false,
          loading: false,
          counter: 0,
          title: ""
      }
    },

    error: function() {
      if (this.state.error == true) {
        return (
          <div>There is an error</div>
        )
      }
    },

    counter: function(){
      var newCount = this.state.counter + 1;
      this.state.counter = newCount;
      console.log(this.state);
    },

    // when *this Question* component (list of questions) is about to go on the screen - on render
    componentWillMount() {

      this.firebase = firebase.database().ref('quiz-hy-new');

      this.firebase.on('child_added', function(dataSnapshot){

        this.setState({
          questions: dataSnapshot.val(),
          loading: false,
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
          question_number: "",
        };

        var newQuestions = this.state.questions.concat(newMultipleChoiceQuestion);
        // updates state to have another question
        this.setState({
          questions: newQuestions
        });
    },

    SetQuizQuestionText: function(key, index, event) {

      // TODO: investigate immutability in react state
      this.state.questions[index][key] = event.target.value;

      // console.log('73 logs this.state.question --', this.state.questions);

      this.setState({
        questions: this.state.questions
      })

    },

    createTitle: function(event) {
      console.log('create the title');
      this.state.title = event.target.value;
      console.log("title input", event.target.value);

      // updating Title in state, but not being sent to Firebase
      this.setState({
        title: this.state.title
       });

    },

    sendTitleToFirebase: function(title_data) {
      this.setState({
        questions: this.state.questions
      });
      this.firebase.push(title_data);
    },

    sendToFirebase: function(data) {
      // console.log('data', data);
      // console.log(this.state);

      var totalQuestions = this.state.questions.length;
      // console.log('totalQuestions length: ', this.state.questions.length);

      if (totalQuestions > $number_of_questions) {

        // console.log('totalQuestions: more than 5');

        this.setState({
          questions: this.state.questions
        });

        this.firebase.push(data);

      } else {
        // TODO: render a modal component here
        alert('Not enough questions!');
      }

    },

    render: function() {
      var component = this;
      if (this.state.loading) {
        return <div>Loading...</div>
      } else {
        return (
          <div>
          { this.error() }
          { this.counter() }
          {/* { this.make() } */}

             {/* value={ this.state.title }  */}
             <input onChange={ this.createTitle }/>
             {/* <input placeholder="Add a title" value={ this.target.value } onChange={ this.createTitle }/> */}

            { this.state.questions.map(function(singleQuestion, index) {

              return (
                <form className="ui form sizer vertical segment" key={ index } >
                  <div>Delete this question <span>x</span></div>
                  <h3 className="ui header" value={ index }>Question #{ index }.</h3>

                  <section className="card">
                    {/* <input value={ singleQuestion.title } onChange={ component.SetQuizTitle } placeholder='Question title' /> */}

                    <input value={ singleQuestion.question } onChange={ component.SetQuizQuestionText.bind(component, "question", index) } placeholder='Question' />
                    <input value={ singleQuestion.option_a } onChange={ component.SetQuizQuestionText.bind(component, "option_a", index) } placeholder='Option a' />
                    <input value={ singleQuestion.option_b } onChange={ component.SetQuizQuestionText.bind(component, "option_b", index) } placeholder='Option b' />
                    <input value={ singleQuestion.option_c } onChange={ component.SetQuizQuestionText.bind(component, "option_c", index) } placeholder='Option c' />
                    <input value={ singleQuestion.option_d } onChange={ component.SetQuizQuestionText.bind(component, "option_d", index) } placeholder='Option d' />

                    <select className="ui fluid dropdown" value={ singleQuestion.answer } onChange={ component.SetQuizQuestionText.bind(component, "answer", index) }>
                      <option>Option a</option>
                      <option>Option b</option>
                      <option>Option c</option>
                      <option>Option d</option>
                    </select>
                  </section>
                </form>
              )
            }) }

              <div className="ui sizer vertical segment">
                <button className="ui button" onClick={ this.AddNewQuestion } type="submit">Add a new multiple choice question</button>

              <button className="ui primary button" onClick={() => { this.sendToFirebase(this.state.questions); }} type="submit">send To Firebase</button>
              </div>
          </div>
        )
      }

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
          <h1 className="ui huge header">Quiz app</h1>
          <br></br>
        </div>
        <br></br>
        <div className="ui sizer vertical segment">
          <Question />
        </div>
      </div>
    )
  }
})

ReactDOM.render(
  <div>
        <App/>
  </div>,
  document.getElementById('placeholder'));

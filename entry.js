var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var firebase = require('firebase');
import Login from './components/login';
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

// TODO: Have this appear when submit & <5 questions
// var AddMoreQuestionsModal = React.createClass({
//   render: function() {
//     return <div>
//       <h1 className='greeting'>Add more</h1>
//     </div>
//   }
// });

var CreateAQuiz = React.createClass({
  render: function() {
    return <div><Question /></div>;
  }
});

var TakeAQuiz = React.createClass({
  render: function() {
    return <div><QuizzesFromFirebase /></div>;
  }
});

var QuizzesFromFirebase = React.createClass({
  render: function() {
    return (
      <div>Quizzes from FB</div>
    )
  }
})


// Single question component
var Question = React.createClass({

    getInitialState: function() {
      return {
        quiz: {
          // empty_posts: [],
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
        }
    },

    error: function() {
      if (this.state.error == true) {
        return (
          <div>There is an error</div>
        )
      }
    },

    // counter: function(){
    //   var newCount = this.state.counter + 1;
    //   this.state.counter = newCount;
    //   console.log(this.state);
    // },

    // when *this Question* component (list of questions) is about to go on the screen - on render
    componentWillMount() {
      console.log('line 67 | ', this.state);
      this.firebase = firebase.database().ref('quiz-hy-21');

      this.firebase.on('child_added', function(dataSnapshot){
        // this happens when it mounts to DOM
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
        console.log(newMultipleChoiceQuestion);


        // var newQuestions = this.state.quiz.questions.concat(newMultipleChoiceQuestion);

        // updates state to have another question
        var updatedQuiz = this.state.quiz.questions.push(newMultipleChoiceQuestion);

        this.setState({
          quiz: updatedQuiz
        });

        console.log(this.state);
        console.log(this.state.quiz);
    },

    SetQuizQuestionText: function(key, index, event) {

      // TODO: investigate immutability in react state
      this.state.quiz.questions[index][key] = event.target.value;
      // console.log('73 logs this.state.question --', this.state.questions);

      this.setState({
        questions: this.state.quiz.questions
      })

    },

    createTitle: function(event) {
      console.log('create the title');
      this.state.title = event.target.value;
      console.log("title input", event.target.value);

      // updating Title in state, but not being sent to Firebase
      this.setState({
        title: this.state.quiz.title
       });
    },

    sendTitleToFirebase: function(title_data) {
      console.log('called sendTitleToFirebase | ');
      this.setState({
        title: this.state.title
      });
      this.firebase.push(title_data);
      firebase.database().push(title_data);
      // firebase.database().child('title').push(title_data);
    },

    sendToFirebase: function(data) {
      var totalQuestions = this.state.quiz.questions.length;
      // console.log('totalQuestions length: ', this.state.questions.length);
      if (totalQuestions > $number_of_questions) {
        // console.log('totalQuestions: more than 5');
        this.setState({
          questions: this.state.quiz.questions
        });

        this.firebase.push(data);

      } else {
        // TODO: render a modal component here
        alert('Not enough questions!');
      }

    },

    render: function() {
      var component = this;

      console.log('160', this.state.quiz.questions);
      if (this.state.loading) {
        return <div>Loading...</div>
      } else {
        return (
          <div>
          { this.error() }
          {/* { this.counter() } */}
          {/* { this.make() } */}

             <input onChange={ this.createTitle }/>
             <button className="ui primary button" onClick={ () => {this.sendTitleToFirebase(this.state.quiz.title)} }>send Title To Firebase</button>

             {/* { this.state.quiz.questions.map(function(singleQuestion, index) {

              return (
                <form className="ui raised very padded text container segment" key={ index } >
                  <div>Delete this question <span>x</span></div>
                  <h3 className="ui header" value={ index }>Question #{ index }.</h3>

                  <section className="card">

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
            }) } */}

              <div className="ui sizer vertical segment">
                <button className="ui button" onClick={ this.AddNewQuestion } type="submit">Add a new multiple choice question</button>
                <button className="ui primary button" onClick={() => { this.sendToFirebase(this.state.quiz.questions); }} type="submit">send To Firebase</button>
              </div>
          </div>
        )
      }

    }
});

var App = React.createClass({

  getInitialState: function() {
    return {
      currentUser: null,
      loggedIn: false
    }
  },
  render: function() {
    if (this.state.loggedIn) {
      return <div>
        <div className="ui huge header">Login successful! Welcome back, { this.state.currentUser }</div>
        { this.props.children }
        <div className="ui sizer vertical segment">
            <h1 className="ui large header">Quiz app</h1>
            <div className="ui huge buttons">
              <Link to="/page1"><button className="ui button">Create A New Quiz</button></Link>
              <div className="or"></div>
              <Link to="/page2"><button className="ui button">Take an Existing Quiz</button></Link>
            </div>
        </div>
      </div>
    } else {
      return <Login onLogin={ this.loginUser }/>
    }
  },
  loginUser: function(email) {
    this.setState({loggedIn: true, currentUser: email});
  }

  // render: function(){
  //   return (
  //
  //   )
  // }
})

ReactDOM.render(
  <div>
    <App />
    {/* <Router history={browserHistory}>
      <Route path="/" component={ App }>
        <Route path="page1" component={ CreateAQuiz }/>
        <Route path="page2" component={ TakeAQuiz }/>
      </Route>
    </Router> */}
  </div>,
  document.getElementById('placeholder'));

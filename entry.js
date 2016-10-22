var React = require('react');
var ReactDOM = require('react-dom');
// var firebase = require('firebase');

var $ = require('jquery');

// Single question component
var Question = React.createClass({
    render: function() {
      console.log('Question added');
      return (
        <div>
          <p>A Question box</p>
          <p className='para__title'></p>
          <p className='para__sub-title'></p>
          <p className='para__desc'></p>
          <p className='para__desc'></p>
        </div>
      )
    }
});

// The entire Quiz component -- the whole shebang
var Quiz = React.createClass({

  getInitialState: function() {
    return {
      question_count: 0,
      question_text: [
        { question: this.props.question, answer: this.props.answer }
      ],
      new_question_text: ""
    }
  },

  // this should capture the input
  handleChange: function(event) {
    this.setState({
      value: event.target.value
    });
    console.log('within the handle change function');
  },

  // on submit of button, should update counter
  handleSubmit: function(event) {
    event.preventDefault();
    var question_text = this.state.question_text.concat({
      question: this.state.value, answer: false
    });
    this.setState({
      question_text: question_text,
      question_count: this.state.question_count + 1,
      value: ""
    });
    console.log('you clicked the button', this.state.value);
  },
  render: function() {
    console.log(this.state);
    // if (this.state.question_text.length < 10) {
        return (
          <main>
            <header>
              <h2 className='para__title'>Quiz app!</h2>
            </header>
            <section>
              <div>number of times button clicked: { this.state.question_count }</div>

              <div>
                {/* Input */}
                <input type="text" value={ this.state.value } onChange={ this.handleChange } placeholder="Enter question" />

                {/* Submit Button */}
                <button onClick={ this.handleSubmit }> handleSubmit</button>
              </div>

              {/* Renders existing questions */}
              { this.state.question_text.map(function(single_question, i){
                return (
                  <li key={ i }>{ single_question.question }</li>
                )
              }) }

            </section>
          </main>
        )
      // } else {
        // return (
          // <div>
            {/* <p>whatever this is just following the notes</p> */}
          {/* </div> */}
        // )
      // }
  }
});

ReactDOM.render(
  <div>
        <Quiz/>
  </div>,
  document.getElementById('placeholder'));

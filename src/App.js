import React, { Component } from 'react';
import Usurvey from './Usurvey';
import './App.css';

let firebase = require('firebase');
let uuid = require('uuid');

let config = {
    apiKey: "AIzaSyBNiECGQsld1BMJXKVLuAGbc3Uhd4cJ81s",
    authDomain: "user-survey-743a7.firebaseapp.com",
    databaseURL: "https://user-survey-743a7.firebaseio.com",
    projectId: "user-survey-743a7",
    storageBucket: "user-survey-743a7.appspot.com",
    messagingSenderId: "914265762147"
  };
  firebase.initializeApp(config);


class App extends Component {

  constructor(props){
    super(props);
    this.state = {uid : uuid.v1(), userName : '',
                  answers : {answerOne : '',
                             answerTwo : '',
                            answerThree : ''},
                  isSubmitted : false
              };
    this.formSubmit = this.formSubmit.bind(this);
    this.answerSubmitted = this.answerSubmitted.bind(this);
    this.questionsSubmitted = this.questionsSubmitted.bind(this);
  }

  formSubmit(event){
    let userName = this.refs.name.value;
    this.setState({userName : userName}, () => {
      console.log(this.state);
    });
  }

  answerSubmitted(event){
    let answers = this.state.answers;

    if(event.target.name === 'answerOne'){
      answers.answerOne = event.target.value;
    } else if(event.target.name === 'answerTwo'){
      answers.answerTwo = event.target.value;
    } else if(event.target.name === 'answerThree'){
      answers.answerThree = event.target.value;
    }
    this.setState({answers: answers}, () => {
    console.log(this.state);
  });
  }

  questionsSubmitted(){
firebase.database().ref('userSurvey/'+this.state.uid).set({
      userName: this.state.userName,
      answers: this.state.answers
    });
    this.setState({isSubmitted: true});
  }

  render() {
    let userName;
    let questions;
    if(this.state.userName === '' && this.state.isSubmitted === false){
      userName = <div>
              <form onSubmit = {this.formSubmit}>
                <input type='text' ref='name' placeholder='Enter your name'/>
                <br />
                <button>Submit</button>
              </form>
          </div>;
      questions = '';
    } else if(this.state.userName !== '' && this.state.isSubmitted === false){
      userName = <h1>Welcome, {this.state.userName}</h1>;
      questions = <div>
                  <h2>Just some questions</h2>
                  <form onSubmit = {this.questionsSubmitted}>
                    <div>
                    <label>Which course do you prefer:</label>
                    <input type='radio' name='answerOne' value='Tech' onChange = {this.answerSubmitted}/>Tech
                    <input type='radio' name='answerOne' value='Designing' onChange = {this.answerSubmitted}/>Designing
                    <input type='radio' name='answerOne' value='Marketing' onChange = {this.answerSubmitted}/>Marketing
                    </div>

                    <div>
                    <label>You are:</label>
                    <input type='radio' name='answerTwo' value='Student' onChange = {this.answerSubmitted}/>Student
                    <input type='radio' name='answerTwo' value='Professional' onChange = {this.answerSubmitted}/>Professional
                    <input type='radio' name='answerTwo' value='Unemployed' onChange = {this.answerSubmitted}/>Unemployed
                    </div>

                    <div>
                    <label>Do you value online learning:</label>
                    <input type='radio' name='answerThree' value='Yes' onChange = {this.answerSubmitted}/>Yes
                    <input type='radio' name='answerThree' value='No' onChange = {this.answerSubmitted}/>No
                    <input type='radio' name='answerThree' value='Somewhat' onChange = {this.answerSubmitted}/>Somewhat
                    </div>
                    <button>Submit</button>
                  </form>
                </div>; }
          else if(this.state.userName !== '' && this.state.isSubmitted === true){
            userName = <h1>Thank you, {this.state.userName}</h1>;
              questions = '';
          }
    return (
      <div>
      {userName}
      {questions}
    </div>
    );
  }
}

export default App;

import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

export default class Login extends Component{
  state={
    redirect: false
  };

  handleChange=(event)=>{
    const {name,value} = event.target;

    this.setState({
      [name]:value
    })
  };

  handleSubmit=(event)=>{
    event.preventDefault();

    const {email, password} = this.state;
  
    axios({
            method: 'post',
            url:'http://localhost:3001/login',
            withCredentials: true,
            data: {email,password}
          })
          .then(res => {
            console.log(res.data);
            this.setState({
              redirect:true
            })
         }).catch(err => {
           console.log(err.message);
         })
  };
  
  render(){
    const {redirect} = this.state;

    if (redirect) {
      return <Redirect to="/dashboard"/>
    };

    return(
      <div className="testing-form">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <h3>Email</h3>
          <input type="text" name="email" onChange={this.handleChange}/>
          <h3>Password</h3>
          <input type="text" name="password" onChange={this.handleChange}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
};
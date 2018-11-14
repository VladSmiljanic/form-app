import React, {Component} from 'react';
import axios from 'axios';

export default class Login extends Component{
  state={

  };

  handleChange=(event)=>{
    const {name,value} = event.target;

    this.setState({
      [name]:value
    })
  };

  handleSubmit=(event)=>{
    event.preventDefault();

    const login = {
                email:this.state.email,
                password:this.state.password};
    
    axios.post('http://localhost:3001/register',{login})
          .then( res => {
            console.log(res)
         })
  }
  
  render(){
    return(
      <div>
        <h1>Register</h1>
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
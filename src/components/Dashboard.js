import React, {Component} from 'react';
import axios from 'axios';
import Form from './Form';

export default class Dashboard extends Component{
  state = {
    forms:[]
  }

  componentDidMount(){
    axios('http://localhost:3001/',{
      method:'get',
      withCredentials:true
    }).then( res =>{
            const data = res.data;
            console.log(data);
            this.setState({
              user: data.email
            });
          })
  }
  
  render(){
    const user = this.state.user;
    const list = this.state.forms.map((form, i) => 
      
        <h3 key={i}>{form.name}</h3>
    )

    return(
      <div>
        <h1>It's a dashboard!</h1>
        <h2>Welcome {user}</h2>
        <h3>{user}</h3>
        <Form user={user} name="poop"/>
        {list}
      </div>
    )
  }
}
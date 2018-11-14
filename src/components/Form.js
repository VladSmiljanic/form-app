import React, {Component} from 'react';
import axios from 'axios';
import Header from './Header';

export default class Form extends Component {

  state = {
    
  };

  handleChange=(event)=>{
    const {name,value} = event.target;

    this.setState({
      [name]:value
    })
  };

  handleSubmit = (event) =>{
    event.preventDefault();
    console.log('submit!');
    const form = {
      name: this.state.name,
      info: this.state.info,
      submit: "Final"
    }


    axios.post(`http://localhost:7777/addform`, { form }).then(res => {
            console.log(res);
            console.log(res.data);
          });
  }

  componentDidMount(){
    this.setState({
      name:this.props.name
    })
  }

  render() {
    const {name,info} = this.state;
    return(
      <div className="outer">
        <Header/>
        Your name is: {name}
        Your info is: {info}
        {this.props.user}
        <form className="form" onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input type="string" name="name" id="info" onChange={this.handleChange}/>
          <label>Information</label>
          <input type="string" name="info" id="info" onChange={this.handleChange}/>
          <label>Emails</label>
          <input type="string" name="email" id="info" onChange={this.handleChange}/>
          <div className="button-container">
            <button className="button-save" name="save" type="submit">Save</button>  
            <button className="button-submit" name="submit" type="submit">Submit!</button>
          </div>
        </form>
        
      </div>
    )  
  }
};
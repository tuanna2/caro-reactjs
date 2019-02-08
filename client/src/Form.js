import React from 'react';
import Button from 'components/CustomButtons/Button.jsx';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import io from 'socket.io-client';
import {Redirect} from 'react-router-dom';
const socket = io('localhost:5000');



class Form extends React.Component{
    constructor(props){
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.state={
        name:null,
        isLogin:localStorage.getItem('user')!==null? true: false
      }
    }
    handleChange(e){
      this.setState({name:e.target.value});
    }
    handleSubmit(e){
      e.preventDefault();
      if(this.state.name === null || socket.id === undefined) return;
      localStorage.setItem('user',JSON.stringify({name:this.state.name,id:socket.id}));
      this.setState({
        isLogin:true
      });
    }
    render(){
        if(this.state.isLogin)
          return <Redirect to="/room" />
        return (
          <form onSubmit={this.handleSubmit}>
              <CustomInput
                      labelText="Nhập tên của bạn"
                      inputProps={{
                        onChange:this.handleChange
                      }}
                      formControlProps={{
                          fullWidth: true
                      }}
                  />
              <Button to="/room" type="submit" color="primary">Vào Phòng</Button>
            </form>
        );
      }
  }
export default Form;
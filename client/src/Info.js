import React from 'react';
import Primary from "components/Typography/Primary.jsx";
import io from 'socket.io-client'
import {Redirect} from 'react-router-dom';

const socket = io('localhost:5000');


class Info extends React.Component{
    constructor(props){
      super(props);
      this.state={
        user:JSON.parse(localStorage.getItem('user')),
        online:[],
      }
      this.socket();
    }
    socket(){
      let user = this.state.user;
      try{
        socket.emit('user',{name:user.name,id:user.id});
      } catch(e){
        localStorage.removeItem("user");
        this.setState({
          user:null
        })
      }
      socket.on('online',online=>{
        this.setState({online:online});
      })
      socket.on("disconnect", ()=>{
        socket.emit('user',{name:user.name,id:user.id});
    });
    }
    render(){
      const user = this.state.user;
        if(user === null)
          return <Redirect to="/" />
      return (
        <div>
          <Primary>Xin chào: {user.name}</Primary>
          <Primary>ID: {user.id}</Primary>
          <br/>
          <span>Online:</span>
            {
              this.state.online.map(obj=>{
                return <div>{obj.name} {obj.id}</div> 
              })
            }
        </div>
        );
              
    }
  } 
export default Info;
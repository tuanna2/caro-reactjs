const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');


app.get('*',(req,res)=>{
    res.redirect('https://' + req.headers.host + req.url);
    // res.send('hi');
});
app.get('/',(req,res)=>{
    res.send('hi');
});
var online= [];
io.on('connection',socket=>{
    socket.on('user',user=>{
        online.push(user);
            for(i=0;i<online.length;i++){
                console.log(online[i])
                console.log(user)
                if(online[i].id===user.id) break;
                if(i==online.length-1) online.push(user);
            }
        io.emit('online',online);
        socket.on('disconnect', ()=>{
            console.log(online.findIndex(v=>v.id===socket.id));
            online.splice(online.findIndex(v=>v.name===socket.id),1);
            io.emit('online',online);
        });
    });
})

http.listen(5000);
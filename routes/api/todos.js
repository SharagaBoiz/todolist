  const mongoose = require('mongoose');
const Todo = mongoose.model('Todo');
const Room = mongoose.model('Room');
const ObjectID =require('mongodb').ObjectID;
const router = require('express').Router();
const auth = require('../auth');
const passport = require('passport');


// запрос на просмотр задач в комнате
router.get('/:id/todolist',auth.required, async(req,res)=>{
    const { payload: { id } } = req;
    createrCheck =await Room.find({creater:id});
    userCheck =await Room.find({userId:id});
    if(createrCheck.length == 0 && userCheck.length == 0 ){
      return res.status(401).json({
          message: 'Authenticate error',
      });
    }  
    else{
     const todolist= await Todo.find({roomId:req.params.id});
     if(todolist.length==0){
      return res.status(422).json({
        message: 'Todo not found',
    });
     }
      return res.status(200).json({
        todolist: todolist
    });
    }

});


// запрос на добавление задачи в комнате
router.post('/:id/todolist/add',auth.required, async (req,res)=>{
  const { payload: { id } } = req;
  createrCheck =await Room.find({creater:id});
  userCheck =await Room.find({userId:id});
  if(createrCheck.length == 0 && userCheck.length == 0 ){
    return res.status(401).json({
        message: 'Authenticate error',
    });
  }      
  const { body: { todo } } = req;
  const idRoomCheck = await Room.findOne({_id: ObjectID(req.params.id)});
    if(idRoomCheck){
      if(!todo.title) {
        return res.status(422).json({
            message: {
            title: 'Is required',
          },
        });
      }
      if((todo.title).length<6) {
        return res.status(422).json({
            message: {
              title: 'Too few letters',
            },
          });
      }
      if((todo.title).length>=21) {
        return res.status(422).json({
            message: {
              title: 'Too more letters',
            },
          });
      }

      if(!todo.desc) {
        return res.status(422).json({
            message: {
            desc: 'Is required',
          },
        });
      }
      if((todo.desc).length<5) {
        return res.status(422).json({
            message: {
              desc: 'Too few letters',
            },
          });
      }
      if((todo.desc).length>=100) {
        return res.status(422).json({
            message: {
              desc: 'Too more letters',
            },
          });
      }
      else{
           const newTodo = await new Todo({
            title: todo.title,
            desc: todo.desc,
            roomId:req.params.id
     });
     await newTodo.save();
        return res.status(200).json({
            message: 'Todo add'
        });
      }
    }
    else{
      return res.status(422).json({
        message: 'Room not found'
    });
    }
})

//запрос на изменения заголовка
router.put('/todolist/title/:id', auth.required, async (req,res, next)=>{
    const { payload: { id } } = req;
    const { body: { todo } } = req;
    createrCheck =await Room.find({creater:id});
    userCheck =await Room.find({userId:id});
    if(createrCheck.length == 0 && userCheck.length == 0 ){
      return res.status(401).json({
          message: 'Authenticate error',
      });
    }       
    const idCheck = await Todo.findOne({_id: ObjectID(req.params.id)});
    if(idCheck){
        if((todo.title).length<6) {
            return res.status(422).json({
                message: {
                  title: 'Too few letters',
                },
              });
          }
          if((todo.title).length>=30) {
            return res.status(422).json({
                message: {
                  title: 'Too more letters',
                },
              });
          }
        return  await Todo.updateOne({_id: ObjectID(req.params.id)},{$set:{title: todo.title}}),res.status(200).json({
            message: 'Todo title changed'
        });
    }
    return res.status(422).json({
        message: 'Todo not found'
    });
})
//запрос на изменения описания
router.put('/todolist/desc/:id',auth.required, async (req,res)=>{
    const { payload: { id } } = req;
    const { body: { todo } } = req;
    createrCheck =await Room.find({creater:id});
    if(createrCheck.length == 0 && userCheck.length == 0 ){
      return res.status(401).json({
          message: 'Authenticate error',
      });
    }         
    const idCheck = await Todo.findOne({_id: ObjectID(req.params.id)});
    if(idCheck){
        if((todo.desc).length<5) {
            return res.status(422).json({
                message: {
                  desc: 'Too few letters',
                },
              });
          }
          if((todo.desc).length>=100) {
            return res.status(422).json({
                message: {
                  desc: 'Too more letters',
                },
              });
          }
        return  await Todo.updateOne({_id: ObjectID(req.params.id)}, {$set:{desc: todo.desc}}),res.status(200).json({
            message: 'Todo description changed'
        });
    }
    return res.status(422).json({
        message: 'Todo not found'
    });
})
//запрос на изменения выполнен/не выполнен
router.put('/todolist/comp/:id',auth.required, async (req,res)=>{
    const { payload: { id } } = req;
    const { body: { todo } } = req;
    createrCheck =await Room.find({creater:id});
    userCheck =await Room.find({userId:id});
    if(createrCheck.length == 0 && userCheck.length == 0 ){
      return res.status(401).json({
          message: 'Authenticate error',
      });
    }         
    const idCheck = await Todo.findOne({_id: ObjectID(req.params.id)});
    if(idCheck){
        return await Todo.updateOne({_id: ObjectID(req.params.id)}, {$set:{completed: todo.completed}}),res.status(200).json({
            message: 'Todo status changed'
        });
    }
    return res.status(422).json({
        message: 'Todo not found'
    });
})
//запрос на удаление
router.delete('/todolist/delete/:id',auth.required, async (req,res)=>{
    const { payload: { id } } = req;
    createrCheck =await Room.find({creater:id});
    userCheck =await Room.find({userId:id});
    if(createrCheck.length == 0 && userCheck.length == 0 ){
      return res.status(401).json({
          message: 'Authenticate error',
      });
    }        
    const idCheck = await Todo.findOne({_id: ObjectID(req.params.id)});
    if(idCheck){
        return await Todo.deleteOne({_id: ObjectID(req.params.id)}),res.status(422).json({
            message: 'Todo delete'
        });
    }
    return res.status(422).json({
        message: 'Todos not found'
    });
 
})

module.exports = router;
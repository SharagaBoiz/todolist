const mongoose = require('mongoose');
const Room = mongoose.model('Room');
const User = mongoose.model('User');
const ObjectID =require('mongodb').ObjectID;
const router = require('express').Router();
const auth = require('../auth');
const passport = require('passport');
const bodyParser = require('body-parser');


//запрос на просмотр комнаты
router.get('/room/:id',auth.required, async (req,res)=>{
    const { payload: { id } } = req;
    userCheck =  await Room.find({userId: id});
    createrCheck = await Room.find({creater: id})
    if(userCheck || createrCheck){
      await Room.findById({_id: ObjectID(req.params.id)}).then((room)=>{
            if(!room){
                return res.status(422).json({
                    message: 'Room not found'
                });
            }
    
            return res.json({room: room});  
        });   
    }

});
//запрос на просмотр списка комнат
router.get('/roomlist',auth.required, async (req,res)=>{
  const { payload: { id } } = req;
  await Room.find({$or:[{userId: id},{creater: id}]}).then((roomlist)=>{
            if(roomlist.length==0){
                return res.status(422).json({
                    message: 'Rooms not found'
                });
            }
            return res.json({roomlist: roomlist});
          })
  
});

// запрс на созданеи комнаты
router.post('/create',auth.required, (req,res)=>{
    const { payload: { id } } = req;
    const { body: { room } } = req;
    if(!id){
      return res.status(401).json({
        message: 'Authenticate error',
    })
    }
    if(!room.name){
      return res.status(422).json({
        message: 'Room name is required',
    });
    }
    if((room.name).length<2) {
      return res.status(422).json({
          message: {
            name: 'Too few letters',
          },
        });
    }
    if((room.name).length>=50) {
      return res.status(422).json({
          message: {
            name: 'Too more letters',
          },
        });
    }
    const newRoom = new Room({
        name: room.name,
        creater: id
    });

    return res.status(200).json({
        room: newRoom
    }),
        newRoom.save();
});
// запроc на добавленеи юзера по логину 
router.put('/adduser/:id',auth.required, async(req,res)=>{
  const { payload: { id } } = req;
  const { body: { user } } = req;
    const createrCheck =await Room.findOne({creater: id});
    if(!createrCheck){
      return res.status(422).json({
        message: 'Not creator',
    });
    }
    const addUser= await User.findOne({login: user.login});
    if(!addUser){
      return res.status(422).json({
        message: 'User not found',
    });
    }
    const idRoomCheck = await Room.findOne({_id: ObjectID(req.params.id)});
    if(!idRoomCheck){
      return res.status(422).json({
        message: 'Room not found',
    });
    }
    const alreadyadd = await Room.find({userId: addUser.id});;
    if(!alreadyadd.length == 0){
      return res.status(422).json({
        message: 'User already add',
    });
    }


    await Room.updateMany({_id: ObjectID(req.params.id)},{$push:{userId: addUser.id}});
    return res.status(200).json({
        message: 'User add',
    });

});
// запрос на удаление юзера в комнате
router.delete('/deleteuser/:id',auth.required, async(req,res)=>{
  const { body: { user } } = req;
  const { payload: { id } } = req;
    const createrCheck =await Room.findOne({creater: id});
    if(!createrCheck){
      return res.status(422).json({
        message: 'Not creator',
    });
    }
    const deleteUser= await User.findOne({login: user.login});
    const idRoomCheck = await Room.findOne({_id: ObjectID(req.params.id)});

    if(!idRoomCheck){
      return res.status(422).json({
        message: 'Room not found',
    });
    }
    if(deleteUser==null){
      return res.status(422).json({
        message: 'User not found',
    });
    }
    const userCheckinroom = await Room.findOne({userId: deleteUser.id});
    if(!userCheckinroom){
      return res.status(422).json({
        message: 'User not found',
    });
    }

    await Room.updateMany({_id: ObjectID(req.params.id)},{$pull:{userId: deleteUser.id}});
    return res.status(200).json({
        message: 'User delete',
    });

});
// запрос на выход юзера из комнаты
router.delete('/leaveuser/:id',auth.required, async(req,res)=>{
  const { payload: { id } } = req;
    const idRoomCheck = await Room.findOne({_id: ObjectID(req.params.id)});
    if(!idRoomCheck){
      return res.status(422).json({
        message: 'Room not found',
    });
    }
    await Room.updateMany({_id: ObjectID(req.params.id)},{$pull:{userId: id}});
    return res.status(200).json({
        message: 'User leave room',
    });

});
// запрос на удаление комнаты создателем
router.delete('/deleteroom/:id',auth.required, async(req,res)=>{
  const { payload: { id } } = req;
  const createrCheck =await Room.findOne({creater: id});
  if(!createrCheck){
    return res.status(422).json({
      message: 'Not creator',
  });
  }
    const idRoomCheck = await Room.findOne({_id: ObjectID(req.params.id)});
    if(!idRoomCheck){
      return res.status(422).json({
        message: 'Room not found',
    });
    }
    await Room.deleteOne({_id: ObjectID(req.params.id)});
    return res.status(200).json({
        message: 'Room delete',
    });

});


module.exports = router;
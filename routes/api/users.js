//регистрация и авторизация пользователя
const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const User = mongoose.model('User');
const auth = require('../auth');
const ObjectID =require('mongodb').ObjectID;


//Запрос на регистрацию нового пользователя
router.post('/signup', auth.optional, async (req, res, next) => {
  const { body: { user } } = req;
  const oldUser = await User.findOne({login: user.login});
  if(oldUser){
    return res.status(409).json({
       message: 'Login is already exists',
     });
  }
  if(!user.login) {
    return res.status(422).json({
        message: 'Login is required',
    });
  }
  if((user.login).length<5) {
    return res.status(422).json({
      message: 'Login is to low',
  });
  }
  if((user.login).length>20) {
    return res.status(422).json({
      message: 'Login is to big',
  });
  }
  if(!user.password) {
    return res.status(422).json({
      message: 'Password is required',
  });
  }
  if((user.password).length>20) {
    return res.status(422).json({
      message: 'Password is so f*kin big',
  });
  }
  if((user.password).length<4) {
    return res.status(422).json({
      message: 'Password is so low',
  });
  }
  if((user.name).length<2) {
    return res.status(422).json({
      message: 'Name is to low',
  });
  }
  if((user.name).length>15) {
    return res.status(422).json({
      message: 'Name is to big',
  });
  }
  if((user.soname).length<3) {
    return res.status(422).json({
      message: 'Soname is to low',
  });
  }
  if((user.soname).length>20) {
    return res.status(422).json({
      message: 'Soname is to big',
  });
  }
  if(!(user.email).includes('@')) {
    return res.status(422).json({
      message: 'E-mail note found',
  });
  }

  if(!(user.email).includes('.')) {
    return res.status(422).json({
      message: 'E-mail note found',
  });
  }

  if((user.email).length<3) {
    return res.status(422).json({
      message: 'E-mail is to low',
  });
  }
  if((user.email).length>30) {
    return res.status(422).json({
      message: 'E-mail is to big',
  });
  }
  else{
    const finalUser = new User(user);
    finalUser.setPassword(user.password);
      return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
}

});

//POST login route (optional, everyone has access)
//запрос на авторизацию
router.post('/signin', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.login) {
    return res.status(422).json({
      message: 'Authenticate error',
  });
  }

  if(!user.password) {
    return res.status(422).json({
      message: 'Authenticate error',  
  });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return res.status(418).json({
        message: 'Authenticate error',
    }); 
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return res.status(418).json({
      message: 'Authenticate error',
  });
  })(req, res, next);
});

//GET current route (required, only authenticated users have access)
//запрос на получения авторизованного пользователя
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return User.findById(id)
    .then((user) => {
      if(!user) {
        return res.status(400).json({
          message: 'User not found',
      });
      }
      
      return res.json({ user: user.toAuthJSON() });
    });
});
//запрос на выход авторизованного пользователя
router.get('/signout', auth.required, (req, res, next) => {
    req.logout();
    return res.status(200).json({
      message: 'User signout',
  });
});

//запрос на удаление авторизованного пользователя
router.delete('/delete', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return User.findOneAndRemove({_id:id})
    .then((user) => {
      if(!user) {
        return res.status(400).json({
          message: 'User not found',
      });
      }
      
      return res.status(200).json({
        message: 'User delete',
    }),req.logout();
    });
});

module.exports = router;
const models = require('../models');

const { GamePost } = models;

const makeGamePost = (req, res) => {
  if (!req.body.title || !req.body.description) {
    return res.status(400).json({ error: 'We require both a Post Title and Description for a Quest.' });
  }

  const GamePostData = {
    title: req.body.title,
    poster: req.session.account._id,
    description: req.body.description,
  };

  const newGamePost = new GamePost.GamePostModel(GamePostData);

  const gamePostPromise = newGamePost.save();

  gamePostPromise.then(() => res.json({ redirect: '/board' }));

  gamePostPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This Quest Post Already Exists' });
    }

    return res.status(400).json({ error: 'An Error Occurred' });
  });

  return gamePostPromise;
};

const questBoard = (req, res) => {
  GamePost.GamePostModel.find((err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred.' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), posts: docs });
  });
};

const getPosts = (request, response) => {
  const res = response;

  return GamePost.GamePostModel.find((err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error has occurred retrieving Game Posts.' });
    }

    return res.json({ posts: docs });
  });
};

module.exports.postQuest = makeGamePost;
module.exports.getPosts = getPosts;
module.exports.questBoardPage = questBoard;

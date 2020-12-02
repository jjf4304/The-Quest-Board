const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const login = (request, response) => {
  const req = request;
  const res = response;

  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return res.status(400).json({ error: 'All fields are required Quest Giver.' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(400).json({ error: 'Wrong Username or Password' });
    }

    req.session.account = Account.AccountModel.toAPI(account);

    return res.json({ redirect: '/board' });
  });
};

const signup = (request, response) => {
  const req = request;
  const res = response;

  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'Passwords do not match.' });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();
    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      return res.json({ redirect: '/board' });
    });

    savePromise.catch((err) => {
      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already exists.' });
      }

      return res.status(400).json({ error: 'An error occurred' });
    });
  });
};

const upgradeToPremium = (request, response) => {
  const req = request;
  const res = response;

  return Account.updateOne({ _id: req.session.account._id },
    { premiumMember: true }, (err, docs) => {
      if (err) {
        return res.json({ error: 'An error has occurred' });
      }
      console.log(docs);
      return res.json({ redirect: '/board' });
    });

  // get the document by it's id, then set premium to true, then save and update current login
  // return Account.findById(req.session.account._id, (err, docs) => {
  // if (err || !docs) {
  //     return res.status(400).json({ error: 'An Error has occurred' });
  // }

  // docs.premiumMember = true;

  // const savePromise = docs.save();

  // // Hopeful success
  // savePromise.then(() => {
  //     req.session.account = Account.AccountModel.toAPI(docs);
  //     // Change to a success/thank you screen?
  //     return res.json({ redirect: '/board' });
  // });

  // //
  // savePromise.catch((err) => res.status(400).json({
  // error: 'An error occurred in becoming premium' }));
  // });

  // return Account.AccountModel.becomePremium(req.session.account.username, (docs) =>{

  //     docs.premiumMember = true;
  // })
};

const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfToken = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfToken);
};

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.upgradeToPremium = upgradeToPremium;
module.exports.getToken = getToken;

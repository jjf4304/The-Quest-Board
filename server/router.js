const router = (app) => {
  // app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  // app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  // app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  // app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  // app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  // app.get('/maker', mid.requiresLogin, controllers.Domo.makerPage);
  // app.post('/maker', mid.requiresLogin, controllers.Domo.make);
  // app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  // app.get('/getDomos', mid.requiresLogin, controllers.Domo.getDomos);

  // Catch 404?
  app.use((req, res) => {
    res.status(404);
    res.redirect('/login');
  });
};

module.exports = router;

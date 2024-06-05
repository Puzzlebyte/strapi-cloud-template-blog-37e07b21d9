module.exports = {
  routes: [
    {
     method: 'POST',
     path: '/voting',
     handler: 'voting.vote',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/voting',
      handler: 'voting.getVote',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
     method: 'POST',
     path: '/voting',
     handler: 'voting.vote',
     config: {
       policies: [],
       middlewares: [],
     },
    },
    {
      method: 'POST',
      path: '/voting/switch',
      handler: 'voting.switchVote',
      config: {
        policies: [],
        middlewares: [],
      },
     },
  ],
};

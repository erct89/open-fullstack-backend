export const mock = {
  DB_INTIALIZED: [
    {
      name: 'Alexa Feeney',
      userName: 'afeeney',
      password: 'Robust'
    },
    {
      name: 'Naomi Torphy',
      userName: 'naotir',
      password: 'Incredible'
    }
  ],
  GET: {
    RESPONSE: {
      SUCESS: [
        {
          name: 'Naomi Torphy',
          userName: 'naotir',
          blogs: [],
          notes: []
        },
        {
          name: 'Alexa Feeney',
          userName: 'afeeney',
          blogs: [],
          notes: []
        }
      ]
    }
  },
  POST: {
    REQUEST: {
      BODY: {
        SUCESS: {
          name: 'Jose García García',
          userName: 'JoseGG',
          password: 'qwerty'
        }
      }
    },
    RESPONSE: {
      BODY: {
        SUCESS: {
          name: 'Jose García García',
          userName: 'JoseGG',
          blogs: [],
          notes: []
        }
      }
    }
  }
};

export default mock;
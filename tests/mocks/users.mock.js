export const mock = {
  DB_INTIALIZED: [
    {
      email: 'alexa_feeney@gmail.com',
      name: 'Alexa Feeney',
      userName: 'afeeney',
      password: 'Robust'
    },
    {
      email: 'naomi_torphy@hotmail.com',
      name: 'Naomi Torphy',
      userName: 'naotir',
      password: 'Incredible'
    }
  ],
  GET: {
    RESPONSE: {
      SUCESS: [
        {
          email: 'naomi_torphy@hotmail.com',
          name: 'Naomi Torphy',
          userName: 'naotir',
          blogs: [],
          notes: []
        },
        {
          email: 'alexa_feeney@gmail.com',
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
          email: 'jose_gg@gmail.com',
          name: 'Jose García García',
          userName: 'JoseGG',
          password: 'qwerty'
        }
      }
    },
    RESPONSE: {
      BODY: {
        SUCESS: {
          email: 'jose_gg@gmail.com',
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
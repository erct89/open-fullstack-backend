export const mock = {
  DB_INTIALIZED: [
    {
      email: 'alexa_feeney@gmail.com',
      name: 'Alexa Feeney',
      password: 'Robust'
    },
    {
      email: 'naomi_torphy@hotmail.com',
      name: 'Naomi Torphy',
      password: 'Incredible'
    }
  ],
  GET: {
    RESPONSE: {
      SUCESS: [
        {
          email: 'naomi_torphy@hotmail.com',
          name: 'Naomi Torphy',
          blogs: [],
          notes: []
        },
        {
          email: 'alexa_feeney@gmail.com',
          name: 'Alexa Feeney',
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
          password: 'berkshire'
        }
      }
    },
    RESPONSE: {
      BODY: {
        SUCESS: {
          email: 'jose_gg@gmail.com',
          name: 'Jose García García',
          blogs: [],
          notes: []
        }
      }
    },
    getUserWithout: (user, key) => {
      const newUser = { ...user };

      delete newUser[key];

      return newUser;
    }
  }
};

export default mock;
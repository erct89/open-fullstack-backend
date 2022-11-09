export const mocks = {
  INITIAL_BLOGS: [{
    title: 'Titulo 01',
    author: 'Perico De Los Palotes',
    url: 'https://www.emilioag.dev/api/blogs/titlio_01'
  },
  {
    title: 'Titulo 02',
    author: 'Maria Garcia Garcia',
    url: 'https://www.emilioag.dev/api/blogs/titulo_02'
  },
  {
    title: 'Titulo 03',
    author: 'Francisco Lopez Garcia',
    url: 'https://www.emilioag.dev/api/blogs/titulo_03'
  }],
  GET: {
    RESPONSE_SUCESS: [{
      author: 'Perico De Los Palotes',
      create: '2022-11-06T11:37:34.691Z',
      likes: 0,
      title: 'Titulo 01',
      uid: '63679c7ec5a5d9cdf7c27a9d',
      url: 'https://www.emilioag.dev/api/blogs/titlio_01'
    }, {
      author: 'Maria Garcia Garcia',
      create: '2022-11-06T11:37:34.691Z',
      likes: 0,
      title: 'Titulo 02',
      uid: '63679c7ec5a5d9cdf7c27a9e',
      url: 'https://www.emilioag.dev/api/blogs/titulo_02'
    }, {
      author: 'Francisco Lopez Garcia',
      create: '2022-11-06T11:37:34.692Z',
      likes: 0,
      title: 'Titulo 03',
      uid: '63679c7ec5a5d9cdf7c27a9f',
      url: 'https://www.emilioag.dev/api/blogs/titulo_03'
    }]
  },
  POST: {
    BODY_SUCESS: {
      title: 'Roma soy yo',
      author: 'Santiago Posteguillo',
      url: 'https://www.santiagoposteguillo.es/'
    },
    BODY_EMPTY: {},
    BODY_WITHOUT_TITLE: {
      author: 'Santiago Posteguillo',
      url: 'https://www.santiagoposteguillo.es/'
    },
  }
};

export default mocks;
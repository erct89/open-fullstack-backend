
export const BLOGS_WITH_ONE = [
  {
    author: 'Emilio AG',
    title: 'Noticias de futbol',
    url: 'https://www.as.com/',
    likes: 1
  },
];

export const MOST_BLOGS_WITH_ONE = {
  author: 'Emilio AG',
  blogs: 1
};

export const MOST_LIKES_WITH_ONE = {
  author: 'Emilio AG',
  likes: 1
};

export const BLOGS_WITH_MANY = [
  {
    author: 'Emilio AG',
    title: 'Noticias de futbol',
    url: 'https://www.as.com/',
    likes: 1
  },
  {
    author: 'Emilio AG',
    title: 'Noticias de futbol',
    url: 'https://www.as.com/',
    likes: 1
  },
  {
    author: 'Emilio AG',
    title: 'Noticias de futbol',
    url: 'https://www.as.com/',
    likes: 1
  },
];

export const MOST_BLOGS_WITH_MANY = {
  author: 'Emilio AG',
  blogs: 3
};

export const MOST_LIKES_WITH_MANY = {
  author: 'Emilio AG',
  blogs: 3
};

export const BLOGS_WITH_MANY_SAME = [...BLOGS_WITH_MANY];

export const BLOGS_WITH_MANY_DIFF = [
  {
    author: 'Emilio AG',
    title: 'Noticias de futbol',
    url: 'https://www.as.com/',
    likes: 1
  },
  {
    author: 'Emilio AG',
    title: 'Noticias de futbol',
    url: 'https://www.marca.com/',
    likes: 5
  },
  {
    author: 'INMA AG',
    title: 'Noticias de futbol',
    url: 'https://www.sport.com/',
    likes: 3
  },
];

const MOST_BLOGS_WITH_MANY_DIFF = {
  author: 'Emilio AG',
  blogs: 2
};

const MOST_LIKES_WITH_MANY_DIFF = {
  author: 'Emilio AG',
  likes: 6
};


export default {
  BLOGS_WITH_ONE,
  MOST_BLOGS_WITH_ONE,
  MOST_LIKES_WITH_ONE,
  BLOGS_WITH_MANY,
  MOST_BLOGS_WITH_MANY,
  MOST_LIKES_WITH_MANY,
  BLOGS_WITH_MANY_DIFF,
  MOST_BLOGS_WITH_MANY_DIFF,
  MOST_LIKES_WITH_MANY_DIFF,
  BLOGS_WITH_MANY_SAME,
};
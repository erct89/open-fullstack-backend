
export const dummy = () => {
  return 1;
};

/**
 * Calculate total likes of blog list.
 * @param {[Blogs]} blogs
 * @returns {Number}
 */
export const totalLikes = (blogs) => {
  return (Array.isArray(blogs) && blogs.length)
    ? blogs.reduce((acc, { likes }) => acc + likes, 0)
    : 0;
};

/**
 * Get favorite blog or blog with more likes.
 * @param {[Blog]} blogs
 * @returns {Blog}
 */
export const favoriteBlog = (blogs) => {
  return (Array.isArray(blogs) && blogs.length)
    ? blogs.reduce((acc, blog) => { return acc.likes >= blog.likes ? acc : blog;})
    : undefined;
};

/**
 * Generate overview of blogs list
 * @param {[Blog]}} blogs
 * @returns {Object}
 */
export const generateOverviewBlogs = blogs => {
  if (!blogs?.length) return;

  return blogs.reduce((acc, blog) => {
    const { author } = blog;
    const authorOverciew = acc[author] || { author, likes: 0, blogs: [] };

    acc[author] = {
      author: authorOverciew.author,
      likes: authorOverciew.likes + blog.likes,
      blogs: [...authorOverciew.blogs, blog]
    };

    return acc;
  }, {});
};

/**
 * Retorna el author con mas blogs escritos.
 * @param {[Blog]} blogs
 * @returns {Blog}
 */
export const mostBlogs = blogs => {
  const blogsOverview = generateOverviewBlogs(blogs);

  if (!blogsOverview) return;

  return Object.values(blogsOverview).map(({ author, blogs }) => ({ author, blogs: blogs.length }))
    .sort((overviewFirst, overviewSecond) => overviewSecond.blogs - overviewFirst.blogs)[0];
};

/**
 * Retorna el author con mas likes.
 * @param {[Blog]} blogs
 * @returns {Blog}
 */
export const mostLikes = blogs => {
  const blogsOverview = generateOverviewBlogs(blogs);

  if (!blogsOverview) return;

  return Object.values(blogsOverview)
    .map(({ author, likes }) => ({ author, likes }))
    .sort((firstBlogOverview, SecondBlogOverview) => SecondBlogOverview.likes - firstBlogOverview.likes)[0];
};

export default {
  dummy,
  favoriteBlog,
  mostBlogs,
  totalLikes
};


import { dummy, favoriteBlog, mostBlogs, mostLikes, totalLikes } from '../src/utils/list_helper.js';
import Mocks from './mocks/list_helpers.mock.js';

describe('Suite list helpers', () => {

  describe('Call dummy', () => {

    test('Get array of blogs and return 1', () => {
      const blogs = [];
      const result = dummy(blogs);

      expect(result).toBe(1);
    });

  });

  describe('Call totalLikes', () => {

    test('of empty params return zero', () => {
      const result = totalLikes();

      expect(result).toBe(0);
    });

    test('when list has only one blog, equals the likes that', () => {
      const result = totalLikes(Mocks.BLOGS_WITH_ONE);

      expect(result).toBe(Mocks.BLOGS_WITH_ONE[0].likes);
    });

    test('of a bigger list is calculated right', () => {
      const result = totalLikes(Mocks.BLOGS_WITH_MANY);

      expect(result).toBe(3);
    });

  });

  describe('Call favoriteBlog', () => {

    test('of empty params return undefined', () => {
      const result = favoriteBlog();

      expect(result).toBe(undefined);
    });

    test('when list has only one blog, equals same blog', () => {
      const result = favoriteBlog(Mocks.BLOGS_WITH_ONE);

      expect(result).toEqual(Mocks.BLOGS_WITH_ONE[0]);
    });

    test('when list has many blogs, and all has same likes return first', () => {
      const result = favoriteBlog(Mocks.BLOGS_WITH_MANY_SAME);

      expect(result).toEqual(Mocks.BLOGS_WITH_MANY[0]);
    });

    test('when list has many blogs, and all has diff likes return first', () => {
      const result = favoriteBlog(Mocks.BLOGS_WITH_MANY_DIFF);

      expect(result).toEqual(Mocks.BLOGS_WITH_MANY_DIFF[1]);
    });

  });

  describe('Call mostBlogs', () => {

    test('of empty params, return undefined', () => {
      const result = mostBlogs();
      expect(result).toBe(undefined);
    });

    test('when list of blogs has only one blog, equals same authod', () => {
      const result = mostBlogs(Mocks.BLOGS_WITH_ONE);

      expect(result).toEqual(Mocks.MOST_BLOGS_WITH_ONE);
    });

    test('when list of blogs has many blogs', () => {
      const result = mostBlogs(Mocks.BLOGS_WITH_MANY_DIFF);

      expect(result).toEqual(Mocks.MOST_BLOGS_WITH_MANY_DIFF);
    });

  });

  describe('Call mostLikes', () => {

    test('of empty params, return undefined', () => {
      const result = mostLikes();
      expect(result).toBe(undefined);
    });

    test('when list of blogs has only one blog, equals same authod', () => {
      const result = mostLikes(Mocks.BLOGS_WITH_ONE);

      expect(result).toEqual(Mocks.MOST_LIKES_WITH_ONE);
    });

    test('when list of blogs has many blogs', () => {
      const result = mostLikes(Mocks.BLOGS_WITH_MANY_DIFF);

      expect(result).toEqual(Mocks.MOST_LIKES_WITH_MANY_DIFF);
    });

  });
});

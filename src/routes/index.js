import blogsRoutes from './blogs.routes.js';
import contactsRoutes from './contacts.routes.js';
import notesRoutes from './notes.routes.js';
import searchRoutes from './search.routes.js';
import usersRoutes from './users.routes.js';
import loginRoutes from './login.routes.js';

export const routes = {
  blogs: blogsRoutes,
  contacts: contactsRoutes,
  login: loginRoutes,
  notes: notesRoutes,
  search: searchRoutes,
  users: usersRoutes
};

export default routes;
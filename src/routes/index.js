import blogsRoutes from './blogs.routes.js';
import contactsRoutes from './contacts.routes.js';
import notesRoutes from './notes.routes.js';
import searchRoutes from './search.routes.js';

export const routes = {
  notes: notesRoutes,
  contacts: contactsRoutes,
  search: searchRoutes,
  blogs: blogsRoutes,
};

export default routes;
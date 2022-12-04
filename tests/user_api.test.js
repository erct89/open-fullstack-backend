import bcrypt from 'bcrypt';
import User from '../src/models/user.model';

describe('Suite User api', () => {
  beforeEach(async() => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ name: '', userName: '', passwordHash});
  });
});
import User from '../models/user.model.js';

export const validateUniqueUser = key => async(value) => {
  const findUserFor = async({ key, value }) => !!key && !!value && await User.findOne({ [key]: value });
  const user = await findUserFor({ key, value });

  if (user) {
    throw new Error('User invalid');
  }

  return true;
};

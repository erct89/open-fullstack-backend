import User from '../../src/models/user.model.js';

// TODO: Añadir usuarios si es preciso.
export const userReset = async () => await User.deleteMany({});
export const userInitialize = async () => {};
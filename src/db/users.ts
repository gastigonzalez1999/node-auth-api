import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();

export const getUserByEmail = (email: string) => UserModel.findOne({ email });

export const getUserById = (id: string) => UserModel.findById(id);

export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });

export const updateUserById = (id: string, body: Record<string, any>) => UserModel.findByIdAndUpdate(id, body);

export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
  'authentication.sessionToken': sessionToken,
});

export const createUser = (body: Record<string, any>) => new UserModel(body)
  .save().then((user) => user.toObject());

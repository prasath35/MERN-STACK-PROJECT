import User from '../models/user.js';

export async function getUsers(req, res, next) {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function getUser(req, res, next) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function createUser(req, res, next) {
  try {
    const { name, email, profileImage = '', clerkId } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const existingUser = clerkId ? await User.findOne({ clerkId }) : null;
    if (existingUser) {
      return res.status(409).json({ error: 'A user with this Clerk ID already exists' });
    }

    const user = await User.create({ name, email, profileImage, clerkId });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export async function syncUser(req, res, next) {
  try {
    const { name, email, profileImage = '', clerkId } = req.body;

    if (!clerkId || !email || !name) {
      return res.status(400).json({ error: 'clerkId, name and email are required' });
    }

    const user = await User.findOneAndUpdate(
      { clerkId },
      { name, email, profileImage },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export async function updateUser(req, res, next) {
  try {
    const { id } = req.params;
    const { name, email, profileImage } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { name, email, profileImage },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
}

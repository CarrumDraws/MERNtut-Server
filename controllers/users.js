import User from "../models/User.js";

// READ
// Returns { User } from UserId
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id); // findById is a MongoDB function
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Returns [{ friends }] Data
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id); // findById is a MongoDB function
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          occupation,
          location,
          picturePath,
        };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// UPDATE : Adds/Removes Friends + Updates MongoDB
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id); // findById is a MongoDB function
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      // Remove Friend
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      // Add Friend
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save(); // save is a MongoDB function
    await friend.save();

    // Format Your Friends list...
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends); // ...and send it back
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

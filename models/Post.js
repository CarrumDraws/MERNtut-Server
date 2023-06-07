import mongoose from "mongoose";

// Note: __id is automatically added!
const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    userPicturePath: String,
    picturePath: String,
    likes: {
      // MongoDB uses Maps instead of Objects
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;

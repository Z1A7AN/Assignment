import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { HttpStatusCode } from "../constants/HttpStatusCode.js";
import { ApiMessages } from "../constants/ApiMessages.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

const addUser = asyncHandler(async (req, res) => {
  const { username, score = 0 } = req.body;

  if (!username) {
    throw new ApiError(HttpStatusCode.bad_request, ApiMessages.MISSING_FIELDS);
  }

  const user = await User.findOne({ username });
  const url = await uploadOnCloudinary(username, score);

  if (!url) {
    throw new ApiError(
      HttpStatusCode.internal_server_error,
      ApiMessages.IMAGE_CREATION_ERROR
    );
  }

  if (user) {
    user.score = score;
    await user.save();
    return res.status(HttpStatusCode.ok).json(
      new ApiResponse(
        HttpStatusCode.ok,
        {
          username: user.username,
          score: user.score,
          imageUrl: url,
        },
        ApiMessages.USER_ALREADY_EXISTS
      )
    );
  }

  user = await User.create({ username, score });

  const response = {
    username: user.username,
    score: user.score,
    imageUrl: url,
  };

  return res
    .status(HttpStatusCode.created)
    .json(
      new ApiResponse(HttpStatusCode.created, response, ApiMessages.SUCCESS)
    );
});

const getUserByUsername = asyncHandler(async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ username });

  if (!user) {
    throw new ApiError(HttpStatusCode.not_found, ApiMessages.USER_NOT_FOUND);
  }

  return res
    .status(HttpStatusCode.ok)
    .json(new ApiResponse(HttpStatusCode.ok, user, ApiMessages.SUCCESS));
});

export { addUser, getUserByUsername };

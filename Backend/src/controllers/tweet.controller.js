import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../Models/tweet.model.js";
import { User } from "../Models/user.model.js";
import { ApiError } from "../utils/APIerror.js";
import { ApiResponse } from "../utils/APIresponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
  //TODO: create tweet
  const { content } = req.body;

  if (!content) {
    throw new ApiError(401, "Write tweet please");
  }

  const tweet = await Tweet.create({
    content,
    owner: req.user._id,
  });

  if (!tweet) {
    throw new ApiError(401, "Error publishing tweet");
  }

  res
    .status(201)
    .json(new ApiResponse(200, tweet, "Tweet published successfully"));
});

const getUserTweets = asyncHandler(async (req, res) => {
  // TODO: get user tweets
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(400, "Enter userId please");
  }

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Enter valid userId");
  }

  const tweets = await Tweet.find({ owner: userId });

  if (!tweets || tweets.length < 1) {
    throw new ApiError(400, "No tweet found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, tweets, "tweets fetched successfully"));
});

const updateTweet = asyncHandler(async (req, res) => {
  //TODO: update tweet
  const { tweetId } = req.params;
  const { content } = req.body;

  if (!content) {
    throw new ApiError(400, "Enter tweet statement please");
  }

  if (!tweetId) {
    throw new ApiError(400, "Enter tweetId please");
  }

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Enter valid tweetId");
  }

  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    throw new ApiError(400, "no tweet found with this tweetId");
  }

  tweet.content = content;

  const updatedTweet = await tweet.save({ validateBeforeSave: false });

  if (!updatedTweet) {
    throw new ApiError(400, "tweet not updated");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedTweet, "TweetUpdatedSuccessFully"));
});

const deleteTweet = asyncHandler(async (req, res) => {
  //TODO: delete tweet
  const { tweetId } = req.params;

  if (!tweetId) {
    throw new ApiError(400, "Enter tweetId please");
  }

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Enter valid tweetId");
  }

  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    throw new ApiError(400, "no tweet found with this tweetId");
  }

  const result = await Tweet.findByIdAndDelete(tweetId);

  if (!result) {
    throw new ApiError(400, "tweet not deleted");
  }

  res
    .status(200)
    .json(new ApiResponse(200, result, "Tweet Deteled SuccessFully"));
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };

import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../Models/user.model.js";
import { Subscription } from "../Models/subscription.model.js";
import { ApiError } from "../utils/APIerror.js";
import { ApiResponse } from "../utils/APIresponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  // TODO: toggle subscription
  if (!(channelId && isValidObjectId(channelId))) {
    throw new ApiError(400, "Channel does not exist");
  }

  const channelExists = await Subscription.findOne({ channel: channelId });

  if (!channelExists) {
    throw new ApiError(400, "Channel does not exist");
  }

  const isSubscribed = await Subscription.findOne(
    { channel: channelId },
    { subscriber: req.user._id }
  );

  if (isSubscribed) {
    const unSubscribe = await Subscription.findByIdAndDelete(isSubscribed._id);

    if (!unSubscribe) {
      throw new ApiError(400, "Unable to unsubscribe");
    }

    res
      .status(200)
      .json(new ApiResponse(200, unSubscribe, "Unsubscribed Successfully"));
  } else {
    const Subscribe = await Subscription.create({
      subscriber: req.user._id,
      channel: channelId,
    });

    if (!Subscribe) {
      throw new ApiError(400, "Unable to subscribe");
    }

    res
      .status(200)
      .json(new ApiResponse(200, Subscribe, "subscribed Successfully"));
  }
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };

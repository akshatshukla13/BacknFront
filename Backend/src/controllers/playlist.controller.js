import mongoose, { isValidObjectId } from "mongoose";
import { Playlist } from "../Models/playlist.model.js";
import { Video } from "../Models/video.model.js";
import { ApiError } from "../utils/APIerror.js";
import { ApiResponse } from "../utils/APIresponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../Models/user.model.js";

const createPlaylist = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;

  //TODO: create playlist

  if (!(name && description)) {
    throw new ApiError(400, "name and description required");
  }

  const playlist = await Playlist.create({
    name,
    description,
    owner: req.user._id,
  });

  if (!playlist) {
    throw new ApiError(400, "Unable to create playlist");
  }

  res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist created successfully"));
});

const getUserPlaylists = AsyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(200, "userId required");
  }

  if (!isValidObjectId(userId)) {
    throw new ApiError(200, "enter valid userId");
  }

  const userExists = await User.findById(userId);

  if (!userExists) {
    throw new ApiError(200, "user with this userId do not exists");
  }

  const playlistExists = await User.find({ owner: userId });

  if (playlistExists.length < 1) {
    throw new ApiError(200, "playlist not available");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, playlistExists, "Playlist fetched successfully")
    );
  //TODO: get user playlists
});

const getPlaylistById = AsyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  //TODO: get playlist by id

  if (!playlistId) {
    throw new ApiError(200, "playlistId required");
  }

  if (!isValidObjectId(playlistId)) {
    throw new ApiError(200, "enter valid playlistId");
  }

  const playlistExists = await Playlist.findOne({ _id: playlistId });

  if (!playlistExists) {
    throw new ApiError(200, "playlist not available");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, playlistExists, "Playlist fetched successfully")
    );
});

const addVideoToPlaylist = AsyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  if (!playlistId) {
    throw new ApiError(200, "playlistId required");
  }

  if (!isValidObjectId(playlistId)) {
    throw new ApiError(200, "enter valid playlistId");
  }

  const playlistExists = await Playlist.findOne({ _id: playlistId });

  if (!playlistExists) {
    throw new ApiError(200, "playlist not available");
  }

  if (!videoId) {
    throw new ApiError(200, "videoId required");
  }

  if (!isValidObjectId(videoId)) {
    throw new ApiError(200, "enter valid videoId");
  }

  const videoExists = await Video.findOne({ _id: videoId });

  if (!videoExists) {
    throw new ApiError(200, "video not available");
  }

  const videoAddedToPlaylist = Playlist.findByIdAndUpdate(playlistId, {
    $set: {
      videos: videoExists._id,
    },
  });

  if (!videoAddedToPlaylist) {
    throw new ApiError(200, "unable to add, video not added to playlist");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        videoAddedToPlaylist,
        "video added to playlist successfully"
      )
    );
});

const removeVideoFromPlaylist = AsyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  // TODO: remove video from playlist
  if (
    !(
      playlistId &&
      videoId &&
      isValidObjectId(playlistId) &&
      isValidObjectId(videoId)
    )
  ) {
    throw new ApiError(401, "Enter valid playlistId and videoId");
  }

  const playlistExists = await Playlist.findById(playlistId);

  if (!playlistExists) {
    throw new ApiError(401, "playlist with this playlistId does not exist");
  }

  const videoExists = await Video.findById(videoId);

  if (!videoExists) {
    throw new ApiError(401, "video with this videoId does not exist");
  }

  // now check if video exist in playlist and delete the video from the playlist
});

const deletePlaylist = AsyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  // TODO: delete playlist
  if (!(playlistId && isValidObjectId(playlistId))) {
    throw new ApiError(401, "Give valid playlistId");
  }

  const playlistExists = await Playlist.findById(playlistId);

  if (!playlistExists) {
    throw new ApiError(401, "No playlist exist with this playlistId");
  }

  const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId);

  if (!deletedPlaylist) {
    throw new ApiError(401, "Unable to delete playlist");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, deletePlaylist, "Playlist deleted successfully")
    );
});

const updatePlaylist = AsyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
  //TODO: update playlist
  if (!(name && description)) {
    throw new ApiError(401, "Give name and description");
  }

  if (!(playlistId && isValidObjectId(playlistId))) {
    throw new ApiError(401, "Give valid playlistId");
  }

  const playlistExists = await Playlist.findById(playlistId);

  if (!playlistExists) {
    throw new ApiError(401, "No playlist exist with this playlistId");
  }

  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      $set: {
        name,
        description,
      },
    },

    {
      new: true,
    }
  );

  if (!updatedPlaylist) {
    throw new ApiError(401, "unable to update playlistId");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, updatePlaylist, "Playlist updated successfully")
    );
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};

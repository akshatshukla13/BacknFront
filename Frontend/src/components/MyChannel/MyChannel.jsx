import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UploadVideoPopout from "./UploadPopOut/UploadVideoPopout.jsx";
import { useDispatch, useSelector } from "react-redux";
import { toggleVis } from "@/features/MyChannel/visibilitySlice.js";

function MyChannel({ Compo }) {
  const { username } = useParams();

  const dispatch = useDispatch();
  const visible = useSelector((state) => state.vis.visibility);

  // Step 3: Create a function to toggle visibility
  const changeVisibility = () => {
    dispatch(toggleVis());
  };

  const navigate = useNavigate();

  return (
    <>
      <section class="relative bg-[#121212] text-white w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        <div class="relative min-h-[150px] w-full pt-[16.28%]">
          <div class="absolute inset-0 overflow-hidden">
            <img
              src="https://images.pexels.com/photos/1092424/pexels-photo-1092424.jpeg?auto=compress"
              alt="cover-photo"
            />
          </div>
        </div>
        <div class="px-4 pb-4">
          <div class="flex flex-wrap gap-4 pb-4 pt-6">
            <span class="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
              <img
                src="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Channel"
                class="h-full w-full"
              />
            </span>
            <div class="mr-auto inline-block">
              <h1 class="font-bolg text-xl">React Patterns</h1>
              <p class="text-sm text-gray-400">@reactpatterns</p>
              <p class="text-sm text-gray-400">
                600k Subscribers · 220 Subscribed
              </p>
            </div>
            <div class="flex p-3">
              <button class="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-5 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
                <span class="inline-block w-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    ></path>
                  </svg>
                </span>
                Edit
              </button>
              <button
                onClick={changeVisibility}
                class="mx-5 group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
              >
                <span class="inline-block w-5"></span>
                Upload
              </button>
            </div>
          </div>
          <ul class="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
            <li class="w-full">
              <button
                onClick={() => {
                  navigate("/@/" + username + "/videos");
                }}
                class="w-full border-b-2 border-[#ae7aff] bg-white px-3 py-1.5 text-[#ae7aff]"
              >
                Videos
              </button>
            </li>
            <li class="w-full">
              <button
                onClick={() => {
                  navigate("/@/" + username + "/playlist");
                }}
                class="w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400"
              >
                Playlist
              </button>
            </li>
            <li class="w-full">
              <button
                onClick={() => {
                  navigate("/@/" + username + "/tweet");
                }}
                class="w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400"
              >
                Tweets
              </button>
            </li>
            <li class="w-full">
              <button
                onClick={() => {
                  navigate("/@/" + username + "/subscribed");
                }}
                class="w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400"
              >
                Subscribed
              </button>
            </li>
          </ul>
          <Compo />
        </div>
        {/* here upload */}
        {visible && <UploadVideoPopout />}
      </section>
    </>
  );
}

export default MyChannel;

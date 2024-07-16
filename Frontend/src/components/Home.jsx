import React from "react";


function Home() {


  return (

    <div class="h-screen w-full justify-center overflow-y-auto flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)] bg-[#121212] text-white">

      <section class=" pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        <div class="flex h-full items-center justify-center">
          <div class="w-full max-w-sm text-center">
            <p class="mb-3 w-full">
              <span class="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  class="w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                  ></path>
                </svg>
              </span>
            </p>
            <h5 class="mb-2 font-semibold">No videos available</h5>
            <p>
              There are no videos here available. Please try to search some
              thing else.
            </p>
          </div>
        </div>
      </section>
    </div>

  );
}

export default Home;

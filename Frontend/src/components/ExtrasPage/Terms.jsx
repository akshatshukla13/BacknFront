import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "@/features/User/userSlice.js";

function Terms() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDetails());
    console.log("called");
  }, [])


  const state = useSelector((state) => state.user);
  console.log(state);

  return (
    <>
      <div>hii akshat</div>
      <button
        onClick={(e) => {

        }}
      >
        click
      </button>

      {state.isLoading && <div>Loading...</div>}

      {state.isError && <div>Error...</div>}

      {state.data && <div>{state.data.userName}</div>}
    </>
  );
}

export default Terms;

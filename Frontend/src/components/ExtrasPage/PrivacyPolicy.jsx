import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserChannelDetails } from "@/features/SLICES/channel.slice"; // Adjust the import path as needed

const PrivacyPolicy = () => {
  const dispatch = useDispatch();
 

  useEffect(() => {
    dispatch(fetchUserChannelDetails());
  }, []);

  const { data, isLoading, isError } = useSelector((state) => state.channel);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading channel details.</div>;
  }

  

  return (
    <div>
      <h1>Privacy Policy</h1>
      {data ? (
        <div>
          <p>{JSON.stringify(data)}</p>
        </div>
      ) : (
        <div>No data available</div>
      )}
      <h1>hii</h1>
     
    </div>
  );
};

export default PrivacyPolicy;

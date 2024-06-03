const AsyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
};


export default AsyncHandler


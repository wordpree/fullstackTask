const hanldeError = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
    next();
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export default hanldeError;

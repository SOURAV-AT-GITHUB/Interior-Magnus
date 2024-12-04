function checkPortfolioCategory(req, res, next) {
  const { category } = req.params;
  if (
    category !== "end-to-end-offerings" &&
    category !== "modular-kitchen" &&
    category !== "living-room" &&
    category !== "wardrob"
  ) {
    res.status(400).json({ message: `${category} is not a valid category` });
  } else {
    next();
  }
}

module.exports = checkPortfolioCategory;

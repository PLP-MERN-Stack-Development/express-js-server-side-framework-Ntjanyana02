export default function auth(req, res, next) {
  const key = req.header("x-api-key");
  if (!process.env.API_KEY) {
    console.warn("⚠️  No API_KEY set.");
    return next();
  }
  if (key === process.env.API_KEY) return next();
  res.status(401).json({ error: "Unauthorized" });
}
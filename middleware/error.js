export default function errorHandler(err, _req, res, _next) {
  console.error("❌", err);
  res.status(err.status || 500).json({ error: err.name || "Error", message: err.message || "Server error" });
}
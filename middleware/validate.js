export function validateProduct(req, res, next) {
  const { name, description, price, category, inStock } = req.body;
  const errors = [];
  if (!name || typeof name !== "string") errors.push("name required");
  if (typeof description !== "string") errors.push("description must be string");
  if (typeof price !== "number") errors.push("price must be number");
  if (!category || typeof category !== "string") errors.push("category required");
  if (typeof inStock !== "boolean") errors.push("inStock must be boolean");
  if (errors.length) return res.status(400).json({ error: "ValidationError", details: errors });
  next();
}
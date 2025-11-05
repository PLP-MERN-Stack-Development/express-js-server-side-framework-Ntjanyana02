import express from "express";
import { v4 as uuid } from "uuid";
import { products } from "../data/store.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validateProduct } from "../middleware/validate.js";
const router = express.Router();

function filterAndPaginate(list, query) {
  const { category, search, page = 1, limit = 10 } = query;
  let result = list;
  if (category) result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  return { items: result.slice(start, end), total: result.length };
}

router.get("/", asyncHandler((req, res) => res.json(filterAndPaginate(products, req.query))));
router.get("/:id", asyncHandler((req, res) => {
  const p = products.find(p => p.id === req.params.id);
  if (!p) return res.status(404).json({ error: "NotFound" });
  res.json(p);
}));
router.post("/", validateProduct, asyncHandler((req, res) => {
  const p = { id: uuid(), ...req.body };
  products.push(p);
  res.status(201).json(p);
}));
router.put("/:id", validateProduct, asyncHandler((req, res) => {
  const i = products.findIndex(p => p.id === req.params.id);
  if (i === -1) return res.status(404).json({ error: "NotFound" });
  products[i] = { ...products[i], ...req.body };
  res.json(products[i]);
}));
router.delete("/:id", asyncHandler((req, res) => {
  const i = products.findIndex(p => p.id === req.params.id);
  if (i === -1) return res.status(404).json({ error: "NotFound" });
  res.json(products.splice(i, 1)[0]);
}));
router.get("/stats/summary", asyncHandler((_req, res) => {
  const stats = products.reduce((a, p) => { a[p.category] = (a[p.category] || 0) + 1; return a; }, {});
  res.json({ total: products.length, byCategory: stats });
}));
export default router;
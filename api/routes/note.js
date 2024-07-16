const express = require("express");
const {
  create,
  update,
  getAllNotes,
  getSingleNote,
  getAllNoteHistory,
  getNoteHistory,
  updateCategory,
  getCategory,
} = require("../controllers/noteController");

const router = express.Router();

router.post("/note/create", create);
router.get("/note", getAllNotes);
router.get("/note/:slug", getSingleNote);
router.get("/note/history/:slug", getAllNoteHistory);
router.get("/note/history/read/:slug", getNoteHistory);
router.put("/note/:slug", update);
router.put("/category", updateCategory);
router.get("/category", getCategory);

module.exports = router;

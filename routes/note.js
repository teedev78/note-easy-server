const express = require("express");
const { create, update } = require("../controllers/noteController");

const router = express.Router();

router.post("/note/create", create);
router.put("/note/:slug", update);

module.exports = router;

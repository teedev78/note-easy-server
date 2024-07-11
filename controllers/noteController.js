const { v4: uuidv4 } = require("uuid");
const Notes = require("../models/notes");
const NoteHistories = require("../models/noteHistories");

exports.create = async (req, res) => {
  try {
    const { userId, title, content, author, category, tag } = req.body;
    let slug = uuidv4();

    if (!userId) {
      return res.status(401).json({ error: "not authentication" });
    }
    if (!title) {
      return res.status(400).json({ error: "please type title!" });
    }
    if (!content) {
      return res.status(400).json({ error: "please type content" });
    }

    await Notes.create({
      userId,
      title,
      content,
      author,
      category,
      tag,
      slug,
      category,
      tag,
    });

    return res.status(201).json({ message: "create note successful." });
  } catch (error) {
    return res.status(400).json({ error: "cannot create note!" });
  }
};

exports.update = async (req, res) => {
  try {
    const { slug } = req.params;
    const { userId, title, content, author, category, tag } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "not authentication" });
    }
    if (!title || !content || !author) {
      return res.status(400).json({ error: "please type all empty form!" });
    }

    const oldNote = await Notes.findOne({ slug });
    if (!oldNote) {
      return res.status(400).json({ error: "connot find note!" });
    }

    await NoteHistories.create({
      userId: oldNote.userId,
      noteId: oldNote._id,
      title: oldNote.title,
      content: oldNote.content,
      author: oldNote.author,
      category: oldNote.category,
      tag: oldNote.tag,
    });

    await Notes.findOneAndUpdate(
      { slug },
      { $set: { title, content, author, category, tag } }
    );

    res.status(200).json({ message: "update note successful." });
  } catch (error) {
    return res.status(400).json({ error: "connot edit note!", error });
  }
};

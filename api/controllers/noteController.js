const { v4: uuidv4 } = require("uuid");
const Notes = require("../models/notes");
const Users = require("../models/users");
const NoteHistories = require("../models/noteHistories");
const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
  const authHeaders = req.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];
  const { title, content, author, category, tag } = req.body;
  let slug = uuidv4();

  // console.log({ title, content, author, category, tag });

  if (token === null) {
    return res.status(401).json({ message: "unauthentication!" });
  }
  if (!title) {
    return res.status(400).json({ error: "please type title!" });
  }
  if (!content) {
    return res.status(400).json({ error: "please type content" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const userInfo = await Users.findOne({ email: user.email });
    // console.log(userInfo);
    await Notes.create({
      userId: userInfo._id,
      title,
      content,
      author,
      category,
      tag,
      slug,
    });
    return res.status(201).json({ message: "create note successful." });
  } catch (error) {
    return res.status(400).json({ error: "cannot create note!" });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    const allNotes = await Notes.find({});
    return res
      .status(200)
      .json({ messasge: "load all notes successful.", allNotes });
  } catch (error) {
    console.log(error);
  }
};

exports.getSingleNote = async (req, res) => {
  try {
    const { slug } = req.params;
    const note = await Notes.findOne({ slug });
    // console.log(note);
    return res.status(200).json({ messasge: "load note successful.", note });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllNoteHistory = async (req, res) => {
  try {
    const { slug } = req.params;

    const noteHistory = await NoteHistories.find({ slug });
    const lastNote = await Notes.findOne({ slug });

    return res.status(200).json({
      message: "load note history successful.",
      lastNote,
      noteHistory,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getNoteHistory = async (req, res) => {
  try {
    const { slug } = req.params;
    // console.log(slug);

    const note = await NoteHistories.findOne({ _id: slug });
    // console.log(note);

    return res.status(200).json({ message: "get old note successful.", note });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "cannot load old note!" });
  }
};

exports.update = async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, content, category, tag } = req.body;
    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const userInfo = await Users.findOne({ email: user.email });

    // console.log(user);
    // console.log(userInfo);
    // console.log({ slug });
    // console.log({ title, content, category, tag });

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
      slug: oldNote.slug,
      // createAt: oldNote.createAt,
    });

    await Notes.findOneAndUpdate(
      { slug },
      {
        $set: {
          title,
          content,
          category,
          tag,
        },
      }
    );

    return res.status(201).json({ message: "create note successful." });
  } catch (error) {
    return res.status(400).json({ error: "cannot create note!" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(" ")[1];
    const userInfo = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findOne({ email: userInfo.email });

    if (user) {
      await Users.findOneAndUpdate(
        { email: user.email },
        {
          $set: {
            category: [...user.category, category],
          },
        }
      );

      const newCategory = await Users.findOne({ email: userInfo.email });

      return res.status(200).json({
        message: "create category successful.",
        categories: newCategory.category,
      });
    }

    return res.status(400).json({ message: "unauthentication!" });
  } catch (error) {
    return res.status(400).json({ error: "cannot create category!" });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(" ")[1];
    const userInfo = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findOne({ email: userInfo.email });

    if (user) {
      return res.status(200).json({
        message: "get category successful.",
        category: user.category,
      });
    }

    return res.status(400).json({ message: "unauthentication!" });
  } catch (error) {
    return res.status(400).json({ error: "cannot get category!" });
  }
};

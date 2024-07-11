const jwt = require("jsonwebtoken");
const Users = require("../models/users");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "email or password invalid!" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "email or password invalid!" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return res.status(200).json({ message: "login successful.", token });
  } catch (error) {
    return res.status(401).json({ message: "unauthorized!", error });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await Users.create({ email, name, password: hashedPassword });

    return res.status(201).json({ message: "register successful." });
  } catch (error) {
    return res.status(401).json({ message: "email already exist!" });
  }
};

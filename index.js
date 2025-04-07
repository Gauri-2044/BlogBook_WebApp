const path = require("path");
const express = require("express");
const User = require("./models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const Blog = require("./models/blog");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

mongoose
  .connect("mongodb://127.0.0.1:27017/blogbook")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

const SECRET_KEY = "Web_Dev_GDG";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/login");
  }
  try {
    const decoded = Jwt.verify(token, SECRET_KEY);
    const user = User.findById(decoded.userID);
    if (!user) {
      res.clearCookie("token");
      return res.redirect("/login");
    }
    req.user = decoded.userID;
    next();
  } catch (err) {
    res.clearCookie("token");
    return res.redirect("/login");
  }
};

app.get("/", isAuthenticated, async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "fullName email")
      .sort({ createdAt: -1 });
    console.log("fetched blogs", blogs);
    res.render("home", {
      blogs,
      userID: req.user,
    });
  } catch (err) {
    return res.status.render("home", {
      blogs: [],
      error: "Failed to Load Blogs",
      userID: req.user,
    });
  }
});

app.post("/blogs", isAuthenticated, async (req, res) => {
  const { title, content } = req.body;
  try {
    const newBlog = await Blog.create({
      title,
      content,
      author: req.user,
    });
    console.log(newBlog);
    res.redirect("/");
  } catch (err) {
    // const blogs = await Blog.find()
    //   .populate("author", "fullName email")
    //   .sort({ createdAt: -1 });

    res.render("home", {
      blogs,
      error: "Failed to Create Blog",
      userID: req.user,
    });
  }
});

app.post("/blogs/:id/edit", isAuthenticated, async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog Not Found" });
    }
    if (blog.author.toString() !== req.user) {
      return res
        .status(403)
        .json({ error: "Not authorized to edit this blog" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    return res.redirect("/");
  } catch (err) {
    res.status(400).json({ error: "Failed to Update Blog" });
  }
});

app.post("/blogs/:id/delete", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog Not Found" });
    }
    if (blog.author.toString() !== req.user) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this blog" });
    }
    await Blog.findByIdAndDelete(id);
    return res.redirect("/");
  } catch (err) {
    res.status(400).json({ error: "Failed to Delete Blog" });
  }
});

app.get("/signup", (req, res) => {
  const token = req.cookies.token;
  if (token) {
    try {
      Jwt.verify(token, SECRET_KEY);
      return res.redirect("/");
    } catch (err) {
      res.clearCookie("token");
    }
  }

  res.render("signup");
});
app.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
        return res.render("signup", { error: "User Already Exists" });
      }
      return res.status(400).json({ error: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    console.log(newUser);
    const token = Jwt.sign({ userID: newUser._id }, SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("token", token, { httpOnly: true });

    res.redirect("/");
    // res.status(201).json({ message: "User Created" });
  } catch (err) {
    res.status(400).json({ error: "Something Went Wrong" });
  }
});

app.get("/login", (req, res) => {
  const token = req.cookies.token;
  try {
    if (token) {
      Jwt.verify(token, SECRET_KEY);
      return res.redirect("/");
    }
  } catch (err) {
    res.clearCookie("token");
  }

  res.render("login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "User Not Found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: "Incorrect Password" });
  }
  const token = Jwt.sign({ userID: user._id }, SECRET_KEY, { expiresIn: "7d" });
  res.cookie("token", token, { httpOnly: true });
  return res.redirect("/");
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

app.use(express.static("public"));

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.listen(8000, () => console.log("Server running on http://localhost:8000"));

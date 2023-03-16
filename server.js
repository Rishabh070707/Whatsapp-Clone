const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const mongoose = require("mongoose");
const Msg = require("./modles/msg");

const url =
  "mongodb+srv://admin:admin@whatsapp.laffutm.mongodb.net/?retryWrites=true&w=majority";
const localurl = "mongodb://127.0.0.1:27017/whatsappdb";
const db = new mongoose.connect(localurl, () => {
  console.log("connect");
});

app.post("/msg", async (req, res) => {
  const { msg } = req.body;
  const record = Msg({
    name: "Rishabh",
    msg: msg,
    time: new Date(),
    role: true,
  });
  await record.save();
  res.json(record);
});

app.get("/sand", async (req, res) => {
  const record = await Msg.find();
  res.json(record);
});
app.get("/v1", async (req, res) => {
  const record = await Msg.find().sort({ time: -1 });
  res.render("msg.ejs", { record });
});

app.get("/remove/:id", async (req, res) => {
  const id = req.params.id;
  const record = await Msg.findByIdAndDelete(id);
  res.redirect("/v1");
});

app.get("/update/:id", async (req, res) => {
  const id = req.params.id;
  const record = await Msg.findById(id);
  let newrole = null;
  if (record.role == true) {
    newrole = false;
  } else {
    newrole = true;
  }
  await Msg.findByIdAndUpdate(id, { role: newrole });
  res.redirect("/v1");
});

app.get("/updatename/:id", async (req, res) => {
  const id = req.params.id;
  const record = await Msg.findById(id);
  let newrole = "";
  if (record.name == "Rishabh") {
    newrole = "Amit";
  } else {
    newrole = "Rishabh";
  }
  await Msg.findByIdAndUpdate(id, { name: newrole });
  res.redirect("/v1");
});

app.set("view engine", "ejs");
// app.use(Router);
app.listen(9000, () => {
  console.log("server runing on 9000");
});

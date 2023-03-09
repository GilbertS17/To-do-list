const express = require("express");
const bodyParser = require("body-parser");
let ejs = require("ejs");

const app = express();

let items = ["Add to do items"];
let doneItems = ["Add done items"];
let workItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  let day = new Date();
  let dayNo = day.getDay();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let today = day.toLocaleDateString("en-Us", options);

  res.render("list", { listTitle: today, newListItems: items });
});

app.post("/", (req, res) => {

  if(req.body.list == "work"){
    workItems.push(req.body.newItem)
    res.redirect("/work")
  }else {
    items.push(req.body.newItem)
    res.redirect("/")
  }

  var item = req.body.newItem;
  if (item != "") {
    if (items[0].charAt(0) == "A" && items[0].charAt(14) == "s")
      items[0] = item;
    else items.push(item);
    res.redirect("/");
  } else {
    res.sendFile(__dirname + "/index.html");
  }
});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "work List", newListItems: workItems });
});

app.post("/work", (req, res) => {
  var item = req.body.newItems;
  workItems.push(item);
  res.redirect("/work");
});

app.get("/Done", (req, res) => {
  let day = new Date();
  let dayNo = day.getDay();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let today = day.toLocaleDateString("en-Us", options);

  res.render("Done", { doneListItems: doneItems });
});

app.post("/Done", (req, res) => {
  var doneItem = req.body.doneItem;
  if (doneItem != "") {
    if (doneItems[0].charAt(0) == "A" && doneItems[0].charAt(13) == "s")
      doneItems[0] = doneItem;
    else doneItems.push(doneItem);
    res.redirect("/Done");
  } else {
    res.sendFile(__dirname + "/index.html");
  }
});

app.listen(3000, () => {
  console.log("Server is running on 3000");
});

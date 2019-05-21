const mongoose = require("mongoose");
const express = require("express");
var cors = require('cors');
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute = 'mongodb+srv://PierreSu:P86901@cluster0-zkenq.gcp.mongodb.net/test';

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// this is our get method
// this method fetches all available data in our database
router.get("/getData", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  Data.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  var myquery = { id: id };
  Data.deleteOne(myquery, function(err, obj) {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post("/putData", (req, res) => {
  console.log('catch')
  let data = new Data();
  let price_tag = ['<100', '100-300', '300-500', '>500'];

  const {id, sku, title, price, cat, store} = req.body;

  if ((!id && id !== 0) || !sku || !title || !price || !cat || !store) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.sku = sku;
  data.title = title;
  data.price = price;
  // range
  if (price < 100) { data.range = price_tag[0]; }
  else if (price < 300) { data.range = price_tag[1]; }
  else if (price < 500) { data.range = price_tag[2]; }
  else { data.range = price_tag[3]; }
  
  data.cat = cat;
  data.store = store;
  data.currencyId = "NTD";
  data.currencyFormat = "$";
  data.id = id;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log('LISTENING ON PORT 3001'));
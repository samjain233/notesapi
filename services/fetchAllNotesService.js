const client = require("../db/conn");
const db = client.db({ dbName: process.env.dbName });
const Notes = db.collection({name:"notes"}); //Notes collection

const fetchAllNotesService = async (req, res) => {
  try {
    console.log(db);
    return res.send("hello");
  } catch (err) {}
};

module.exports = fetchAllNotesService;
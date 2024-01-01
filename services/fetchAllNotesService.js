

const fetchAllNotesService = async (req, res) => {
  try {
    console.log(db);
    return res.send("hello");
  } catch (err) {}
};

module.exports = fetchAllNotesService;
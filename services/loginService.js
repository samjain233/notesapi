const loginService = async (req, res) => {
  try {
    const { email, password } = req.body;

    return res.send("hello");
  } catch (err) {}
};

module.exports = loginService;

// timezoneMiddleware.js
module.exports = async function (req, res, next) {
  try {
    await req.app.locals.pool.execute("SET time_zone = 'Asia/Kolkata'");
    
    next();
  } catch (err) {
    console.error("Error setting time zone:", err);
    res.status(500).send("Internal Server Error");
  }
};

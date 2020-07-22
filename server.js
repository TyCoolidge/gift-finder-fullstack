const express = require("express");
const app = express();

app.use("/api/v1/users", require("./api/v1/users"));
app.use("/api/v1/gifts", require("./api/v1/gifts"));
app.use("/api/v1/userGifts", require("./api/v1/userGifts"));
app.get("/", (req, res) => res.send("Hello World!"));

const port = process.env.PORT || 3045;
app.listen(port, () =>
   console.log(`Server running at http://localhost:${port}`)
);

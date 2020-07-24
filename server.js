const express = require("express");
const app = express();
const path = require("path");

//https://medium.com/@mmajdanski/express-body-parser-and-why-may-not-need-it-335803cd048c
app.use(express.json());

app.use("/api/v1/users", require("./api/v1/users"));
app.use("/api/v1/gifts", require("./api/v1/gifts"));
app.use("/api/v1/userGifts", require("./api/v1/userGifts"));
app.use(express.static("client/build"));
app.get("*", (req, res) => {
   res.sendFile(path.resolve(__dirname, "client", " build", "index.html"));
});

const port = process.env.PORT || 3045;
app.listen(port, () =>
   console.log(`Server running at http://localhost:${port}`)
);

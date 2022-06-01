const express = require("express"),
  app = express(),
  jwt = require("jsonwebtoken"),
  secret = "123123123";

const users = [
  {
    _id: "122122",
    name: "avi",
    email: "a@a",
    pass: "1234",
  },
];

function logIn(email, pass) {
  const foundUser = users.find((u) => u.email == email);
  if (foundUser.pass !== pass || !foundUser) throw "not auth";
  const token = createToken(foundUser._id);
  return token;
}
function log() {
  try {
    const token = logIn("a@a", "1234");
    const res = authToken(token);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

function createToken(id) {
  const token = jwt.sign({ _id: id }, secret, { expiresIn: "15m" });
  return token;
}

function authToken(token) {
  const decode = jwt.verify(token, secret);
  const id = decode._id;
  const foundUser = users.find((u) => u._id === id);
  return foundUser;
}

log();

app.listen(3220, () => console.log("server is up"));

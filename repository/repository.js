const fs = require("fs");

module.exports.readProductJSONFile = () => {
  return JSON.parse(fs.readFileSync("productdb.json"))["produse"];
}

module.exports.readUserJSONFile = () => {
  return JSON.parse(fs.readFileSync("userdb.json"))["users"];
}

module.exports.readloginJSONFile = () => {
  return JSON.parse(fs.readFileSync("login.json"))["login"];
}

module.exports.readCartJSONFile = () => {
  return JSON.parse(fs.readFileSync("cart.json"))["cart"];
}

module.exports.writeProductJSONFile = (content) => {
  fs.writeFileSync(
    "productdb.json",
    JSON.stringify({ produse: content }, null, 4),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}

module.exports.writeUserJSONFile = (content) => {
  fs.writeFileSync(
    "userdb.json",
    JSON.stringify({ users: content }, null, 4),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}

module.exports.writeloginJSONFile = (content) => {
  fs.writeFileSync(
    "login.json",
    JSON.stringify({ login: content }, null, 4),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}

module.exports.writeCartJSONFile = (content) => {
  fs.writeFileSync(
    "cart.json",
    JSON.stringify({ cart: content }, null, 4),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}
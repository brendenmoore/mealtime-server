const { Text, Decimal, Relationship } = require("@keystonejs/fields");
const access = require("../access-control");

module.exports = {
  fields: {
    user: {
      type: Relationship,
      ref: "User",
      many: false,
    },
    name: { type: Text, required: true },
    price: { type: Decimal, required: false },
  },
};

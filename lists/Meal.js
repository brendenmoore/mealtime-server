const { Relationship, Integer } = require("@keystonejs/fields");

module.exports = {
  fields: {
    user: {
      type: Relationship,
      ref: "User.meals",
      many: false,
    },
    recipes: {
      type: Relationship,
      ref: "Recipe",
      many: true,
    },
    order: { type: Integer, required: true },
  },
};

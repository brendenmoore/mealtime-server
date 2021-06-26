const { Relationship } = require("@keystonejs/fields");

module.exports = {
  fields: {
    user: {
      type: Relationship,
      ref: "User.shoppingLists",
      many: false,
    },
    meals: {
      type: Relationship,
      ref: "Meal",
      many: true,
    },
  },
};

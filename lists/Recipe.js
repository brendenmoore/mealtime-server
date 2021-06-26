const {
  Text,
  Decimal,
  Integer,
  Relationship,
  Select,
} = require("@keystonejs/fields");
const access = require("../access-control");

module.exports = {
  fields: {
    user: {
      type: Relationship,
      ref: "User.recipes",
      many: false,
    },
    name: {
      type: Text,
      isRequired: true,
    },
    ingredients: {
      type: Relationship,
      ref: "Ingredient",
      many: true,
    },
    category: {
      type: Select,
      options: ["Main", "Side", "Dessert", "Snack"],
    },
    price: {
      type: Decimal,
    },
    servings: {
      type: Integer,
    },
    directions: {
      type: Text,
    },
    notes: {
      type: Text,
    },
  },
};

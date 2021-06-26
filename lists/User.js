const {
  Text,
  Checkbox,
  Password,
  Relationship,
} = require("@keystonejs/fields");
const access = require("../access-control.js");

module.exports = {
  fields: {
    name: { type: Text },
    email: {
      type: Text,
      isUnique: true,
    },
    isAdmin: {
      type: Checkbox,
      // Field-level access controls
      // Here, we set more restrictive field access so a non-admin cannot make themselves admin.
      access: {
        update: access.userIsAdmin,
      },
    },
    password: {
      type: Password,
    },
    recipes: {
      type: Relationship,
      ref: "Recipe.user",
      many: true,
    },
    meals: {
      type: Relationship,
      ref: "Meal.user",
      many: "true",
    },
    dayMenus: {
      type: Relationship,
      ref: "DayMenu.user",
      many: true,
    },
    shoppingLists: {
      type: Relationship,
      ref: "ShoppingList.user",
      many: true,
    },
  },
  // List-level access controls
  access: {
    read: access.userIsAdminOrAccountOwner,
    update: access.userIsAdminOrAccountOwner,
    create: true,
    delete: access.userIsAdmin,
    auth: true,
  },
};

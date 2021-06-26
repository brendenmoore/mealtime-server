const { Keystone } = require("@keystonejs/keystone");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const initialiseData = require("./initial-data");
const RecipeSchema = require("./lists/Recipe.js");
const UserSchema = require("./lists/User.js");
const IngredientSchema = require("./lists/Ingredient.js");
const ShoppingListSchema = require("./lists/ShoppingList.js");
const DayMenuSchema = require("./lists/DayMenu.js");
const MealSchema = require("./lists/Meal.js");

const { MongooseAdapter: Adapter } = require("@keystonejs/adapter-mongoose");
const access = require("./access-control");

const PROJECT_NAME = "Mealtime";
const adapterConfig = {
  mongoUri:
    "mongodb+srv://admin:BAMf8rejk3@cluster0.zwslu.mongodb.net/mealtime?retryWrites=true&w=majority",
};

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  onConnect: process.env.CREATE_TABLES !== "true" && initialiseData,
  defaultAccess: {
    list: {
      read: access.userIsAdminOrOwner,
      create: access.userIsLoggedIn,
      update: access.userIsAdminOrOwner,
      delete: access.userIsAdminOrOwner,
    },
  },
});

keystone.createList("User", UserSchema);
keystone.createList("Ingredient", IngredientSchema);
keystone.createList("Recipe", RecipeSchema);
keystone.createList("ShoppingList", ShoppingListSchema);
keystone.createList("DayMenu", DayMenuSchema);
keystone.createList("Meal", MealSchema);

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: "User",
  config: { protectIdentities: process.env.NODE_ENV === "production" },
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: PROJECT_NAME,
      enableDefaultRoute: true,
      authStrategy,
    }),
  ],
};

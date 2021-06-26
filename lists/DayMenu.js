const { CalendarDay, Relationship } = require("@keystonejs/fields");

module.exports = {
  fields: {
    user: {
      type: Relationship,
      ref: "User.dayMenus",
      many: false,
    },
    date: {
      type: CalendarDay,
      required: true,
      isUnique: true,
    },
    meal: {
      type: Relationship,
      ref: "Meal",
      many: false,
    },
  },
};

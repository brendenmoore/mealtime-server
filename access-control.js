// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) =>
  Boolean(user && user.isAdmin);
const userIsLoggedIn = ({ authentication: { item: user } }) => Boolean(user);
const userOwnsAccount = ({ authentication: { item: authedUser } }) => {
  if (!authedUser) {
    return false;
  }

  // Instead of a boolean, you can return a GraphQL query:
  // https://www.keystonejs.com/api/access-control#graphqlwhere
  return { id: authedUser.id };
};

const userOwnsItem = ({ authentication: { item } }) => {
  if (!item) {
    return false;
  }
  return { user: { id: item.id } };
};

const userIsAdminOrAccountOwner = (auth) => {
  const isAdmin = access.userIsAdmin(auth);
  const isAccountOwner = access.userOwnsAccount(auth);
  return isAdmin ? isAdmin : isAccountOwner;
};
const userIsAdminOrOwner = (auth) => {
  const isAdmin = access.userIsAdmin(auth);
  const isOwner = access.userOwnsItem(auth);
  return isAdmin ? isAdmin : isOwner;
};

const access = {
  userIsAdmin,
  userOwnsItem,
  userIsAdminOrOwner,
  userIsLoggedIn,
  userOwnsAccount,
  userIsAdminOrAccountOwner,
};

module.exports = access;

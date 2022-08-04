const checkIsSubscribed = (channel, userId) => {
  let subscribers = channel.subscribers.map((item) => item.user.toString());
  return subscribers.includes(userId);
};
const checkIsNotified = (channel, userId) => {
  let usersToNotify = channel.usersToNotify.map((item) => item.user.toString());
  return usersToNotify.includes(userId);
};

module.exports = { checkIsSubscribed, checkIsNotified };

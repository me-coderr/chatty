export const getSender = (loggedUser, users) => {
  console.log(loggedUser);
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderObject = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const isSameSender = (messages, message, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== message.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[i].sender._id !== userId &&
    messages[i].sender._id
  );
};

export const isSameSenderMargin = (messages, message, i, userId) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === message.sender._id &&
    messages[i].sender._id !== userId
  )
    return "33px";
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== message.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

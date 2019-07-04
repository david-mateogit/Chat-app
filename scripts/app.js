// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');
const currentUser = document.querySelector('.current');
const roomNames = Array.from(document.querySelectorAll('.chat-rooms > .btn'));

// add a new chat
newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom
    .addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
});

// update the username
newNameForm.addEventListener('submit', e => {
  e.preventDefault();
  // update name via chatroom
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  // reset the form
  newNameForm.reset();
  //Display the current username
  currentUser.innerHTML = newName;
  // show then hide the update message
  updateMssg.innerText = `Your name was updated to ${newName}`;
  setTimeout(() => (updateMssg.innerText = ''), 3000);
});

// update the chat room
rooms.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatUI.highlightRoom();
    chatroom.getChats(chat => chatUI.render(chat));
  }
});

// check local storage for name and room
const username = localStorage.username ? localStorage.username : 'anon';
currentUser.innerHTML = username;

const room = localStorage.room ? localStorage.room : 'gaming';

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom(room, username);
chatUI.highlightRoom();
// get chats & render
chatroom.getChats(data => chatUI.render(data));
class ChatUI {
  constructor(list) {
    this.list = list;
  }
  clear() {
    this.list.innerHTML = '';
  }
  highlightRoom() {
    roomNames.forEach(room => {
      if (room.getAttribute('id') === localStorage.room) {
        room.classList.add('selected');
      } else {
        room.classList.remove('selected');
      }
    });
  }
  render(data) {
    const when = dateFns.distanceInWordsToNow(data.created_at.toDate(), {
      addSuffix: true
    });
    const html = `
      <li class="list-group-item">
        <span class="username">${data.username}</span>
        <span class="message">${data.message}</span>
        <div class="time">${when}</span>
      </li>
    `;
    this.list.innerHTML += html;
  }
}

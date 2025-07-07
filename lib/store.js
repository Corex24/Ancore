// 🗂️ Ancore Runtime Store | Sessions, Message IDs, Temp Storage

const _0x4892 = ['cache', 'messages', 'sessions'];

const store = {
  [_0x4892[0]]: new Map(),
  [_0x4892[1]]: new Map(),
  [_0x4892[2]]: new Map(),

  setMessage(key, value) {
    this[_0x4892[1]].set(key, value);
  },

  getMessage(key) {
    return this[_0x4892[1]].get(key);
  },

  setSession(id, data) {
    this[_0x4892[2]].set(id, data);
  },

  getSession(id) {
    return this[_0x4892[2]].get(id);
  },

  setTemp(key, value) {
    this[_0x4892[0]].set(key, value);
  },

  getTemp(key) {
    return this[_0x4892[0]].get(key);
  },

  clearAll() {
    this[_0x4892[0]].clear();
    this[_0x4892[1]].clear();
    this[_0x4892[2]].clear();
  }
};

export default store;

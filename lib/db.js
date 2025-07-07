// 📦 Ancore Database Engine | Stores warnings, users, sessions

import fs from 'fs';
import path from 'path';

const _0x3db1 = [
  'db.json',
  'resolve',
  'existsSync',
  'parse',
  'readFileSync',
  'writeFileSync',
  'stringify',
  'data',
  'save'
];

const dbPath = path[_0x3db1[1]]('lib', _0x3db1[0]);
let db = { users: {}, warns: {}, sessions: {} };

if (fs[_0x3db1[2]](dbPath)) {
  try {
    const content = fs[_0x3db1[4]](dbPath, 'utf-8');
    db = JSON[_0x3db1[3]](content);
  } catch {}
}

function save() {
  try {
    fs[_0x3db1[5]](dbPath, JSON[_0x3db1[6]](db, null, 2));
  } catch {}
}

export default {
  get: () => db,
  save,
  get users() {
    return db.users;
  },
  get warns() {
    return db.warns;
  },
  get sessions() {
    return db.sessions;
  },
  set users(u) {
    db.users = u;
    save();
  },
  set warns(w) {
    db.warns = w;
    save();
  },
  set sessions(s) {
    db.sessions = s;
    save();
  }
};

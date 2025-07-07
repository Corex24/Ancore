// 🛡️ Ancore Permissions System | Controls command access

import db from './db.js';

const _0x4cde = ['users', 'allowed', 'includes', 'push', 'filter', 'save'];

export function isOwner(jid = '') {
  return jid.startsWith('2348036869669') || jid === '2348036869669@s.whatsapp.net';
}

export function isAllowed(cmd, jid) {
  const user = db[_0x4cde[0]][jid] || {};
  const allowed = user[_0x4cde[1]] || [];
  return allowed[_0x4cde[2]](cmd);
}

export function grantCommand(cmd, jid) {
  if (!db[_0x4cde[0]][jid]) db[_0x4cde[0]][jid] = {};
  const user = db[_0x4cde[0]][jid];
  user[_0x4cde[1]] = user[_0x4cde[1]] || [];
  if (!user[_0x4cde[1]][_0x4cde[2]](cmd)) user[_0x4cde[1]][_0x4cde[3]](cmd);
  db[_0x4cde[5]]();
}

export function revokeCommand(cmd, jid) {
  const user = db[_0x4cde[0]][jid];
  if (!user) return;
  user[_0x4cde[1]] = user[_0x4cde[1]][_0x4cde[4]]((c) => c !== cmd);
  db[_0x4cde[5]]();
}

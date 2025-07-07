// 🧩 Ancore Utility Functions (obfuscated)

var _0xa5c0 = [
  "@s.whatsapp.net",
  "endsWith",
  "includes",
  "split",
  "isUser",
  "isGroup",
  "sleep",
  "then",
  "resolve",
  "setTimeout"
];

export function isUser(_0xd68bx2 = '') {
  return (
    typeof _0xd68bx2 === 'string' &&
    (_0xd68bx2[_0xa5c0[1]](_0xa5c0[0]) ||
      _0xd68bx2[_0xa5c0[2]]('@g.us') ||
      _0xd68bx2[_0xa5c0[3]](':')[0][_0xa5c0[1]](_0xa5c0[0]))
  );
}

export function isGroup(_0xd68bx2 = '') {
  return typeof _0xd68bx2 === 'string' && _0xd68bx2[_0xa5c0[1]]('@g.us');
}

export function sleep(_0xd68bx4) {
  return new Promise((_0xd68bx5) =>
    setTimeout(_0xd68bx5, _0xd68bx4)
  );
}

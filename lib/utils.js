// 🛠️ Ancore Utilities | Core Message & JID Helpers

const _0x1f43 = {
  isUser: (jid) => /\d{5,16}@s\.whatsapp\.net/.test(jid),
  isGroup: (jid) => jid.endsWith('@g.us'),
  parsedJid: (txt = '') =>
    txt
      .match(/\d{5,16}@s\.whatsapp\.net/g)
      ?.filter((v, i, a) => a.indexOf(v) === i) || [],
  sleep: (ms) => new Promise((res) => setTimeout(res, ms)),
  getRandom: (ext = '') =>
    `${Math.floor(Math.random() * 1e6)}${ext}`,
  formatBytes: (b, d = 2) => {
    if (b === 0) return '0 Bytes';
    const k = 1024;
    const dm = d < 0 ? 0 : d;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(b) / Math.log(k));
    return `${parseFloat((b / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  },
};

export const {
  isUser,
  isGroup,
  parsedJid,
  sleep,
  getRandom,
  formatBytes,
} = _0x1f43;

// 🤖 Ancore Emoji Reactions Handler 

var _0x32f1 = [
  "reactions",
  "sendMessage",
  "emoji",
  "react",
  "chat",
  "key",
  "id"
];

export async function react(sock, m, emj) {
  try {
    return await sock[_0x32f1[1]](m[_0x32f1[4]], {
      [_0x32f1[0]]: [{ [_0x32f1[2]]: emj }],
      [_0x32f1[5]]: {
        remoteJid: m[_0x32f1[5]].remoteJid,
        fromMe: m[_0x32f1[5]].fromMe,
        id: m[_0x32f1[5]][_0x32f1[6]],
        participant: m[_0x32f1[5]].participant || m.participant
      }
    });
  } catch {}
          }

// 💬 Ancore Reactions | 

const _0x4ec7 = ['sendMessage', 'react', 'emoji'];

export async function react(sock, m, emoji = '💙') {
  if (!m?.key || !m?.chat) return;

  try {
    await sock[_0x4ec7[0]](m.chat, {
      [_0x4ec7[1]]: {
        [_0x4ec7[2]]: emoji,
        key: m.key,
      },
    });
  } catch {}
}

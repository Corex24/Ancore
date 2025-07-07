// 💬 Ancore Reaction Utility | 

export async function react(sock, m, emoji) { try { if (!m || !m.key) return await sock.sendMessage(m.chat, { react: { text: emoji, key: m.key } }) } catch { 
  
} }


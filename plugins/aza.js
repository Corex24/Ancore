const axios = require('axios')

module.exports = {
  name: 'aza',
  command: ['aza'],
  tags: ['finance'],
  run: async (m, sock, args) => {
    const accountNumber = args[0]
    if (!accountNumber || !/^\d{10}$/.test(accountNumber)) {
      return sock.sendMessage(m.key.remoteJid, {
        text: '❌ Enter a valid 10-digit Nigerian account number.\n\nExample: `.aza 8036869669`'
      }, { quoted: m })
    }

    try {
      // Placeholder API: replace with a verified Nigerian bank resolution API
      const res = await axios.get(`https://api.vreel.app/resolve-nuban?account=${accountNumber}`)
      const data = res.data

      if (!data || !data.account_name) {
        return sock.sendMessage(m.key.remoteJid, { text: '❌ Account not found or unsupported bank.' }, { quoted: m })
      }

      const msg = `
💳 *Bank Account Lookup*

👤 Name: ${data.account_name}
🏦 Bank: ${data.bank_name}
🔢 Number: ${accountNumber}
`.trim()

      await sock.sendMessage(m.key.remoteJid, { text: msg }, { quoted: m })

    } catch (e) {
      console.error(e)
      await sock.sendMessage(m.key.remoteJid, { text: '⚠️ Error resolving account number.' }, { quoted: m })
    }
  }
                             }

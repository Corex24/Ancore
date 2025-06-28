const { bot } = require('../lib/');

bot(
  {
    pattern: 'validate',
    fromMe: true,
    desc: 'Check for invalid or missing fields in all commands.',
    type: 'core',
  },
  async (message, match, ctx) => {
    const issues = [];
    const names = new Set();

    ctx.commands.forEach((cmd, i) => {
      const errors = [];
      const name = cmd?.name;
      const pattern = cmd?.pattern;
      const type = cmd?.type;
      const desc = cmd?.desc;
      const active = cmd?.active;

      if (!name) errors.push('❌ Missing `name`');
      if (!pattern) errors.push('❌ Missing `pattern`');
      if (!type) errors.push('❌ Missing `type`');

      if (!desc) errors.push('⚠️ Missing `desc`');
      if (name && names.has(name)) errors.push('⚠️ Duplicate `name`');
      if (active === false) errors.push('⚠️ Command is disabled');

      if (name) names.add(name);

      if (errors.length > 0) {
        issues.push(`*${i + 1}. Command \`${name || 'unnamed'}\`:*\n${errors.join('\n')}`);
      }
    });

    if (issues.length === 0) {
      return await message.send('✅ All commands are valid.');
    }

    const report = `*Found ${issues.length} issue(s):*\n\n${issues.join('\n\n')}`;
    return await message.send(report);
  }
);

const { bot } = require('../lib/');

bot(
  {
    pattern: 'validate',
    fromMe: true,
    desc: 'Check for command issues like missing name/type/pattern',
    type: 'core',
  },
  async (message, match, ctx) => {
    let issues = [];

    ctx.commands.forEach((cmd, i) => {
      const name = cmd?.name;
      const pattern = cmd?.pattern;
      const type = cmd?.type;

      const errors = [];

      if (!name) errors.push('❌ Missing `name`');
      if (!pattern) errors.push('❌ Missing `pattern`');
      if (!type) errors.push('❌ Missing `type`');

      if (errors.length > 0) {
        issues.push(`*${i + 1}. Command Issue:*\n${errors.join('\n')}`);
      }
    });

    if (issues.length === 0) {
      return await message.send('✅ All commands are valid.');
    }

    const output = `*Found ${issues.length} issue(s):*\n\n${issues.join('\n\n')}`;
    return await message.send(output);
  }
);

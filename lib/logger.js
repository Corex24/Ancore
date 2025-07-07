// 📜 Ancore Logger | Styled Console Output

import chalk from 'chalk';

const _0x191c = ['error', 'info', 'log', 'warn', 'success'];

export const logger = {
  [_0x191c[0]]: (...args) =>
    console[_0x191c[2]](chalk.red.bold('[❌ ERROR]'), ...args),

  [_0x191c[1]]: (...args) =>
    console[_0x191c[2]](chalk.cyanBright('[💡 INFO]'), ...args),

  [_0x191c[3]]: (...args) =>
    console[_0x191c[2]](chalk.yellowBright('[⚠️ WARN]'), ...args),

  [_0x191c[4]]: (...args) =>
    console[_0x191c[2]](chalk.greenBright('[✅ SUCCESS]'), ...args),
};

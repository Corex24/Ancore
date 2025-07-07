// 📦 Ancore Logging System | Styled for WhatsApp 
// Made with 💙 by Corex

import chalk from 'chalk'

const tag = (label, color = 'white') => chalk.bgKeyword(color).black(${label})

export default { info: (...args) => console.log(tag('INFO', 'blue'), ...args), warn: (...args) => console.log(tag('WARN', 'yellow'), ...args), error: (...args) => console.log(tag('ERROR', 'red'), ...args), success: (...args) => console.log(tag('DONE', 'green'), ...args), custom: (label, color, ...args) => console.log(tag(label, color), ...args) }

// 💬 Use: // import logger from './lib/logger.js' // logger.info('Ancore launched') // logger.error('Something went wrong!')


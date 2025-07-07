// 📝 Ancore Logger Utility (obfuscated) | Logs with styled prefixes

import chalk from 'chalk';
var _0xb442=["[INFO]","[WARN]","[ERROR]","green","yellow","red","log"];
export const logger={
  info:function(_0xd169x1){
    console[_0xb442[6]](chalk[_0xb442[3]](_0xb442[0]),_0xd169x1);
  },
  warn:function(_0xd169x1){
    console[_0xb442[6]](chalk[_0xb442[4]](_0xb442[1]),_0xd169x1);
  },
  error:function(_0xd169x1){
    console[_0xb442[6]](chalk[_0xb442[5]](_0xb442[2]),_0xd169x1);
  },
  success:function(_0xd169x1){
    console[_0xb442[6]](chalk[_0xb442[3]]('[SUCCESS]'),_0xd169x1);
  }
};

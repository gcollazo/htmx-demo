module.exports = (v) => {
  const escape = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };
  
  const badChars = /[&<>"'`=]/g, possible = /[&<>"'`=]/;
  
  let escapeChar= (chr) => escape[chr];
  
  function escapeExpression(string) {
    if (typeof string !== 'string') {
      // don't escape SafeStrings, since they're already safe
      if (string && string.toHTML) {
        return string.toHTML();
      } else if (string === null || string === undefined) {
        return '';
      } else if (!string) {
        return String(string);
      }
  
      // Force a string conversion as this will be done by the append regardless and
      // the regex test will do this transparently behind the scenes, causing issues if
      // an object's to string has escaped characters in it.
      string = String(string);
    }
  
    if (!possible.test(string)) {
      return string;
    }
    return string.replace(badChars, escapeChar);
  }

  v.directive('escape', (value, vnode) => {
    vnode.children = [escapeExpression(value)];
  });
};
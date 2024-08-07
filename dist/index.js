"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../node_modules/cssesc/cssesc.js
var require_cssesc = __commonJS({
  "../../node_modules/cssesc/cssesc.js"(exports2, module2) {
    "use strict";
    var object = {};
    var hasOwnProperty2 = object.hasOwnProperty;
    var merge = function merge2(options, defaults) {
      if (!options) {
        return defaults;
      }
      var result = {};
      for (var key in defaults) {
        result[key] = hasOwnProperty2.call(options, key) ? options[key] : defaults[key];
      }
      return result;
    };
    var regexAnySingleEscape = /[ -,\.\/:-@\[-\^`\{-~]/;
    var regexSingleEscape = /[ -,\.\/:-@\[\]\^`\{-~]/;
    var regexExcessiveSpaces = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g;
    var cssesc3 = function cssesc4(string, options) {
      options = merge(options, cssesc4.options);
      if (options.quotes != "single" && options.quotes != "double") {
        options.quotes = "single";
      }
      var quote = options.quotes == "double" ? '"' : "'";
      var isIdentifier = options.isIdentifier;
      var firstChar = string.charAt(0);
      var output = "";
      var counter = 0;
      var length = string.length;
      while (counter < length) {
        var character = string.charAt(counter++);
        var codePoint = character.charCodeAt();
        var value = void 0;
        if (codePoint < 32 || codePoint > 126) {
          if (codePoint >= 55296 && codePoint <= 56319 && counter < length) {
            var extra = string.charCodeAt(counter++);
            if ((extra & 64512) == 56320) {
              codePoint = ((codePoint & 1023) << 10) + (extra & 1023) + 65536;
            } else {
              counter--;
            }
          }
          value = "\\" + codePoint.toString(16).toUpperCase() + " ";
        } else {
          if (options.escapeEverything) {
            if (regexAnySingleEscape.test(character)) {
              value = "\\" + character;
            } else {
              value = "\\" + codePoint.toString(16).toUpperCase() + " ";
            }
          } else if (/[\t\n\f\r\x0B]/.test(character)) {
            value = "\\" + codePoint.toString(16).toUpperCase() + " ";
          } else if (character == "\\" || !isIdentifier && (character == '"' && quote == character || character == "'" && quote == character) || isIdentifier && regexSingleEscape.test(character)) {
            value = "\\" + character;
          } else {
            value = character;
          }
        }
        output += value;
      }
      if (isIdentifier) {
        if (/^-[-\d]/.test(output)) {
          output = "\\-" + output.slice(1);
        } else if (/\d/.test(firstChar)) {
          output = "\\3" + firstChar + " " + output.slice(1);
        }
      }
      output = output.replace(regexExcessiveSpaces, function($0, $1, $2) {
        if ($1 && $1.length % 2) {
          return $0;
        }
        return ($1 || "") + $2;
      });
      if (!isIdentifier && options.wrap) {
        return quote + output + quote;
      }
      return output;
    };
    cssesc3.options = {
      "escapeEverything": false,
      "isIdentifier": false,
      "quotes": "single",
      "wrap": false
    };
    cssesc3.version = "3.0.0";
    module2.exports = cssesc3;
  }
});

// ../../node_modules/picocolors/picocolors.js
var require_picocolors = __commonJS({
  "../../node_modules/picocolors/picocolors.js"(exports2, module2) {
    "use strict";
    var argv = process.argv || [];
    var env = process.env;
    var isColorSupported = !("NO_COLOR" in env || argv.includes("--no-color")) && ("FORCE_COLOR" in env || argv.includes("--color") || process.platform === "win32" || require != null && require("tty").isatty(1) && env.TERM !== "dumb" || "CI" in env);
    var formatter = (open, close, replace = open) => (input) => {
      let string = "" + input;
      let index = string.indexOf(close, open.length);
      return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close;
    };
    var replaceClose = (string, close, replace, index) => {
      let result = "";
      let cursor = 0;
      do {
        result += string.substring(cursor, index) + replace;
        cursor = index + close.length;
        index = string.indexOf(close, cursor);
      } while (~index);
      return result + string.substring(cursor);
    };
    var createColors = (enabled = isColorSupported) => {
      let init = enabled ? formatter : () => String;
      return {
        isColorSupported: enabled,
        reset: init("\x1B[0m", "\x1B[0m"),
        bold: init("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"),
        dim: init("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"),
        italic: init("\x1B[3m", "\x1B[23m"),
        underline: init("\x1B[4m", "\x1B[24m"),
        inverse: init("\x1B[7m", "\x1B[27m"),
        hidden: init("\x1B[8m", "\x1B[28m"),
        strikethrough: init("\x1B[9m", "\x1B[29m"),
        black: init("\x1B[30m", "\x1B[39m"),
        red: init("\x1B[31m", "\x1B[39m"),
        green: init("\x1B[32m", "\x1B[39m"),
        yellow: init("\x1B[33m", "\x1B[39m"),
        blue: init("\x1B[34m", "\x1B[39m"),
        magenta: init("\x1B[35m", "\x1B[39m"),
        cyan: init("\x1B[36m", "\x1B[39m"),
        white: init("\x1B[37m", "\x1B[39m"),
        gray: init("\x1B[90m", "\x1B[39m"),
        bgBlack: init("\x1B[40m", "\x1B[49m"),
        bgRed: init("\x1B[41m", "\x1B[49m"),
        bgGreen: init("\x1B[42m", "\x1B[49m"),
        bgYellow: init("\x1B[43m", "\x1B[49m"),
        bgBlue: init("\x1B[44m", "\x1B[49m"),
        bgMagenta: init("\x1B[45m", "\x1B[49m"),
        bgCyan: init("\x1B[46m", "\x1B[49m"),
        bgWhite: init("\x1B[47m", "\x1B[49m")
      };
    };
    module2.exports = createColors();
    module2.exports.createColors = createColors;
  }
});

// ../../node_modules/deepmerge/dist/cjs.js
var require_cjs = __commonJS({
  "../../node_modules/deepmerge/dist/cjs.js"(exports2, module2) {
    "use strict";
    var isMergeableObject = function isMergeableObject2(value) {
      return isNonNullObject(value) && !isSpecial(value);
    };
    function isNonNullObject(value) {
      return !!value && typeof value === "object";
    }
    function isSpecial(value) {
      var stringValue = Object.prototype.toString.call(value);
      return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
    }
    var canUseSymbol = typeof Symbol === "function" && Symbol.for;
    var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
    function isReactElement(value) {
      return value.$$typeof === REACT_ELEMENT_TYPE;
    }
    function emptyTarget(val) {
      return Array.isArray(val) ? [] : {};
    }
    function cloneUnlessOtherwiseSpecified(value, options) {
      return options.clone !== false && options.isMergeableObject(value) ? deepmerge2(emptyTarget(value), value, options) : value;
    }
    function defaultArrayMerge(target, source, options) {
      return target.concat(source).map(function(element) {
        return cloneUnlessOtherwiseSpecified(element, options);
      });
    }
    function getMergeFunction(key, options) {
      if (!options.customMerge) {
        return deepmerge2;
      }
      var customMerge = options.customMerge(key);
      return typeof customMerge === "function" ? customMerge : deepmerge2;
    }
    function getEnumerableOwnPropertySymbols(target) {
      return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
        return Object.propertyIsEnumerable.call(target, symbol);
      }) : [];
    }
    function getKeys(target) {
      return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
    }
    function propertyIsOnObject(object, property) {
      try {
        return property in object;
      } catch (_) {
        return false;
      }
    }
    function propertyIsUnsafe(target, key) {
      return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
    }
    function mergeObject(target, source, options) {
      var destination = {};
      if (options.isMergeableObject(target)) {
        getKeys(target).forEach(function(key) {
          destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
        });
      }
      getKeys(source).forEach(function(key) {
        if (propertyIsUnsafe(target, key)) {
          return;
        }
        if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
          destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
        } else {
          destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
        }
      });
      return destination;
    }
    function deepmerge2(target, source, options) {
      options = options || {};
      options.arrayMerge = options.arrayMerge || defaultArrayMerge;
      options.isMergeableObject = options.isMergeableObject || isMergeableObject;
      options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
      var sourceIsArray = Array.isArray(source);
      var targetIsArray = Array.isArray(target);
      var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
      if (!sourceAndTargetTypesMatch) {
        return cloneUnlessOtherwiseSpecified(source, options);
      } else if (sourceIsArray) {
        return options.arrayMerge(target, source, options);
      } else {
        return mergeObject(target, source, options);
      }
    }
    deepmerge2.all = function deepmergeAll(array, options) {
      if (!Array.isArray(array)) {
        throw new Error("first argument should be an array");
      }
      return array.reduce(function(prev, next) {
        return deepmerge2(prev, next, options);
      }, {});
    };
    var deepmerge_1 = deepmerge2;
    module2.exports = deepmerge_1;
  }
});

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  Button: () => Button
});
module.exports = __toCommonJS(src_exports);

// ../../node_modules/@vanilla-extract/css/injectStyles/dist/vanilla-extract-css-injectStyles.esm.js
var stylesheets = {};
var injectStyles = (_ref) => {
  var {
    fileScope,
    css
  } = _ref;
  var fileScopeId = fileScope.packageName ? [fileScope.packageName, fileScope.filePath].join("/") : fileScope.filePath;
  var stylesheet = stylesheets[fileScopeId];
  if (!stylesheet) {
    var styleEl = document.createElement("style");
    if (fileScope.packageName) {
      styleEl.setAttribute("data-package", fileScope.packageName);
    }
    styleEl.setAttribute("data-file", fileScope.filePath);
    styleEl.setAttribute("type", "text/css");
    stylesheet = stylesheets[fileScopeId] = styleEl;
    document.head.appendChild(styleEl);
  }
  stylesheet.innerHTML = css;
};

// ../../node_modules/@vanilla-extract/private/dist/vanilla-extract-private.esm.js
function getVarName(variable) {
  var matches = variable.match(/^var\((.*)\)$/);
  if (matches) {
    return matches[1];
  }
  return variable;
}
function get(obj, path) {
  var result = obj;
  for (var key of path) {
    if (!(key in result)) {
      throw new Error("Path ".concat(path.join(" -> "), " does not exist in object"));
    }
    result = result[key];
  }
  return result;
}
function walkObject(obj, fn) {
  var path = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
  var clone = {};
  for (var key in obj) {
    var _value = obj[key];
    var currentPath = [...path, key];
    if (typeof _value === "string" || typeof _value === "number" || _value == null) {
      clone[key] = fn(_value, currentPath);
    } else if (typeof _value === "object" && !Array.isArray(_value)) {
      clone[key] = walkObject(_value, fn, currentPath);
    } else {
      console.warn('Skipping invalid key "'.concat(currentPath.join("."), '". Should be a string, number, null or object. Received: "').concat(Array.isArray(_value) ? "Array" : typeof _value, '"'));
    }
  }
  return clone;
}

// ../../node_modules/@vanilla-extract/css/dist/transformCss-9149bda7.esm.js
var import_cssesc = __toESM(require_cssesc());

// ../../node_modules/modern-ahocorasick/dist/index.mjs
var AhoCorasick = class {
  constructor(keywords) {
    const { failure, gotoFn, output } = this._buildTables(keywords);
    this.gotoFn = gotoFn;
    this.output = output;
    this.failure = failure;
  }
  _buildTables(keywords) {
    const gotoFn = {
      0: {}
    };
    const output = {};
    let state = 0;
    for (const word of keywords) {
      let curr = 0;
      for (const l of word) {
        if (gotoFn[curr] && l in gotoFn[curr]) {
          curr = gotoFn[curr][l];
        } else {
          state++;
          gotoFn[curr][l] = state;
          gotoFn[state] = {};
          curr = state;
          output[state] = [];
        }
      }
      output[curr].push(word);
    }
    const failure = {};
    const xs = [];
    for (const l in gotoFn[0]) {
      const state2 = gotoFn[0][l];
      failure[state2] = 0;
      xs.push(state2);
    }
    while (xs.length > 0) {
      const r = xs.shift();
      if (r !== void 0) {
        for (const l in gotoFn[r]) {
          const s = gotoFn[r][l];
          xs.push(s);
          let state2 = failure[r];
          while (state2 > 0 && !(l in gotoFn[state2])) {
            state2 = failure[state2];
          }
          if (l in gotoFn[state2]) {
            const fs = gotoFn[state2][l];
            failure[s] = fs;
            output[s] = [...output[s], ...output[fs]];
          } else {
            failure[s] = 0;
          }
        }
      }
    }
    return {
      gotoFn,
      output,
      failure
    };
  }
  search(str) {
    let state = 0;
    const results = [];
    for (let i = 0; i < str.length; i++) {
      const l = str[i];
      while (state > 0 && !(l in this.gotoFn[state])) {
        state = this.failure[state];
      }
      if (!(l in this.gotoFn[state])) {
        continue;
      }
      state = this.gotoFn[state][l];
      if (this.output[state].length > 0) {
        const foundStrs = this.output[state];
        results.push([i, foundStrs]);
      }
    }
    return results;
  }
};

// ../../node_modules/@vanilla-extract/css/adapter/dist/vanilla-extract-css-adapter.esm.js
var mockAdapter = {
  appendCss: () => {
  },
  registerClassName: () => {
  },
  onEndFileScope: () => {
  },
  registerComposition: () => {
  },
  markCompositionUsed: () => {
  },
  getIdentOption: () => process.env.NODE_ENV === "production" ? "short" : "debug"
};
var adapterStack = [mockAdapter];
var currentAdapter = () => {
  if (adapterStack.length < 1) {
    throw new Error("No adapter configured");
  }
  return adapterStack[adapterStack.length - 1];
};
var hasConfiguredAdapter = false;
var setAdapterIfNotSet = (newAdapter) => {
  if (!hasConfiguredAdapter) {
    setAdapter(newAdapter);
  }
};
var setAdapter = (newAdapter) => {
  if (!newAdapter) {
    throw new Error('No adapter provided when calling "setAdapter"');
  }
  hasConfiguredAdapter = true;
  adapterStack.push(newAdapter);
};
var appendCss = function appendCss2() {
  return currentAdapter().appendCss(...arguments);
};
var registerClassName = function registerClassName2() {
  return currentAdapter().registerClassName(...arguments);
};
var registerComposition = function registerComposition2() {
  return currentAdapter().registerComposition(...arguments);
};
var markCompositionUsed = function markCompositionUsed2() {
  return currentAdapter().markCompositionUsed(...arguments);
};
var getIdentOption = function getIdentOption2() {
  var adapter = currentAdapter();
  if (!("getIdentOption" in adapter)) {
    return process.env.NODE_ENV === "production" ? "short" : "debug";
  }
  return adapter.getIdentOption(...arguments);
};

// ../../node_modules/@vanilla-extract/css/dist/taggedTemplateLiteral-10998315.esm.js
function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

// ../../node_modules/css-what/lib/es/types.js
var SelectorType;
(function(SelectorType2) {
  SelectorType2["Attribute"] = "attribute";
  SelectorType2["Pseudo"] = "pseudo";
  SelectorType2["PseudoElement"] = "pseudo-element";
  SelectorType2["Tag"] = "tag";
  SelectorType2["Universal"] = "universal";
  SelectorType2["Adjacent"] = "adjacent";
  SelectorType2["Child"] = "child";
  SelectorType2["Descendant"] = "descendant";
  SelectorType2["Parent"] = "parent";
  SelectorType2["Sibling"] = "sibling";
  SelectorType2["ColumnCombinator"] = "column-combinator";
})(SelectorType || (SelectorType = {}));
var AttributeAction;
(function(AttributeAction2) {
  AttributeAction2["Any"] = "any";
  AttributeAction2["Element"] = "element";
  AttributeAction2["End"] = "end";
  AttributeAction2["Equals"] = "equals";
  AttributeAction2["Exists"] = "exists";
  AttributeAction2["Hyphen"] = "hyphen";
  AttributeAction2["Not"] = "not";
  AttributeAction2["Start"] = "start";
})(AttributeAction || (AttributeAction = {}));

// ../../node_modules/css-what/lib/es/parse.js
var reName = /^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/;
var reEscape = /\\([\da-f]{1,6}\s?|(\s)|.)/gi;
var actionTypes = /* @__PURE__ */ new Map([
  [126, AttributeAction.Element],
  [94, AttributeAction.Start],
  [36, AttributeAction.End],
  [42, AttributeAction.Any],
  [33, AttributeAction.Not],
  [124, AttributeAction.Hyphen]
]);
var unpackPseudos = /* @__PURE__ */ new Set([
  "has",
  "not",
  "matches",
  "is",
  "where",
  "host",
  "host-context"
]);
function isTraversal(selector) {
  switch (selector.type) {
    case SelectorType.Adjacent:
    case SelectorType.Child:
    case SelectorType.Descendant:
    case SelectorType.Parent:
    case SelectorType.Sibling:
    case SelectorType.ColumnCombinator:
      return true;
    default:
      return false;
  }
}
var stripQuotesFromPseudos = /* @__PURE__ */ new Set(["contains", "icontains"]);
function funescape(_, escaped, escapedWhitespace) {
  const high = parseInt(escaped, 16) - 65536;
  return high !== high || escapedWhitespace ? escaped : high < 0 ? (
    // BMP codepoint
    String.fromCharCode(high + 65536)
  ) : (
    // Supplemental Plane codepoint (surrogate pair)
    String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320)
  );
}
function unescapeCSS(str) {
  return str.replace(reEscape, funescape);
}
function isQuote(c) {
  return c === 39 || c === 34;
}
function isWhitespace(c) {
  return c === 32 || c === 9 || c === 10 || c === 12 || c === 13;
}
function parse(selector) {
  const subselects = [];
  const endIndex = parseSelector(subselects, `${selector}`, 0);
  if (endIndex < selector.length) {
    throw new Error(`Unmatched selector: ${selector.slice(endIndex)}`);
  }
  return subselects;
}
function parseSelector(subselects, selector, selectorIndex) {
  let tokens = [];
  function getName(offset) {
    const match = selector.slice(selectorIndex + offset).match(reName);
    if (!match) {
      throw new Error(`Expected name, found ${selector.slice(selectorIndex)}`);
    }
    const [name] = match;
    selectorIndex += offset + name.length;
    return unescapeCSS(name);
  }
  function stripWhitespace(offset) {
    selectorIndex += offset;
    while (selectorIndex < selector.length && isWhitespace(selector.charCodeAt(selectorIndex))) {
      selectorIndex++;
    }
  }
  function readValueWithParenthesis() {
    selectorIndex += 1;
    const start = selectorIndex;
    let counter = 1;
    for (; counter > 0 && selectorIndex < selector.length; selectorIndex++) {
      if (selector.charCodeAt(selectorIndex) === 40 && !isEscaped(selectorIndex)) {
        counter++;
      } else if (selector.charCodeAt(selectorIndex) === 41 && !isEscaped(selectorIndex)) {
        counter--;
      }
    }
    if (counter) {
      throw new Error("Parenthesis not matched");
    }
    return unescapeCSS(selector.slice(start, selectorIndex - 1));
  }
  function isEscaped(pos) {
    let slashCount = 0;
    while (selector.charCodeAt(--pos) === 92)
      slashCount++;
    return (slashCount & 1) === 1;
  }
  function ensureNotTraversal() {
    if (tokens.length > 0 && isTraversal(tokens[tokens.length - 1])) {
      throw new Error("Did not expect successive traversals.");
    }
  }
  function addTraversal(type) {
    if (tokens.length > 0 && tokens[tokens.length - 1].type === SelectorType.Descendant) {
      tokens[tokens.length - 1].type = type;
      return;
    }
    ensureNotTraversal();
    tokens.push({ type });
  }
  function addSpecialAttribute(name, action) {
    tokens.push({
      type: SelectorType.Attribute,
      name,
      action,
      value: getName(1),
      namespace: null,
      ignoreCase: "quirks"
    });
  }
  function finalizeSubselector() {
    if (tokens.length && tokens[tokens.length - 1].type === SelectorType.Descendant) {
      tokens.pop();
    }
    if (tokens.length === 0) {
      throw new Error("Empty sub-selector");
    }
    subselects.push(tokens);
  }
  stripWhitespace(0);
  if (selector.length === selectorIndex) {
    return selectorIndex;
  }
  loop: while (selectorIndex < selector.length) {
    const firstChar = selector.charCodeAt(selectorIndex);
    switch (firstChar) {
      case 32:
      case 9:
      case 10:
      case 12:
      case 13: {
        if (tokens.length === 0 || tokens[0].type !== SelectorType.Descendant) {
          ensureNotTraversal();
          tokens.push({ type: SelectorType.Descendant });
        }
        stripWhitespace(1);
        break;
      }
      case 62: {
        addTraversal(SelectorType.Child);
        stripWhitespace(1);
        break;
      }
      case 60: {
        addTraversal(SelectorType.Parent);
        stripWhitespace(1);
        break;
      }
      case 126: {
        addTraversal(SelectorType.Sibling);
        stripWhitespace(1);
        break;
      }
      case 43: {
        addTraversal(SelectorType.Adjacent);
        stripWhitespace(1);
        break;
      }
      case 46: {
        addSpecialAttribute("class", AttributeAction.Element);
        break;
      }
      case 35: {
        addSpecialAttribute("id", AttributeAction.Equals);
        break;
      }
      case 91: {
        stripWhitespace(1);
        let name;
        let namespace = null;
        if (selector.charCodeAt(selectorIndex) === 124) {
          name = getName(1);
        } else if (selector.startsWith("*|", selectorIndex)) {
          namespace = "*";
          name = getName(2);
        } else {
          name = getName(0);
          if (selector.charCodeAt(selectorIndex) === 124 && selector.charCodeAt(selectorIndex + 1) !== 61) {
            namespace = name;
            name = getName(1);
          }
        }
        stripWhitespace(0);
        let action = AttributeAction.Exists;
        const possibleAction = actionTypes.get(selector.charCodeAt(selectorIndex));
        if (possibleAction) {
          action = possibleAction;
          if (selector.charCodeAt(selectorIndex + 1) !== 61) {
            throw new Error("Expected `=`");
          }
          stripWhitespace(2);
        } else if (selector.charCodeAt(selectorIndex) === 61) {
          action = AttributeAction.Equals;
          stripWhitespace(1);
        }
        let value = "";
        let ignoreCase = null;
        if (action !== "exists") {
          if (isQuote(selector.charCodeAt(selectorIndex))) {
            const quote = selector.charCodeAt(selectorIndex);
            let sectionEnd = selectorIndex + 1;
            while (sectionEnd < selector.length && (selector.charCodeAt(sectionEnd) !== quote || isEscaped(sectionEnd))) {
              sectionEnd += 1;
            }
            if (selector.charCodeAt(sectionEnd) !== quote) {
              throw new Error("Attribute value didn't end");
            }
            value = unescapeCSS(selector.slice(selectorIndex + 1, sectionEnd));
            selectorIndex = sectionEnd + 1;
          } else {
            const valueStart = selectorIndex;
            while (selectorIndex < selector.length && (!isWhitespace(selector.charCodeAt(selectorIndex)) && selector.charCodeAt(selectorIndex) !== 93 || isEscaped(selectorIndex))) {
              selectorIndex += 1;
            }
            value = unescapeCSS(selector.slice(valueStart, selectorIndex));
          }
          stripWhitespace(0);
          const forceIgnore = selector.charCodeAt(selectorIndex) | 32;
          if (forceIgnore === 115) {
            ignoreCase = false;
            stripWhitespace(1);
          } else if (forceIgnore === 105) {
            ignoreCase = true;
            stripWhitespace(1);
          }
        }
        if (selector.charCodeAt(selectorIndex) !== 93) {
          throw new Error("Attribute selector didn't terminate");
        }
        selectorIndex += 1;
        const attributeSelector = {
          type: SelectorType.Attribute,
          name,
          action,
          value,
          namespace,
          ignoreCase
        };
        tokens.push(attributeSelector);
        break;
      }
      case 58: {
        if (selector.charCodeAt(selectorIndex + 1) === 58) {
          tokens.push({
            type: SelectorType.PseudoElement,
            name: getName(2).toLowerCase(),
            data: selector.charCodeAt(selectorIndex) === 40 ? readValueWithParenthesis() : null
          });
          continue;
        }
        const name = getName(1).toLowerCase();
        let data = null;
        if (selector.charCodeAt(selectorIndex) === 40) {
          if (unpackPseudos.has(name)) {
            if (isQuote(selector.charCodeAt(selectorIndex + 1))) {
              throw new Error(`Pseudo-selector ${name} cannot be quoted`);
            }
            data = [];
            selectorIndex = parseSelector(data, selector, selectorIndex + 1);
            if (selector.charCodeAt(selectorIndex) !== 41) {
              throw new Error(`Missing closing parenthesis in :${name} (${selector})`);
            }
            selectorIndex += 1;
          } else {
            data = readValueWithParenthesis();
            if (stripQuotesFromPseudos.has(name)) {
              const quot = data.charCodeAt(0);
              if (quot === data.charCodeAt(data.length - 1) && isQuote(quot)) {
                data = data.slice(1, -1);
              }
            }
            data = unescapeCSS(data);
          }
        }
        tokens.push({ type: SelectorType.Pseudo, name, data });
        break;
      }
      case 44: {
        finalizeSubselector();
        tokens = [];
        stripWhitespace(1);
        break;
      }
      default: {
        if (selector.startsWith("/*", selectorIndex)) {
          const endIndex = selector.indexOf("*/", selectorIndex + 2);
          if (endIndex < 0) {
            throw new Error("Comment was not terminated");
          }
          selectorIndex = endIndex + 2;
          if (tokens.length === 0) {
            stripWhitespace(0);
          }
          break;
        }
        let namespace = null;
        let name;
        if (firstChar === 42) {
          selectorIndex += 1;
          name = "*";
        } else if (firstChar === 124) {
          name = "";
          if (selector.charCodeAt(selectorIndex + 1) === 124) {
            addTraversal(SelectorType.ColumnCombinator);
            stripWhitespace(2);
            break;
          }
        } else if (reName.test(selector.slice(selectorIndex))) {
          name = getName(0);
        } else {
          break loop;
        }
        if (selector.charCodeAt(selectorIndex) === 124 && selector.charCodeAt(selectorIndex + 1) !== 124) {
          namespace = name;
          if (selector.charCodeAt(selectorIndex + 1) === 42) {
            name = "*";
            selectorIndex += 2;
          } else {
            name = getName(1);
          }
        }
        tokens.push(name === "*" ? { type: SelectorType.Universal, namespace } : { type: SelectorType.Tag, name, namespace });
      }
    }
  }
  finalizeSubselector();
  return selectorIndex;
}

// ../../node_modules/dedent/dist/dedent.mjs
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var dedent = createDedent({});
var dedent_default = dedent;
function createDedent(options) {
  dedent2.withOptions = (newOptions) => createDedent(_objectSpread(_objectSpread({}, options), newOptions));
  return dedent2;
  function dedent2(strings, ...values) {
    const raw = typeof strings === "string" ? [strings] : strings.raw;
    const {
      escapeSpecialCharacters = Array.isArray(strings)
    } = options;
    let result = "";
    for (let i = 0; i < raw.length; i++) {
      let next = raw[i];
      if (escapeSpecialCharacters) {
        next = next.replace(/\\\n[ \t]*/g, "").replace(/\\`/g, "`").replace(/\\\$/g, "$").replace(/\\\{/g, "{");
      }
      result += next;
      if (i < values.length) {
        result += values[i];
      }
    }
    const lines = result.split("\n");
    let mindent = null;
    for (const l of lines) {
      const m = l.match(/^(\s+)\S+/);
      if (m) {
        const indent = m[1].length;
        if (!mindent) {
          mindent = indent;
        } else {
          mindent = Math.min(mindent, indent);
        }
      }
    }
    if (mindent !== null) {
      const m = mindent;
      result = lines.map((l) => l[0] === " " || l[0] === "	" ? l.slice(m) : l).join("\n");
    }
    result = result.trim();
    if (escapeSpecialCharacters) {
      result = result.replace(/\\n/g, "\n");
    }
    return result;
  }
}

// ../../node_modules/media-query-parser/dist/media-query-parser.esm.js
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}
var weirdNewlines = /(\u000D|\u000C|\u000D\u000A)/g;
var nullOrSurrogates = /[\u0000\uD800-\uDFFF]/g;
var commentRegex = /(\/\*)[\s\S]*?(\*\/)/g;
var lexicalAnalysis = function lexicalAnalysis2(str, index) {
  if (index === void 0) {
    index = 0;
  }
  str = str.replace(weirdNewlines, "\n").replace(nullOrSurrogates, "\uFFFD");
  str = str.replace(commentRegex, "");
  var tokens = [];
  for (; index < str.length; index += 1) {
    var code = str.charCodeAt(index);
    if (code === 9 || code === 32 || code === 10) {
      var code_1 = str.charCodeAt(++index);
      while (code_1 === 9 || code_1 === 32 || code_1 === 10) {
        code_1 = str.charCodeAt(++index);
      }
      index -= 1;
      tokens.push({
        type: "<whitespace-token>"
      });
    } else if (code === 34) {
      var result = consumeString(str, index);
      if (result === null) {
        return null;
      }
      var _a = __read(result, 2), lastIndex = _a[0], value = _a[1];
      tokens.push({
        type: "<string-token>",
        value
      });
      index = lastIndex;
    } else if (code === 35) {
      if (index + 1 < str.length) {
        var nextCode = str.charCodeAt(index + 1);
        if (nextCode === 95 || nextCode >= 65 && nextCode <= 90 || nextCode >= 97 && nextCode <= 122 || nextCode >= 128 || nextCode >= 48 && nextCode <= 57 || nextCode === 92 && index + 2 < str.length && str.charCodeAt(index + 2) !== 10) {
          var flag = wouldStartIdentifier(str, index + 1) ? "id" : "unrestricted";
          var result = consumeIdentUnsafe(str, index + 1);
          if (result !== null) {
            var _b = __read(result, 2), lastIndex = _b[0], value = _b[1];
            tokens.push({
              type: "<hash-token>",
              value: value.toLowerCase(),
              flag
            });
            index = lastIndex;
            continue;
          }
        }
      }
      tokens.push({
        type: "<delim-token>",
        value: code
      });
    } else if (code === 39) {
      var result = consumeString(str, index);
      if (result === null) {
        return null;
      }
      var _c = __read(result, 2), lastIndex = _c[0], value = _c[1];
      tokens.push({
        type: "<string-token>",
        value
      });
      index = lastIndex;
    } else if (code === 40) {
      tokens.push({
        type: "<(-token>"
      });
    } else if (code === 41) {
      tokens.push({
        type: "<)-token>"
      });
    } else if (code === 43) {
      var plusNumeric = consumeNumeric(str, index);
      if (plusNumeric === null) {
        tokens.push({
          type: "<delim-token>",
          value: code
        });
      } else {
        var _d = __read(plusNumeric, 2), lastIndex = _d[0], tokenTuple = _d[1];
        if (tokenTuple[0] === "<dimension-token>") {
          tokens.push({
            type: "<dimension-token>",
            value: tokenTuple[1],
            unit: tokenTuple[2].toLowerCase(),
            flag: "number"
          });
        } else if (tokenTuple[0] === "<number-token>") {
          tokens.push({
            type: tokenTuple[0],
            value: tokenTuple[1],
            flag: tokenTuple[2]
          });
        } else {
          tokens.push({
            type: tokenTuple[0],
            value: tokenTuple[1],
            flag: "number"
          });
        }
        index = lastIndex;
      }
    } else if (code === 44) {
      tokens.push({
        type: "<comma-token>"
      });
    } else if (code === 45) {
      var minusNumeric = consumeNumeric(str, index);
      if (minusNumeric !== null) {
        var _e = __read(minusNumeric, 2), lastIndex = _e[0], tokenTuple = _e[1];
        if (tokenTuple[0] === "<dimension-token>") {
          tokens.push({
            type: "<dimension-token>",
            value: tokenTuple[1],
            unit: tokenTuple[2].toLowerCase(),
            flag: "number"
          });
        } else if (tokenTuple[0] === "<number-token>") {
          tokens.push({
            type: tokenTuple[0],
            value: tokenTuple[1],
            flag: tokenTuple[2]
          });
        } else {
          tokens.push({
            type: tokenTuple[0],
            value: tokenTuple[1],
            flag: "number"
          });
        }
        index = lastIndex;
        continue;
      }
      if (index + 2 < str.length) {
        var nextCode = str.charCodeAt(index + 1);
        var nextNextCode = str.charCodeAt(index + 2);
        if (nextCode === 45 && nextNextCode === 62) {
          tokens.push({
            type: "<CDC-token>"
          });
          index += 2;
          continue;
        }
      }
      var result = consumeIdentLike(str, index);
      if (result !== null) {
        var _f = __read(result, 3), lastIndex = _f[0], value = _f[1], type = _f[2];
        tokens.push({
          type,
          value
        });
        index = lastIndex;
        continue;
      }
      tokens.push({
        type: "<delim-token>",
        value: code
      });
    } else if (code === 46) {
      var minusNumeric = consumeNumeric(str, index);
      if (minusNumeric === null) {
        tokens.push({
          type: "<delim-token>",
          value: code
        });
      } else {
        var _g = __read(minusNumeric, 2), lastIndex = _g[0], tokenTuple = _g[1];
        if (tokenTuple[0] === "<dimension-token>") {
          tokens.push({
            type: "<dimension-token>",
            value: tokenTuple[1],
            unit: tokenTuple[2].toLowerCase(),
            flag: "number"
          });
        } else if (tokenTuple[0] === "<number-token>") {
          tokens.push({
            type: tokenTuple[0],
            value: tokenTuple[1],
            flag: tokenTuple[2]
          });
        } else {
          tokens.push({
            type: tokenTuple[0],
            value: tokenTuple[1],
            flag: "number"
          });
        }
        index = lastIndex;
        continue;
      }
    } else if (code === 58) {
      tokens.push({
        type: "<colon-token>"
      });
    } else if (code === 59) {
      tokens.push({
        type: "<semicolon-token>"
      });
    } else if (code === 60) {
      if (index + 3 < str.length) {
        var nextCode = str.charCodeAt(index + 1);
        var nextNextCode = str.charCodeAt(index + 2);
        var nextNextNextCode = str.charCodeAt(index + 3);
        if (nextCode === 33 && nextNextCode === 45 && nextNextNextCode === 45) {
          tokens.push({
            type: "<CDO-token>"
          });
          index += 3;
          continue;
        }
      }
      tokens.push({
        type: "<delim-token>",
        value: code
      });
    } else if (code === 64) {
      var result = consumeIdent(str, index + 1);
      if (result !== null) {
        var _h = __read(result, 2), lastIndex = _h[0], value = _h[1];
        tokens.push({
          type: "<at-keyword-token>",
          value: value.toLowerCase()
        });
        index = lastIndex;
        continue;
      }
      tokens.push({
        type: "<delim-token>",
        value: code
      });
    } else if (code === 91) {
      tokens.push({
        type: "<[-token>"
      });
    } else if (code === 92) {
      var result = consumeEscape(str, index);
      if (result === null) {
        return null;
      }
      var _j = __read(result, 2), lastIndex = _j[0], value = _j[1];
      str = str.slice(0, index) + value + str.slice(lastIndex + 1);
      index -= 1;
    } else if (code === 93) {
      tokens.push({
        type: "<]-token>"
      });
    } else if (code === 123) {
      tokens.push({
        type: "<{-token>"
      });
    } else if (code === 125) {
      tokens.push({
        type: "<}-token>"
      });
    } else if (code >= 48 && code <= 57) {
      var result = consumeNumeric(str, index);
      var _k = __read(result, 2), lastIndex = _k[0], tokenTuple = _k[1];
      if (tokenTuple[0] === "<dimension-token>") {
        tokens.push({
          type: "<dimension-token>",
          value: tokenTuple[1],
          unit: tokenTuple[2].toLowerCase(),
          flag: "number"
        });
      } else if (tokenTuple[0] === "<number-token>") {
        tokens.push({
          type: tokenTuple[0],
          value: tokenTuple[1],
          flag: tokenTuple[2]
        });
      } else {
        tokens.push({
          type: tokenTuple[0],
          value: tokenTuple[1],
          flag: "number"
        });
      }
      index = lastIndex;
    } else if (code === 95 || code >= 65 && code <= 90 || code >= 97 && code <= 122 || code >= 128) {
      var result = consumeIdentLike(str, index);
      if (result === null) {
        return null;
      }
      var _l = __read(result, 3), lastIndex = _l[0], value = _l[1], type = _l[2];
      tokens.push({
        type,
        value
      });
      index = lastIndex;
    } else {
      tokens.push({
        type: "<delim-token>",
        value: code
      });
    }
  }
  tokens.push({
    type: "<EOF-token>"
  });
  return tokens;
};
var consumeString = function consumeString2(str, index) {
  if (str.length <= index + 1) return null;
  var firstCode = str.charCodeAt(index);
  var charCodes = [];
  for (var i = index + 1; i < str.length; i += 1) {
    var code = str.charCodeAt(i);
    if (code === firstCode) {
      return [i, String.fromCharCode.apply(null, charCodes)];
    } else if (code === 92) {
      var result = consumeEscape(str, i);
      if (result === null) return null;
      var _a = __read(result, 2), lastIndex = _a[0], charCode = _a[1];
      charCodes.push(charCode);
      i = lastIndex;
    } else if (code === 10) {
      return null;
    } else {
      charCodes.push(code);
    }
  }
  return null;
};
var wouldStartIdentifier = function wouldStartIdentifier2(str, index) {
  if (str.length <= index) return false;
  var code = str.charCodeAt(index);
  if (code === 45) {
    if (str.length <= index + 1) return false;
    var nextCode = str.charCodeAt(index + 1);
    if (nextCode === 45 || nextCode === 95 || nextCode >= 65 && nextCode <= 90 || nextCode >= 97 && nextCode <= 122 || nextCode >= 128) {
      return true;
    } else if (nextCode === 92) {
      if (str.length <= index + 2) return false;
      var nextNextCode = str.charCodeAt(index + 2);
      return nextNextCode !== 10;
    } else {
      return false;
    }
  } else if (code === 95 || code >= 65 && code <= 90 || code >= 97 && code <= 122 || code >= 128) {
    return true;
  } else if (code === 92) {
    if (str.length <= index + 1) return false;
    var nextCode = str.charCodeAt(index + 1);
    return nextCode !== 10;
  } else {
    return false;
  }
};
var consumeEscape = function consumeEscape2(str, index) {
  if (str.length <= index + 1) return null;
  if (str.charCodeAt(index) !== 92) return null;
  var code = str.charCodeAt(index + 1);
  if (code === 10) {
    return null;
  } else if (code >= 48 && code <= 57 || code >= 65 && code <= 70 || code >= 97 && code <= 102) {
    var hexCharCodes = [code];
    var min = Math.min(index + 7, str.length);
    var i = index + 2;
    for (; i < min; i += 1) {
      var code_2 = str.charCodeAt(i);
      if (code_2 >= 48 && code_2 <= 57 || code_2 >= 65 && code_2 <= 70 || code_2 >= 97 && code_2 <= 102) {
        hexCharCodes.push(code_2);
      } else {
        break;
      }
    }
    if (i < str.length) {
      var code_3 = str.charCodeAt(i);
      if (code_3 === 9 || code_3 === 32 || code_3 === 10) {
        i += 1;
      }
    }
    return [i - 1, parseInt(String.fromCharCode.apply(null, hexCharCodes), 16)];
  } else {
    return [index + 1, code];
  }
};
var consumeNumeric = function consumeNumeric2(str, index) {
  var numberResult = consumeNumber(str, index);
  if (numberResult === null) return null;
  var _a = __read(numberResult, 3), numberEndIndex = _a[0], numberValue = _a[1], numberFlag = _a[2];
  var identResult = consumeIdent(str, numberEndIndex + 1);
  if (identResult !== null) {
    var _b = __read(identResult, 2), identEndIndex = _b[0], identValue = _b[1];
    return [identEndIndex, ["<dimension-token>", numberValue, identValue]];
  }
  if (numberEndIndex + 1 < str.length && str.charCodeAt(numberEndIndex + 1) === 37) {
    return [numberEndIndex + 1, ["<percentage-token>", numberValue]];
  }
  return [numberEndIndex, ["<number-token>", numberValue, numberFlag]];
};
var consumeNumber = function consumeNumber2(str, index) {
  if (str.length <= index) return null;
  var flag = "integer";
  var numberChars = [];
  var firstCode = str.charCodeAt(index);
  if (firstCode === 43 || firstCode === 45) {
    index += 1;
    if (firstCode === 45) numberChars.push(45);
  }
  while (index < str.length) {
    var code = str.charCodeAt(index);
    if (code >= 48 && code <= 57) {
      numberChars.push(code);
      index += 1;
    } else {
      break;
    }
  }
  if (index + 1 < str.length) {
    var nextCode = str.charCodeAt(index);
    var nextNextCode = str.charCodeAt(index + 1);
    if (nextCode === 46 && nextNextCode >= 48 && nextNextCode <= 57) {
      numberChars.push(nextCode, nextNextCode);
      flag = "number";
      index += 2;
      while (index < str.length) {
        var code = str.charCodeAt(index);
        if (code >= 48 && code <= 57) {
          numberChars.push(code);
          index += 1;
        } else {
          break;
        }
      }
    }
  }
  if (index + 1 < str.length) {
    var nextCode = str.charCodeAt(index);
    var nextNextCode = str.charCodeAt(index + 1);
    var nextNextNextCode = str.charCodeAt(index + 2);
    if (nextCode === 69 || nextCode === 101) {
      var nextNextIsDigit = nextNextCode >= 48 && nextNextCode <= 57;
      if (nextNextIsDigit || (nextNextCode === 43 || nextNextCode === 45) && nextNextNextCode >= 48 && nextNextNextCode <= 57) {
        flag = "number";
        if (nextNextIsDigit) {
          numberChars.push(69, nextNextCode);
          index += 2;
        } else if (nextNextCode === 45) {
          numberChars.push(69, 45, nextNextNextCode);
          index += 3;
        } else {
          numberChars.push(69, nextNextNextCode);
          index += 3;
        }
        while (index < str.length) {
          var code = str.charCodeAt(index);
          if (code >= 48 && code <= 57) {
            numberChars.push(code);
            index += 1;
          } else {
            break;
          }
        }
      }
    }
  }
  var numberString = String.fromCharCode.apply(null, numberChars);
  var value = flag === "number" ? parseFloat(numberString) : parseInt(numberString);
  if (value === -0) value = 0;
  return Number.isNaN(value) ? null : [index - 1, value, flag];
};
var consumeIdentUnsafe = function consumeIdentUnsafe2(str, index) {
  if (str.length <= index) {
    return null;
  }
  var identChars = [];
  for (var code = str.charCodeAt(index); index < str.length; code = str.charCodeAt(++index)) {
    if (code === 45 || code === 95 || code >= 65 && code <= 90 || code >= 97 && code <= 122 || code >= 128 || code >= 48 && code <= 57) {
      identChars.push(code);
      continue;
    } else {
      var result = consumeEscape(str, index);
      if (result !== null) {
        var _a = __read(result, 2), lastIndex = _a[0], code_4 = _a[1];
        identChars.push(code_4);
        index = lastIndex;
        continue;
      }
    }
    break;
  }
  return index === 0 ? null : [index - 1, String.fromCharCode.apply(null, identChars)];
};
var consumeIdent = function consumeIdent2(str, index) {
  if (str.length <= index || !wouldStartIdentifier(str, index)) {
    return null;
  }
  var identChars = [];
  for (var code = str.charCodeAt(index); index < str.length; code = str.charCodeAt(++index)) {
    if (code === 45 || code === 95 || code >= 65 && code <= 90 || code >= 97 && code <= 122 || code >= 128 || code >= 48 && code <= 57) {
      identChars.push(code);
      continue;
    } else {
      var result = consumeEscape(str, index);
      if (result !== null) {
        var _a = __read(result, 2), lastIndex = _a[0], code_5 = _a[1];
        identChars.push(code_5);
        index = lastIndex;
        continue;
      }
    }
    break;
  }
  return [index - 1, String.fromCharCode.apply(null, identChars)];
};
var consumeUrl = function consumeUrl2(str, index) {
  var code = str.charCodeAt(index);
  while (code === 9 || code === 32 || code === 10) {
    code = str.charCodeAt(++index);
  }
  var urlChars = [];
  var hasFinishedWord = false;
  while (index < str.length) {
    if (code === 41) {
      return [index, String.fromCharCode.apply(null, urlChars)];
    } else if (code === 34 || code === 39 || code === 40) {
      return null;
    } else if (code === 9 || code === 32 || code === 10) {
      if (!hasFinishedWord && urlChars.length !== 0) hasFinishedWord = true;
    } else if (code === 92) {
      var result = consumeEscape(str, index);
      if (result === null || hasFinishedWord) return null;
      var _a = __read(result, 2), lastIndex = _a[0], value = _a[1];
      urlChars.push(value);
      index = lastIndex;
    } else {
      if (hasFinishedWord) return null;
      urlChars.push(code);
    }
    code = str.charCodeAt(++index);
  }
  return null;
};
var consumeIdentLike = function consumeIdentLike2(str, index) {
  var result = consumeIdent(str, index);
  if (result === null) return null;
  var _a = __read(result, 2), lastIndex = _a[0], value = _a[1];
  if (value.toLowerCase() === "url") {
    if (str.length > lastIndex + 1) {
      var nextCode = str.charCodeAt(lastIndex + 1);
      if (nextCode === 40) {
        for (var offset = 2; lastIndex + offset < str.length; offset += 1) {
          var nextNextCode = str.charCodeAt(lastIndex + offset);
          if (nextNextCode === 34 || nextNextCode === 39) {
            return [lastIndex + 1, value.toLowerCase(), "<function-token>"];
          } else if (nextNextCode !== 9 && nextNextCode !== 32 && nextNextCode !== 10) {
            var result_1 = consumeUrl(str, lastIndex + offset);
            if (result_1 === null) return null;
            var _b = __read(result_1, 2), lastUrlIndex = _b[0], value_1 = _b[1];
            return [lastUrlIndex, value_1, "<url-token>"];
          }
        }
        return [lastIndex + 1, value.toLowerCase(), "<function-token>"];
      }
    }
  } else if (str.length > lastIndex + 1) {
    var nextCode = str.charCodeAt(lastIndex + 1);
    if (nextCode === 40) {
      return [lastIndex + 1, value.toLowerCase(), "<function-token>"];
    }
  }
  return [lastIndex, value.toLowerCase(), "<ident-token>"];
};
var simplifyAST = function simplifyAST2(ast) {
  for (var i = ast.length - 1; i >= 0; i--) {
    ast[i] = simplifyMediaQuery(ast[i]);
  }
  return ast;
};
var simplifyMediaQuery = function simplifyMediaQuery2(mediaQuery) {
  if (mediaQuery.mediaCondition === null) return mediaQuery;
  var mediaCondition = simplifyMediaCondition(mediaQuery.mediaCondition);
  if (mediaCondition.operator === null && mediaCondition.children.length === 1 && "children" in mediaCondition.children[0]) {
    mediaCondition = mediaCondition.children[0];
  }
  return {
    mediaPrefix: mediaQuery.mediaPrefix,
    mediaType: mediaQuery.mediaType,
    mediaCondition
  };
};
var simplifyMediaCondition = function simplifyMediaCondition2(mediaCondition) {
  for (var i = mediaCondition.children.length - 1; i >= 0; i--) {
    var unsimplifiedChild = mediaCondition.children[i];
    if (!("context" in unsimplifiedChild)) {
      var child = simplifyMediaCondition2(unsimplifiedChild);
      if (child.operator === null && child.children.length === 1) {
        mediaCondition.children[i] = child.children[0];
      } else if (child.operator === mediaCondition.operator && (child.operator === "and" || child.operator === "or")) {
        var spliceArgs = [i, 1];
        for (var i_1 = 0; i_1 < child.children.length; i_1++) {
          spliceArgs.push(child.children[i_1]);
        }
        mediaCondition.children.splice.apply(mediaCondition.children, spliceArgs);
      }
    }
  }
  return mediaCondition;
};
var createError = function createError2(message, err) {
  if (err instanceof Error) {
    return new Error("".concat(err.message.trim(), "\n").concat(message.trim()));
  } else {
    return new Error(message.trim());
  }
};
var toAST = function toAST2(str) {
  return simplifyAST(toUnflattenedAST(str));
};
var toUnflattenedAST = function toUnflattenedAST2(str) {
  var tokenList = lexicalAnalysis(str.trim());
  if (tokenList === null) {
    throw createError("Failed tokenizing");
  }
  var startIndex = 0;
  var endIndex = tokenList.length - 1;
  if (tokenList[0].type === "<at-keyword-token>" && tokenList[0].value === "media") {
    if (tokenList[1].type !== "<whitespace-token>") {
      throw createError("Expected whitespace after media");
    }
    startIndex = 2;
    for (var i = 2; i < tokenList.length - 1; i++) {
      var token = tokenList[i];
      if (token.type === "<{-token>") {
        endIndex = i;
        break;
      } else if (token.type === "<semicolon-token>") {
        throw createError("Expected '{' in media query but found ';'");
      }
    }
  }
  tokenList = tokenList.slice(startIndex, endIndex);
  return syntacticAnalysis(tokenList);
};
var removeWhitespace = function removeWhitespace2(tokenList) {
  var newTokenList = [];
  var before = false;
  for (var i = 0; i < tokenList.length; i++) {
    if (tokenList[i].type === "<whitespace-token>") {
      before = true;
      if (newTokenList.length > 0) {
        newTokenList[newTokenList.length - 1].wsAfter = true;
      }
    } else {
      newTokenList.push(__assign(__assign({}, tokenList[i]), {
        wsBefore: before,
        wsAfter: false
      }));
      before = false;
    }
  }
  return newTokenList;
};
var syntacticAnalysis = function syntacticAnalysis2(tokenList) {
  var e_1, _a;
  var mediaQueryList = [[]];
  for (var i = 0; i < tokenList.length; i++) {
    var token = tokenList[i];
    if (token.type === "<comma-token>") {
      mediaQueryList.push([]);
    } else {
      mediaQueryList[mediaQueryList.length - 1].push(token);
    }
  }
  var mediaQueries = mediaQueryList.map(removeWhitespace);
  if (mediaQueries.length === 1 && mediaQueries[0].length === 0) {
    return [{
      mediaCondition: null,
      mediaPrefix: null,
      mediaType: "all"
    }];
  } else {
    var mediaQueryTokens = mediaQueries.map(function(mediaQueryTokens2) {
      if (mediaQueryTokens2.length === 0) {
        return null;
      } else {
        return tokenizeMediaQuery(mediaQueryTokens2);
      }
    });
    var nonNullMediaQueryTokens = [];
    try {
      for (var mediaQueryTokens_1 = __values(mediaQueryTokens), mediaQueryTokens_1_1 = mediaQueryTokens_1.next(); !mediaQueryTokens_1_1.done; mediaQueryTokens_1_1 = mediaQueryTokens_1.next()) {
        var mediaQueryToken = mediaQueryTokens_1_1.value;
        if (mediaQueryToken !== null) {
          nonNullMediaQueryTokens.push(mediaQueryToken);
        }
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (mediaQueryTokens_1_1 && !mediaQueryTokens_1_1.done && (_a = mediaQueryTokens_1["return"])) _a.call(mediaQueryTokens_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    if (nonNullMediaQueryTokens.length === 0) {
      throw createError("No valid media queries");
    }
    return nonNullMediaQueryTokens;
  }
};
var tokenizeMediaQuery = function tokenizeMediaQuery2(tokens) {
  var firstToken = tokens[0];
  if (firstToken.type === "<(-token>") {
    try {
      return {
        mediaPrefix: null,
        mediaType: "all",
        mediaCondition: tokenizeMediaCondition(tokens, true)
      };
    } catch (err) {
      throw createError("Expected media condition after '('", err);
    }
  } else if (firstToken.type === "<ident-token>") {
    var mediaPrefix = null;
    var mediaType = void 0;
    var value = firstToken.value;
    if (value === "only" || value === "not") {
      mediaPrefix = value;
    }
    var firstIndex = mediaPrefix === null ? 0 : 1;
    if (tokens.length <= firstIndex) {
      throw createError("Expected extra token in media query");
    }
    var firstNonUnaryToken = tokens[firstIndex];
    if (firstNonUnaryToken.type === "<ident-token>") {
      var value_1 = firstNonUnaryToken.value;
      if (value_1 === "all") {
        mediaType = "all";
      } else if (value_1 === "print" || value_1 === "screen") {
        mediaType = value_1;
      } else if (value_1 === "tty" || value_1 === "tv" || value_1 === "projection" || value_1 === "handheld" || value_1 === "braille" || value_1 === "embossed" || value_1 === "aural" || value_1 === "speech") {
        mediaPrefix = mediaPrefix === "not" ? null : "not";
        mediaType = "all";
      } else {
        throw createError("Unknown ident '".concat(value_1, "' in media query"));
      }
    } else if (mediaPrefix === "not" && firstNonUnaryToken.type === "<(-token>") {
      var tokensWithParens = [{
        type: "<(-token>",
        wsBefore: false,
        wsAfter: false
      }];
      tokensWithParens.push.apply(tokensWithParens, tokens);
      tokensWithParens.push({
        type: "<)-token>",
        wsBefore: false,
        wsAfter: false
      });
      try {
        return {
          mediaPrefix: null,
          mediaType: "all",
          mediaCondition: tokenizeMediaCondition(tokensWithParens, true)
        };
      } catch (err) {
        throw createError("Expected media condition after '('", err);
      }
    } else {
      throw createError("Invalid media query");
    }
    if (firstIndex + 1 === tokens.length) {
      return {
        mediaPrefix,
        mediaType,
        mediaCondition: null
      };
    } else if (firstIndex + 4 < tokens.length) {
      var secondNonUnaryToken = tokens[firstIndex + 1];
      if (secondNonUnaryToken.type === "<ident-token>" && secondNonUnaryToken.value === "and") {
        try {
          return {
            mediaPrefix,
            mediaType,
            mediaCondition: tokenizeMediaCondition(tokens.slice(firstIndex + 2), false)
          };
        } catch (err) {
          throw createError("Expected media condition after 'and'", err);
        }
      } else {
        throw createError("Expected 'and' after media prefix");
      }
    } else {
      throw createError("Expected media condition after media prefix");
    }
  } else {
    throw createError("Expected media condition or media prefix");
  }
};
var tokenizeMediaCondition = function tokenizeMediaCondition2(tokens, mayContainOr, previousOperator) {
  if (previousOperator === void 0) {
    previousOperator = null;
  }
  if (tokens.length < 3 || tokens[0].type !== "<(-token>" || tokens[tokens.length - 1].type !== "<)-token>") {
    throw new Error("Invalid media condition");
  }
  var endIndexOfFirstFeature = tokens.length - 1;
  var maxDepth = 0;
  var count = 0;
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (token.type === "<(-token>") {
      count += 1;
      maxDepth = Math.max(maxDepth, count);
    } else if (token.type === "<)-token>") {
      count -= 1;
    }
    if (count === 0) {
      endIndexOfFirstFeature = i;
      break;
    }
  }
  if (count !== 0) {
    throw new Error("Mismatched parens\nInvalid media condition");
  }
  var child;
  var featureTokens = tokens.slice(0, endIndexOfFirstFeature + 1);
  if (maxDepth === 1) {
    child = tokenizeMediaFeature(featureTokens);
  } else {
    if (featureTokens[1].type === "<ident-token>" && featureTokens[1].value === "not") {
      child = tokenizeMediaCondition2(featureTokens.slice(2, -1), true, "not");
    } else {
      child = tokenizeMediaCondition2(featureTokens.slice(1, -1), true);
    }
  }
  if (endIndexOfFirstFeature === tokens.length - 1) {
    return {
      operator: previousOperator,
      children: [child]
    };
  } else {
    var nextToken = tokens[endIndexOfFirstFeature + 1];
    if (nextToken.type !== "<ident-token>") {
      throw new Error("Invalid operator\nInvalid media condition");
    } else if (previousOperator !== null && previousOperator !== nextToken.value) {
      throw new Error("'".concat(nextToken.value, "' and '").concat(previousOperator, "' must not be at same level\nInvalid media condition"));
    } else if (nextToken.value === "or" && !mayContainOr) {
      throw new Error("Cannot use 'or' at top level of a media query\nInvalid media condition");
    } else if (nextToken.value !== "and" && nextToken.value !== "or") {
      throw new Error("Invalid operator: '".concat(nextToken.value, "'\nInvalid media condition"));
    }
    var siblings = tokenizeMediaCondition2(tokens.slice(endIndexOfFirstFeature + 2), mayContainOr, nextToken.value);
    return {
      operator: nextToken.value,
      children: [child].concat(siblings.children)
    };
  }
};
var tokenizeMediaFeature = function tokenizeMediaFeature2(rawTokens) {
  if (rawTokens.length < 3 || rawTokens[0].type !== "<(-token>" || rawTokens[rawTokens.length - 1].type !== "<)-token>") {
    throw new Error("Invalid media feature");
  }
  var tokens = [rawTokens[0]];
  for (var i = 1; i < rawTokens.length; i++) {
    if (i < rawTokens.length - 2) {
      var a = rawTokens[i];
      var b = rawTokens[i + 1];
      var c = rawTokens[i + 2];
      if (a.type === "<number-token>" && a.value > 0 && b.type === "<delim-token>" && b.value === 47 && c.type === "<number-token>" && c.value > 0) {
        tokens.push({
          type: "<ratio-token>",
          numerator: a.value,
          denominator: c.value,
          wsBefore: a.wsBefore,
          wsAfter: c.wsAfter
        });
        i += 2;
        continue;
      }
    }
    tokens.push(rawTokens[i]);
  }
  var nextToken = tokens[1];
  if (nextToken.type === "<ident-token>" && tokens.length === 3) {
    return {
      context: "boolean",
      feature: nextToken.value
    };
  } else if (tokens.length === 5 && tokens[1].type === "<ident-token>" && tokens[2].type === "<colon-token>") {
    var valueToken = tokens[3];
    if (valueToken.type === "<number-token>" || valueToken.type === "<dimension-token>" || valueToken.type === "<ratio-token>" || valueToken.type === "<ident-token>") {
      var feature = tokens[1].value;
      var prefix = null;
      var slice = feature.slice(0, 4);
      if (slice === "min-") {
        prefix = "min";
        feature = feature.slice(4);
      } else if (slice === "max-") {
        prefix = "max";
        feature = feature.slice(4);
      }
      valueToken.wsBefore;
      valueToken.wsAfter;
      var value = __rest(valueToken, ["wsBefore", "wsAfter"]);
      return {
        context: "value",
        prefix,
        feature,
        value
      };
    }
  } else if (tokens.length >= 5) {
    try {
      var range = tokenizeRange(tokens);
      return {
        context: "range",
        feature: range.featureName,
        range
      };
    } catch (err) {
      throw createError("Invalid media feature", err);
    }
  }
  throw new Error("Invalid media feature");
};
var tokenizeRange = function tokenizeRange2(tokens) {
  var _a, _b, _c, _d;
  if (tokens.length < 5 || tokens[0].type !== "<(-token>" || tokens[tokens.length - 1].type !== "<)-token>") {
    throw new Error("Invalid range");
  }
  var range = {
    leftToken: null,
    leftOp: null,
    featureName: "",
    rightOp: null,
    rightToken: null
  };
  var hasLeft = tokens[1].type === "<number-token>" || tokens[1].type === "<dimension-token>" || tokens[1].type === "<ratio-token>" || tokens[1].type === "<ident-token>" && tokens[1].value === "infinite";
  if (tokens[2].type === "<delim-token>") {
    if (tokens[2].value === 60) {
      if (tokens[3].type === "<delim-token>" && tokens[3].value === 61 && !tokens[3].wsBefore) {
        range[hasLeft ? "leftOp" : "rightOp"] = "<=";
      } else {
        range[hasLeft ? "leftOp" : "rightOp"] = "<";
      }
    } else if (tokens[2].value === 62) {
      if (tokens[3].type === "<delim-token>" && tokens[3].value === 61 && !tokens[3].wsBefore) {
        range[hasLeft ? "leftOp" : "rightOp"] = ">=";
      } else {
        range[hasLeft ? "leftOp" : "rightOp"] = ">";
      }
    } else if (tokens[2].value === 61) {
      range[hasLeft ? "leftOp" : "rightOp"] = "=";
    } else {
      throw new Error("Invalid range");
    }
    if (hasLeft) {
      range.leftToken = tokens[1];
    } else if (tokens[1].type === "<ident-token>") {
      range.featureName = tokens[1].value;
    } else {
      throw new Error("Invalid range");
    }
    var tokenIndexAfterFirstOp = 2 + ((_b = (_a = range[hasLeft ? "leftOp" : "rightOp"]) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0);
    var tokenAfterFirstOp = tokens[tokenIndexAfterFirstOp];
    if (hasLeft) {
      if (tokenAfterFirstOp.type === "<ident-token>") {
        range.featureName = tokenAfterFirstOp.value;
        if (tokens.length >= 7) {
          var secondOpToken = tokens[tokenIndexAfterFirstOp + 1];
          var followingToken = tokens[tokenIndexAfterFirstOp + 2];
          if (secondOpToken.type === "<delim-token>") {
            var charCode = secondOpToken.value;
            if (charCode === 60) {
              if (followingToken.type === "<delim-token>" && followingToken.value === 61 && !followingToken.wsBefore) {
                range.rightOp = "<=";
              } else {
                range.rightOp = "<";
              }
            } else if (charCode === 62) {
              if (followingToken.type === "<delim-token>" && followingToken.value === 61 && !followingToken.wsBefore) {
                range.rightOp = ">=";
              } else {
                range.rightOp = ">";
              }
            } else {
              throw new Error("Invalid range");
            }
            var tokenAfterSecondOp = tokens[tokenIndexAfterFirstOp + 1 + ((_d = (_c = range.rightOp) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0)];
            range.rightToken = tokenAfterSecondOp;
          } else {
            throw new Error("Invalid range");
          }
        } else if (tokenIndexAfterFirstOp + 2 !== tokens.length) {
          throw new Error("Invalid range");
        }
      } else {
        throw new Error("Invalid range");
      }
    } else {
      range.rightToken = tokenAfterFirstOp;
    }
    var validRange = null;
    var lt = range.leftToken, leftOp = range.leftOp, featureName = range.featureName, rightOp = range.rightOp, rt = range.rightToken;
    var leftToken = null;
    if (lt !== null) {
      if (lt.type === "<ident-token>") {
        var type = lt.type, value = lt.value;
        if (value === "infinite") {
          leftToken = {
            type,
            value
          };
        }
      } else if (lt.type === "<number-token>" || lt.type === "<dimension-token>" || lt.type === "<ratio-token>") {
        lt.wsBefore;
        lt.wsAfter;
        var ltNoWS = __rest(lt, ["wsBefore", "wsAfter"]);
        leftToken = ltNoWS;
      }
    }
    var rightToken = null;
    if (rt !== null) {
      if (rt.type === "<ident-token>") {
        var type = rt.type, value = rt.value;
        if (value === "infinite") {
          rightToken = {
            type,
            value
          };
        }
      } else if (rt.type === "<number-token>" || rt.type === "<dimension-token>" || rt.type === "<ratio-token>") {
        rt.wsBefore;
        rt.wsAfter;
        var rtNoWS = __rest(rt, ["wsBefore", "wsAfter"]);
        rightToken = rtNoWS;
      }
    }
    if (leftToken !== null && rightToken !== null) {
      if ((leftOp === "<" || leftOp === "<=") && (rightOp === "<" || rightOp === "<=")) {
        validRange = {
          leftToken,
          leftOp,
          featureName,
          rightOp,
          rightToken
        };
      } else if ((leftOp === ">" || leftOp === ">=") && (rightOp === ">" || rightOp === ">=")) {
        validRange = {
          leftToken,
          leftOp,
          featureName,
          rightOp,
          rightToken
        };
      } else {
        throw new Error("Invalid range");
      }
    } else if (leftToken === null && leftOp === null && rightOp !== null && rightToken !== null) {
      validRange = {
        leftToken,
        leftOp,
        featureName,
        rightOp,
        rightToken
      };
    } else if (leftToken !== null && leftOp !== null && rightOp === null && rightToken === null) {
      validRange = {
        leftToken,
        leftOp,
        featureName,
        rightOp,
        rightToken
      };
    }
    return validRange;
  } else {
    throw new Error("Invalid range");
  }
};

// ../../node_modules/@vanilla-extract/css/dist/transformCss-9149bda7.esm.js
function toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == typeof i ? i : String(i);
}
function _defineProperty2(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function ownKeys2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys2(Object(t), true).forEach(function(r2) {
      _defineProperty2(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys2(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function forEach(obj, fn) {
  for (var _key in obj) {
    fn(obj[_key], _key);
  }
}
function omit(obj, omitKeys) {
  var result = {};
  for (var _key2 in obj) {
    if (omitKeys.indexOf(_key2) === -1) {
      result[_key2] = obj[_key2];
    }
  }
  return result;
}
function mapKeys(obj, fn) {
  var result = {};
  for (var _key3 in obj) {
    result[fn(obj[_key3], _key3)] = obj[_key3];
  }
  return result;
}
function composeStylesIntoSet(set) {
  for (var _len = arguments.length, classNames = new Array(_len > 1 ? _len - 1 : 0), _key5 = 1; _key5 < _len; _key5++) {
    classNames[_key5 - 1] = arguments[_key5];
  }
  for (var className of classNames) {
    if (className.length === 0) {
      continue;
    }
    if (typeof className === "string") {
      if (className.includes(" ")) {
        composeStylesIntoSet(set, ...className.trim().split(" "));
      } else {
        set.add(className);
      }
    } else if (Array.isArray(className)) {
      composeStylesIntoSet(set, ...className);
    }
  }
}
function dudupeAndJoinClassList(classNames) {
  var set = /* @__PURE__ */ new Set();
  composeStylesIntoSet(set, ...classNames);
  return Array.from(set).join(" ");
}
var _templateObject$1;
function escapeRegex(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
var validateSelector = (selector, targetClassName) => {
  var replaceTarget = () => {
    var targetRegex = new RegExp(".".concat(escapeRegex((0, import_cssesc.default)(targetClassName, {
      isIdentifier: true
    }))), "g");
    return selector.replace(targetRegex, "&");
  };
  var selectorParts;
  try {
    selectorParts = parse(selector);
  } catch (err) {
    throw new Error("Invalid selector: ".concat(replaceTarget()));
  }
  selectorParts.forEach((tokens) => {
    try {
      for (var i = tokens.length - 1; i >= -1; i--) {
        if (!tokens[i]) {
          throw new Error();
        }
        var token = tokens[i];
        if (token.type === "child" || token.type === "parent" || token.type === "sibling" || token.type === "adjacent" || token.type === "descendant") {
          throw new Error();
        }
        if (token.type === "attribute" && token.name === "class" && token.value === targetClassName) {
          return;
        }
      }
    } catch (err) {
      throw new Error(dedent_default(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteral(["\n        Invalid selector: ", "\n    \n        Style selectors must target the '&' character (along with any modifiers), e.g. ", " or ", ".\n        \n        This is to ensure that each style block only affects the styling of a single class.\n        \n        If your selector is targeting another class, you should move it to the style definition for that class, e.g. given we have styles for 'parent' and 'child' elements, instead of adding a selector of ", ") to 'parent', you should add ", " to 'child').\n        \n        If your selector is targeting something global, use the 'globalStyle' function instead, e.g. if you wanted to write ", ", you should instead write 'globalStyle(", ", { ... })'\n      "])), replaceTarget(), "`${parent} &`", "`${parent} &:hover`", "`& ${child}`", "`${parent} &`", "`& h1`", "`${parent} h1`"));
    }
  });
};
var ConditionalRuleset = class _ConditionalRuleset {
  /**
   * Stores information about where conditions must be in relation to other conditions
   *
   * e.g. mobile -> tablet, desktop
   */
  constructor() {
    this.ruleset = /* @__PURE__ */ new Map();
    this.precedenceLookup = /* @__PURE__ */ new Map();
  }
  findOrCreateCondition(conditionQuery) {
    var targetCondition = this.ruleset.get(conditionQuery);
    if (!targetCondition) {
      targetCondition = {
        query: conditionQuery,
        rules: [],
        children: new _ConditionalRuleset()
      };
      this.ruleset.set(conditionQuery, targetCondition);
    }
    return targetCondition;
  }
  getConditionalRulesetByPath(conditionPath) {
    var currRuleset = this;
    for (var query of conditionPath) {
      var condition = currRuleset.findOrCreateCondition(query);
      currRuleset = condition.children;
    }
    return currRuleset;
  }
  addRule(rule, conditionQuery, conditionPath) {
    var ruleset = this.getConditionalRulesetByPath(conditionPath);
    var targetCondition = ruleset.findOrCreateCondition(conditionQuery);
    if (!targetCondition) {
      throw new Error("Failed to add conditional rule");
    }
    targetCondition.rules.push(rule);
  }
  addConditionPrecedence(conditionPath, conditionOrder) {
    var ruleset = this.getConditionalRulesetByPath(conditionPath);
    for (var i = 0; i < conditionOrder.length; i++) {
      var _ruleset$precedenceLo;
      var query = conditionOrder[i];
      var conditionPrecedence = (_ruleset$precedenceLo = ruleset.precedenceLookup.get(query)) !== null && _ruleset$precedenceLo !== void 0 ? _ruleset$precedenceLo : /* @__PURE__ */ new Set();
      for (var lowerPrecedenceCondition of conditionOrder.slice(i + 1)) {
        conditionPrecedence.add(lowerPrecedenceCondition);
      }
      ruleset.precedenceLookup.set(query, conditionPrecedence);
    }
  }
  isCompatible(incomingRuleset) {
    for (var [condition, orderPrecedence] of this.precedenceLookup.entries()) {
      for (var lowerPrecedenceCondition of orderPrecedence) {
        var _incomingRuleset$prec;
        if ((_incomingRuleset$prec = incomingRuleset.precedenceLookup.get(lowerPrecedenceCondition)) !== null && _incomingRuleset$prec !== void 0 && _incomingRuleset$prec.has(condition)) {
          return false;
        }
      }
    }
    for (var {
      query,
      children
    } of incomingRuleset.ruleset.values()) {
      var matchingCondition = this.ruleset.get(query);
      if (matchingCondition && !matchingCondition.children.isCompatible(children)) {
        return false;
      }
    }
    return true;
  }
  merge(incomingRuleset) {
    for (var {
      query,
      rules,
      children
    } of incomingRuleset.ruleset.values()) {
      var matchingCondition = this.ruleset.get(query);
      if (matchingCondition) {
        matchingCondition.rules.push(...rules);
        matchingCondition.children.merge(children);
      } else {
        this.ruleset.set(query, {
          query,
          rules,
          children
        });
      }
    }
    for (var [condition, incomingOrderPrecedence] of incomingRuleset.precedenceLookup.entries()) {
      var _this$precedenceLooku;
      var orderPrecedence = (_this$precedenceLooku = this.precedenceLookup.get(condition)) !== null && _this$precedenceLooku !== void 0 ? _this$precedenceLooku : /* @__PURE__ */ new Set();
      this.precedenceLookup.set(condition, /* @__PURE__ */ new Set([...orderPrecedence, ...incomingOrderPrecedence]));
    }
  }
  /**
   * Merge another ConditionalRuleset into this one if they are compatible
   *
   * @returns true if successful, false if the ruleset is incompatible
   */
  mergeIfCompatible(incomingRuleset) {
    if (!this.isCompatible(incomingRuleset)) {
      return false;
    }
    this.merge(incomingRuleset);
    return true;
  }
  getSortedRuleset() {
    var _this = this;
    var sortedRuleset = [];
    var _loop = function _loop2(dependents2) {
      var conditionForQuery = _this.ruleset.get(query);
      if (!conditionForQuery) {
        throw new Error("Can't find condition for ".concat(query));
      }
      var firstMatchingDependent = sortedRuleset.findIndex((condition) => dependents2.has(condition.query));
      if (firstMatchingDependent > -1) {
        sortedRuleset.splice(firstMatchingDependent, 0, conditionForQuery);
      } else {
        sortedRuleset.push(conditionForQuery);
      }
    };
    for (var [query, dependents] of this.precedenceLookup.entries()) {
      _loop(dependents);
    }
    return sortedRuleset;
  }
  renderToArray() {
    var arr = [];
    for (var {
      query,
      rules,
      children
    } of this.getSortedRuleset()) {
      var selectors = {};
      for (var rule of rules) {
        selectors[rule.selector] = _objectSpread2(_objectSpread2({}, selectors[rule.selector]), rule.rule);
      }
      Object.assign(selectors, ...children.renderToArray());
      arr.push({
        [query]: selectors
      });
    }
    return arr;
  }
};
var simplePseudoMap = {
  ":-moz-any-link": true,
  ":-moz-full-screen": true,
  ":-moz-placeholder": true,
  ":-moz-read-only": true,
  ":-moz-read-write": true,
  ":-ms-fullscreen": true,
  ":-ms-input-placeholder": true,
  ":-webkit-any-link": true,
  ":-webkit-full-screen": true,
  "::-moz-color-swatch": true,
  "::-moz-list-bullet": true,
  "::-moz-list-number": true,
  "::-moz-page-sequence": true,
  "::-moz-page": true,
  "::-moz-placeholder": true,
  "::-moz-progress-bar": true,
  "::-moz-range-progress": true,
  "::-moz-range-thumb": true,
  "::-moz-range-track": true,
  "::-moz-scrolled-page-sequence": true,
  "::-moz-selection": true,
  "::-ms-backdrop": true,
  "::-ms-browse": true,
  "::-ms-check": true,
  "::-ms-clear": true,
  "::-ms-fill-lower": true,
  "::-ms-fill-upper": true,
  "::-ms-fill": true,
  "::-ms-reveal": true,
  "::-ms-thumb": true,
  "::-ms-ticks-after": true,
  "::-ms-ticks-before": true,
  "::-ms-tooltip": true,
  "::-ms-track": true,
  "::-ms-value": true,
  "::-webkit-backdrop": true,
  "::-webkit-inner-spin-button": true,
  "::-webkit-input-placeholder": true,
  "::-webkit-meter-bar": true,
  "::-webkit-meter-even-less-good-value": true,
  "::-webkit-meter-inner-element": true,
  "::-webkit-meter-optimum-value": true,
  "::-webkit-meter-suboptimum-value": true,
  "::-webkit-outer-spin-button": true,
  "::-webkit-progress-bar": true,
  "::-webkit-progress-inner-element": true,
  "::-webkit-progress-inner-value": true,
  "::-webkit-progress-value": true,
  "::-webkit-resizer": true,
  "::-webkit-scrollbar-button": true,
  "::-webkit-scrollbar-corner": true,
  "::-webkit-scrollbar-thumb": true,
  "::-webkit-scrollbar-track-piece": true,
  "::-webkit-scrollbar-track": true,
  "::-webkit-scrollbar": true,
  "::-webkit-search-cancel-button": true,
  "::-webkit-search-results-button": true,
  "::-webkit-slider-runnable-track": true,
  "::-webkit-slider-thumb": true,
  "::after": true,
  "::backdrop": true,
  "::before": true,
  "::cue": true,
  "::file-selector-button": true,
  "::first-letter": true,
  "::first-line": true,
  "::grammar-error": true,
  "::marker": true,
  "::placeholder": true,
  "::selection": true,
  "::spelling-error": true,
  "::target-text": true,
  "::view-transition-group": true,
  "::view-transition-image-pair": true,
  "::view-transition-new": true,
  "::view-transition-old": true,
  "::view-transition": true,
  ":active": true,
  ":after": true,
  ":any-link": true,
  ":before": true,
  ":blank": true,
  ":checked": true,
  ":default": true,
  ":defined": true,
  ":disabled": true,
  ":empty": true,
  ":enabled": true,
  ":first-child": true,
  ":first-letter": true,
  ":first-line": true,
  ":first-of-type": true,
  ":first": true,
  ":focus-visible": true,
  ":focus-within": true,
  ":focus": true,
  ":fullscreen": true,
  ":hover": true,
  ":in-range": true,
  ":indeterminate": true,
  ":invalid": true,
  ":last-child": true,
  ":last-of-type": true,
  ":left": true,
  ":link": true,
  ":only-child": true,
  ":only-of-type": true,
  ":optional": true,
  ":out-of-range": true,
  ":placeholder-shown": true,
  ":read-only": true,
  ":read-write": true,
  ":required": true,
  ":right": true,
  ":root": true,
  ":scope": true,
  ":target": true,
  ":valid": true,
  ":visited": true
};
var simplePseudos = Object.keys(simplePseudoMap);
var simplePseudoLookup = simplePseudoMap;
var _templateObject;
var createMediaQueryError = (mediaQuery, msg) => new Error(dedent_default(_templateObject || (_templateObject = _taggedTemplateLiteral(['\n    Invalid media query: "', '"\n\n    ', "\n\n    Read more on MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries\n  "])), mediaQuery, msg));
var validateMediaQuery = (mediaQuery) => {
  if (mediaQuery === "@media ") {
    throw createMediaQueryError(mediaQuery, "Query is empty");
  }
  try {
    toAST(mediaQuery);
  } catch (e) {
    throw createMediaQueryError(mediaQuery, e.message);
  }
};
var _excluded = ["vars"];
var _excluded2 = ["content"];
var DECLARATION = "__DECLARATION";
var UNITLESS = {
  animationIterationCount: true,
  borderImage: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexShrink: true,
  fontWeight: true,
  gridArea: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnStart: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowStart: true,
  initialLetter: true,
  lineClamp: true,
  lineHeight: true,
  maxLines: true,
  opacity: true,
  order: true,
  orphans: true,
  scale: true,
  tabSize: true,
  WebkitLineClamp: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // svg properties
  fillOpacity: true,
  floodOpacity: true,
  maskBorder: true,
  maskBorderOutset: true,
  maskBorderSlice: true,
  maskBorderWidth: true,
  shapeImageThreshold: true,
  stopOpacity: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};
function dashify(str) {
  return str.replace(/([A-Z])/g, "-$1").replace(/^ms-/, "-ms-").toLowerCase();
}
function replaceBetweenIndexes(target, startIndex, endIndex, replacement) {
  var start = target.slice(0, startIndex);
  var end = target.slice(endIndex);
  return "".concat(start).concat(replacement).concat(end);
}
var DOUBLE_SPACE = "  ";
var specialKeys = [...simplePseudos, "@layer", "@media", "@supports", "@container", "selectors"];
var Stylesheet = class {
  constructor(localClassNames2, composedClassLists2) {
    this.rules = [];
    this.conditionalRulesets = [new ConditionalRuleset()];
    this.fontFaceRules = [];
    this.keyframesRules = [];
    this.localClassNamesMap = new Map(localClassNames2.map((localClassName) => [localClassName, localClassName]));
    this.localClassNamesSearch = new AhoCorasick(localClassNames2);
    this.layers = /* @__PURE__ */ new Map();
    this.composedClassLists = composedClassLists2.map((_ref) => {
      var {
        identifier,
        classList
      } = _ref;
      return {
        identifier,
        regex: RegExp("(".concat(classList, ")"), "g")
      };
    }).reverse();
  }
  processCssObj(root) {
    if (root.type === "fontFace") {
      this.fontFaceRules.push(root.rule);
      return;
    }
    if (root.type === "keyframes") {
      root.rule = Object.fromEntries(Object.entries(root.rule).map((_ref2) => {
        var [keyframe, rule] = _ref2;
        return [keyframe, this.transformProperties(rule)];
      }));
      this.keyframesRules.push(root);
      return;
    }
    this.currConditionalRuleset = new ConditionalRuleset();
    if (root.type === "layer") {
      var layerDefinition = "@layer ".concat(root.name);
      this.addLayer([layerDefinition]);
    } else {
      var mainRule = omit(root.rule, specialKeys);
      this.addRule({
        selector: root.selector,
        rule: mainRule
      });
      this.transformLayer(root, root.rule["@layer"]);
      this.transformMedia(root, root.rule["@media"]);
      this.transformSupports(root, root.rule["@supports"]);
      this.transformContainer(root, root.rule["@container"]);
      this.transformSimplePseudos(root, root.rule);
      this.transformSelectors(root, root.rule);
    }
    var activeConditionalRuleset = this.conditionalRulesets[this.conditionalRulesets.length - 1];
    if (!activeConditionalRuleset.mergeIfCompatible(this.currConditionalRuleset)) {
      this.conditionalRulesets.push(this.currConditionalRuleset);
    }
  }
  addConditionalRule(cssRule, conditions) {
    var rule = this.transformVars(this.transformProperties(cssRule.rule));
    var selector = this.transformSelector(cssRule.selector);
    if (!this.currConditionalRuleset) {
      throw new Error("Couldn't add conditional rule");
    }
    var conditionQuery = conditions[conditions.length - 1];
    var parentConditions = conditions.slice(0, conditions.length - 1);
    this.currConditionalRuleset.addRule({
      selector,
      rule
    }, conditionQuery, parentConditions);
  }
  addRule(cssRule) {
    var rule = this.transformVars(this.transformProperties(cssRule.rule));
    var selector = this.transformSelector(cssRule.selector);
    this.rules.push({
      selector,
      rule
    });
  }
  addLayer(layer) {
    var uniqueLayerKey = layer.join(" - ");
    this.layers.set(uniqueLayerKey, layer);
  }
  transformProperties(cssRule) {
    return this.transformContent(this.pixelifyProperties(cssRule));
  }
  pixelifyProperties(cssRule) {
    forEach(cssRule, (value, key) => {
      if (typeof value === "number" && value !== 0 && !UNITLESS[key]) {
        cssRule[key] = "".concat(value, "px");
      }
    });
    return cssRule;
  }
  transformVars(_ref3) {
    var {
      vars: vars2
    } = _ref3, rest = _objectWithoutProperties(_ref3, _excluded);
    if (!vars2) {
      return rest;
    }
    return _objectSpread2(_objectSpread2({}, mapKeys(vars2, (_value, key) => getVarName(key))), rest);
  }
  transformContent(_ref4) {
    var {
      content
    } = _ref4, rest = _objectWithoutProperties(_ref4, _excluded2);
    if (typeof content === "undefined") {
      return rest;
    }
    var contentArray = Array.isArray(content) ? content : [content];
    return _objectSpread2({
      content: contentArray.map((value) => (
        // This logic was adapted from Stitches :)
        value && (value.includes('"') || value.includes("'") || /^([A-Za-z\-]+\([^]*|[^]*-quote|inherit|initial|none|normal|revert|unset)(\s|$)/.test(value)) ? value : '"'.concat(value, '"')
      ))
    }, rest);
  }
  transformClassname(identifier) {
    return ".".concat((0, import_cssesc.default)(identifier, {
      isIdentifier: true
    }));
  }
  transformSelector(selector) {
    var transformedSelector = selector;
    var _loop = function _loop2(identifier2) {
      transformedSelector = transformedSelector.replace(regex, () => {
        markCompositionUsed(identifier2);
        return identifier2;
      });
    };
    for (var {
      identifier,
      regex
    } of this.composedClassLists) {
      _loop(identifier);
    }
    if (this.localClassNamesMap.has(transformedSelector)) {
      return this.transformClassname(transformedSelector);
    }
    var results = this.localClassNamesSearch.search(transformedSelector);
    var lastReplaceIndex = transformedSelector.length;
    for (var i = results.length - 1; i >= 0; i--) {
      var [endIndex, [firstMatch]] = results[i];
      var startIndex = endIndex - firstMatch.length + 1;
      if (startIndex >= lastReplaceIndex) {
        continue;
      }
      lastReplaceIndex = startIndex;
      if (transformedSelector[startIndex - 1] !== ".") {
        transformedSelector = replaceBetweenIndexes(transformedSelector, startIndex, endIndex + 1, this.transformClassname(firstMatch));
      }
    }
    return transformedSelector;
  }
  transformSelectors(root, rule, conditions) {
    forEach(rule.selectors, (selectorRule, selector) => {
      if (root.type !== "local") {
        throw new Error("Selectors are not allowed within ".concat(root.type === "global" ? '"globalStyle"' : '"selectors"'));
      }
      var transformedSelector = this.transformSelector(selector.replace(RegExp("&", "g"), root.selector));
      validateSelector(transformedSelector, root.selector);
      var rule2 = {
        selector: transformedSelector,
        rule: omit(selectorRule, specialKeys)
      };
      if (conditions) {
        this.addConditionalRule(rule2, conditions);
      } else {
        this.addRule(rule2);
      }
      var selectorRoot = {
        type: "selector",
        selector: transformedSelector,
        rule: selectorRule
      };
      this.transformLayer(selectorRoot, selectorRule["@layer"], conditions);
      this.transformSupports(selectorRoot, selectorRule["@supports"], conditions);
      this.transformMedia(selectorRoot, selectorRule["@media"], conditions);
    });
  }
  transformMedia(root, rules) {
    var parentConditions = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
    if (rules) {
      var _this$currConditional;
      (_this$currConditional = this.currConditionalRuleset) === null || _this$currConditional === void 0 || _this$currConditional.addConditionPrecedence(parentConditions, Object.keys(rules).map((query2) => "@media ".concat(query2)));
      for (var [query, mediaRule] of Object.entries(rules)) {
        var mediaQuery = "@media ".concat(query);
        validateMediaQuery(mediaQuery);
        var conditions = [...parentConditions, mediaQuery];
        this.addConditionalRule({
          selector: root.selector,
          rule: omit(mediaRule, specialKeys)
        }, conditions);
        if (root.type === "local") {
          this.transformSimplePseudos(root, mediaRule, conditions);
          this.transformSelectors(root, mediaRule, conditions);
        }
        this.transformLayer(root, mediaRule["@layer"], conditions);
        this.transformSupports(root, mediaRule["@supports"], conditions);
        this.transformContainer(root, mediaRule["@container"], conditions);
      }
    }
  }
  transformContainer(root, rules) {
    var parentConditions = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
    if (rules) {
      var _this$currConditional2;
      (_this$currConditional2 = this.currConditionalRuleset) === null || _this$currConditional2 === void 0 || _this$currConditional2.addConditionPrecedence(parentConditions, Object.keys(rules).map((query) => "@container ".concat(query)));
      forEach(rules, (containerRule, query) => {
        var containerQuery = "@container ".concat(query);
        var conditions = [...parentConditions, containerQuery];
        this.addConditionalRule({
          selector: root.selector,
          rule: omit(containerRule, specialKeys)
        }, conditions);
        if (root.type === "local") {
          this.transformSimplePseudos(root, containerRule, conditions);
          this.transformSelectors(root, containerRule, conditions);
        }
        this.transformLayer(root, containerRule["@layer"], conditions);
        this.transformSupports(root, containerRule["@supports"], conditions);
        this.transformMedia(root, containerRule["@media"], conditions);
      });
    }
  }
  transformLayer(root, rules) {
    var parentConditions = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
    if (rules) {
      var _this$currConditional3;
      (_this$currConditional3 = this.currConditionalRuleset) === null || _this$currConditional3 === void 0 || _this$currConditional3.addConditionPrecedence(parentConditions, Object.keys(rules).map((name) => "@layer ".concat(name)));
      forEach(rules, (layerRule, name) => {
        var conditions = [...parentConditions, "@layer ".concat(name)];
        this.addLayer(conditions);
        this.addConditionalRule({
          selector: root.selector,
          rule: omit(layerRule, specialKeys)
        }, conditions);
        if (root.type === "local") {
          this.transformSimplePseudos(root, layerRule, conditions);
          this.transformSelectors(root, layerRule, conditions);
        }
        this.transformMedia(root, layerRule["@media"], conditions);
        this.transformSupports(root, layerRule["@supports"], conditions);
        this.transformContainer(root, layerRule["@container"], conditions);
      });
    }
  }
  transformSupports(root, rules) {
    var parentConditions = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
    if (rules) {
      var _this$currConditional4;
      (_this$currConditional4 = this.currConditionalRuleset) === null || _this$currConditional4 === void 0 || _this$currConditional4.addConditionPrecedence(parentConditions, Object.keys(rules).map((query) => "@supports ".concat(query)));
      forEach(rules, (supportsRule, query) => {
        var conditions = [...parentConditions, "@supports ".concat(query)];
        this.addConditionalRule({
          selector: root.selector,
          rule: omit(supportsRule, specialKeys)
        }, conditions);
        if (root.type === "local") {
          this.transformSimplePseudos(root, supportsRule, conditions);
          this.transformSelectors(root, supportsRule, conditions);
        }
        this.transformLayer(root, supportsRule["@layer"], conditions);
        this.transformMedia(root, supportsRule["@media"], conditions);
        this.transformContainer(root, supportsRule["@container"], conditions);
      });
    }
  }
  transformSimplePseudos(root, rule, conditions) {
    for (var key of Object.keys(rule)) {
      if (simplePseudoLookup[key]) {
        if (root.type !== "local") {
          throw new Error("Simple pseudos are not valid in ".concat(root.type === "global" ? '"globalStyle"' : '"selectors"'));
        }
        if (conditions) {
          this.addConditionalRule({
            selector: "".concat(root.selector).concat(key),
            rule: rule[key]
          }, conditions);
        } else {
          this.addRule({
            conditions,
            selector: "".concat(root.selector).concat(key),
            rule: rule[key]
          });
        }
      }
    }
  }
  toCss() {
    var css = [];
    for (var fontFaceRule of this.fontFaceRules) {
      css.push(renderCss({
        "@font-face": fontFaceRule
      }));
    }
    for (var keyframe of this.keyframesRules) {
      css.push(renderCss({
        ["@keyframes ".concat(keyframe.name)]: keyframe.rule
      }));
    }
    for (var layer of this.layers.values()) {
      var [definition, ...nesting] = layer.reverse();
      var cssObj = {
        [definition]: DECLARATION
      };
      for (var part of nesting) {
        cssObj = {
          [part]: cssObj
        };
      }
      css.push(renderCss(cssObj));
    }
    for (var rule of this.rules) {
      css.push(renderCss({
        [rule.selector]: rule.rule
      }));
    }
    for (var conditionalRuleset of this.conditionalRulesets) {
      for (var conditionalRule of conditionalRuleset.renderToArray()) {
        css.push(renderCss(conditionalRule));
      }
    }
    return css.filter(Boolean);
  }
};
function renderCss(v) {
  var indent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  var rules = [];
  var _loop2 = function _loop22(key2) {
    var value = v[key2];
    if (value && Array.isArray(value)) {
      rules.push(...value.map((v2) => renderCss({
        [key2]: v2
      }, indent)));
    } else if (value && typeof value === "object") {
      var isEmpty2 = Object.keys(value).length === 0;
      if (!isEmpty2) {
        rules.push("".concat(indent).concat(key2, " {\n").concat(renderCss(value, indent + DOUBLE_SPACE), "\n").concat(indent, "}"));
      }
    } else if (value === DECLARATION) {
      rules.push("".concat(indent).concat(key2, ";"));
    } else {
      rules.push("".concat(indent).concat(key2.startsWith("--") ? key2 : dashify(key2), ": ").concat(value, ";"));
    }
  };
  for (var key of Object.keys(v)) {
    _loop2(key);
  }
  return rules.join("\n");
}
function transformCss(_ref5) {
  var {
    localClassNames: localClassNames2,
    cssObjs,
    composedClassLists: composedClassLists2
  } = _ref5;
  var stylesheet = new Stylesheet(localClassNames2, composedClassLists2);
  for (var root of cssObjs) {
    stylesheet.processCssObj(root);
  }
  return stylesheet.toCss();
}

// ../../node_modules/@emotion/hash/dist/emotion-hash.esm.js
function murmur2(str) {
  var h = 0;
  var k, i = 0, len = str.length;
  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
    k = /* Math.imul(k, m): */
    (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
    k ^= /* k >>> r: */
    k >>> 24;
    h = /* Math.imul(k, m): */
    (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 255) << 16;
    case 2:
      h ^= (str.charCodeAt(i + 1) & 255) << 8;
    case 1:
      h ^= str.charCodeAt(i) & 255;
      h = /* Math.imul(h, m): */
      (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  h ^= h >>> 13;
  h = /* Math.imul(h, m): */
  (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

// ../../node_modules/@vanilla-extract/css/fileScope/dist/vanilla-extract-css-fileScope.esm.js
var _templateObject2;
var refCounter = 0;
var fileScopes = [];
function getFileScope() {
  if (fileScopes.length === 0) {
    throw new Error(dedent_default(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n        Styles were unable to be assigned to a file. This is generally caused by one of the following:\n\n        - You may have created styles outside of a '.css.ts' context\n        - You may have incorrect configuration. See https://vanilla-extract.style/documentation/getting-started\n      "]))));
  }
  return fileScopes[0];
}
function getAndIncrementRefCounter() {
  return refCounter++;
}

// ../../node_modules/@vanilla-extract/css/dist/vanilla-extract-css.esm.js
var import_cssesc2 = __toESM(require_cssesc());

// ../../node_modules/deep-object-diff/mjs/utils.js
var isDate = (d) => d instanceof Date;
var isEmpty = (o) => Object.keys(o).length === 0;
var isObject = (o) => o != null && typeof o === "object";
var hasOwnProperty = (o, ...args) => Object.prototype.hasOwnProperty.call(o, ...args);
var isEmptyObject = (o) => isObject(o) && isEmpty(o);
var makeObjectWithoutPrototype = () => /* @__PURE__ */ Object.create(null);

// ../../node_modules/deep-object-diff/mjs/diff.js
var diff = (lhs, rhs) => {
  if (lhs === rhs) return {};
  if (!isObject(lhs) || !isObject(rhs)) return rhs;
  const deletedValues = Object.keys(lhs).reduce((acc, key) => {
    if (!hasOwnProperty(rhs, key)) {
      acc[key] = void 0;
    }
    return acc;
  }, makeObjectWithoutPrototype());
  if (isDate(lhs) || isDate(rhs)) {
    if (lhs.valueOf() == rhs.valueOf()) return {};
    return rhs;
  }
  return Object.keys(rhs).reduce((acc, key) => {
    if (!hasOwnProperty(lhs, key)) {
      acc[key] = rhs[key];
      return acc;
    }
    const difference = diff(lhs[key], rhs[key]);
    if (isEmptyObject(difference) && !isDate(difference) && (isEmptyObject(lhs[key]) || !isEmptyObject(rhs[key])))
      return acc;
    acc[key] = difference;
    return acc;
  }, deletedValues);
};
var diff_default = diff;

// ../../node_modules/@vanilla-extract/css/dist/vanilla-extract-css.esm.js
var import_picocolors = __toESM(require_picocolors());
var import_deepmerge = __toESM(require_cjs());
var localClassNames = /* @__PURE__ */ new Set();
var composedClassLists = [];
var bufferedCSSObjs = [];
var browserRuntimeAdapter = {
  appendCss: (cssObj) => {
    bufferedCSSObjs.push(cssObj);
  },
  registerClassName: (className) => {
    localClassNames.add(className);
  },
  registerComposition: (composition) => {
    composedClassLists.push(composition);
  },
  markCompositionUsed: () => {
  },
  onEndFileScope: (fileScope) => {
    var css = transformCss({
      localClassNames: Array.from(localClassNames),
      composedClassLists,
      cssObjs: bufferedCSSObjs
    }).join("\n");
    injectStyles({
      fileScope,
      css
    });
    bufferedCSSObjs = [];
  },
  getIdentOption: () => process.env.NODE_ENV === "production" ? "short" : "debug"
};
if (typeof window !== "undefined") {
  setAdapterIfNotSet(browserRuntimeAdapter);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _wrapRegExp() {
  _wrapRegExp = function(e2, r2) {
    return new BabelRegExp(e2, void 0, r2);
  };
  var e = RegExp.prototype, r = /* @__PURE__ */ new WeakMap();
  function BabelRegExp(e2, t, p) {
    var o = new RegExp(e2, t);
    return r.set(o, p || r.get(e2)), _setPrototypeOf(o, BabelRegExp.prototype);
  }
  function buildGroups(e2, t) {
    var p = r.get(t);
    return Object.keys(p).reduce(function(r2, t2) {
      var o = p[t2];
      if ("number" == typeof o) r2[t2] = e2[o];
      else {
        for (var i = 0; void 0 === e2[o[i]] && i + 1 < o.length; ) i++;
        r2[t2] = e2[o[i]];
      }
      return r2;
    }, /* @__PURE__ */ Object.create(null));
  }
  return _inherits(BabelRegExp, RegExp), BabelRegExp.prototype.exec = function(r2) {
    var t = e.exec.call(this, r2);
    if (t) {
      t.groups = buildGroups(t, this);
      var p = t.indices;
      p && (p.groups = buildGroups(p, this));
    }
    return t;
  }, BabelRegExp.prototype[Symbol.replace] = function(t, p) {
    if ("string" == typeof p) {
      var o = r.get(this);
      return e[Symbol.replace].call(this, t, p.replace(/\$<([^>]+)>/g, function(e2, r2) {
        var t2 = o[r2];
        return "$" + (Array.isArray(t2) ? t2.join("$") : t2);
      }));
    }
    if ("function" == typeof p) {
      var i = this;
      return e[Symbol.replace].call(this, t, function() {
        var e2 = arguments;
        return "object" != typeof e2[e2.length - 1] && (e2 = [].slice.call(e2)).push(buildGroups(e2, i)), p.apply(this, e2);
      });
    }
    return e[Symbol.replace].call(this, t, p);
  }, _wrapRegExp.apply(this, arguments);
}
function getDevPrefix(_ref) {
  var {
    debugId,
    debugFileName
  } = _ref;
  var parts = debugId ? [debugId.replace(/\s/g, "_")] : [];
  if (debugFileName) {
    var {
      filePath
    } = getFileScope();
    var matches = filePath.match(/* @__PURE__ */ _wrapRegExp(/([^\/\\]*)?[\/\\]?([^\/\\]*)\.css\.(ts|js|tsx|jsx|cjs|mjs)$/, {
      dir: 1,
      file: 2
    }));
    if (matches && matches.groups) {
      var {
        dir,
        file
      } = matches.groups;
      parts.unshift(file && file !== "index" ? file : dir);
    }
  }
  return parts.join("_");
}
function normalizeIdentifier(identifier) {
  return identifier.match(/^[0-9]/) ? "_".concat(identifier) : identifier;
}
function generateIdentifier(arg) {
  var identOption = getIdentOption();
  var {
    debugId,
    debugFileName = true
  } = _objectSpread2(_objectSpread2({}, typeof arg === "string" ? {
    debugId: arg
  } : null), typeof arg === "object" ? arg : null);
  var refCount = getAndIncrementRefCounter().toString(36);
  var {
    filePath,
    packageName
  } = getFileScope();
  var fileScopeHash = murmur2(packageName ? "".concat(packageName).concat(filePath) : filePath);
  var identifier = "".concat(fileScopeHash).concat(refCount);
  if (identOption === "debug") {
    var devPrefix = getDevPrefix({
      debugId,
      debugFileName
    });
    if (devPrefix) {
      identifier = "".concat(devPrefix, "__").concat(identifier);
    }
    return normalizeIdentifier(identifier);
  }
  if (typeof identOption === "function") {
    identifier = identOption({
      hash: identifier,
      debugId,
      filePath,
      packageName
    });
    if (!identifier.match(/^[A-Z_][0-9A-Z_-]+$/i)) {
      throw new Error('Identifier function returned invalid indentifier: "'.concat(identifier, '"'));
    }
    return identifier;
  }
  return normalizeIdentifier(identifier);
}
var normaliseObject = (obj) => walkObject(obj, () => "");
function validateContract(contract, tokens) {
  var theDiff = diff_default(normaliseObject(contract), normaliseObject(tokens));
  var valid = Object.keys(theDiff).length === 0;
  return {
    valid,
    diffString: valid ? "" : renderDiff(contract, theDiff)
  };
}
function diffLine(value, nesting, type) {
  var whitespace = [...Array(nesting).keys()].map(() => "  ").join("");
  var line = "".concat(type ? type : " ").concat(whitespace).concat(value);
  if (process.env.NODE_ENV !== "test") {
    if (type === "-") {
      return import_picocolors.default.red(line);
    }
    if (type === "+") {
      return import_picocolors.default.green(line);
    }
  }
  return line;
}
function renderDiff(orig, diff2) {
  var nesting = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  var lines = [];
  if (nesting === 0) {
    lines.push(diffLine("{", 0));
  }
  var innerNesting = nesting + 1;
  var keys = Object.keys(diff2).sort();
  for (var key of keys) {
    var value = diff2[key];
    if (!(key in orig)) {
      lines.push(diffLine("".concat(key, ": ...,"), innerNesting, "+"));
    } else if (typeof value === "object") {
      lines.push(diffLine("".concat(key, ": {"), innerNesting));
      lines.push(renderDiff(orig[key], diff2[key], innerNesting));
      lines.push(diffLine("}", innerNesting));
    } else {
      lines.push(diffLine("".concat(key, ": ...,"), innerNesting, "-"));
    }
  }
  if (nesting === 0) {
    lines.push(diffLine("}", 0));
  }
  return lines.join("\n");
}
function createVar(debugId) {
  var cssVarName = (0, import_cssesc2.default)(generateIdentifier({
    debugId,
    debugFileName: false
  }), {
    isIdentifier: true
  });
  return "var(--".concat(cssVarName, ")");
}
function assignVars(varContract, tokens) {
  var varSetters = {};
  var {
    valid,
    diffString
  } = validateContract(varContract, tokens);
  if (!valid) {
    throw new Error("Tokens don't match contract.\n".concat(diffString));
  }
  walkObject(tokens, (value, path) => {
    varSetters[get(varContract, path)] = String(value);
  });
  return varSetters;
}
function createThemeContract(tokens) {
  return walkObject(tokens, (_value, path) => {
    return createVar(path.join("-"));
  });
}
function createGlobalTheme(selector, arg2, arg3) {
  var shouldCreateVars = Boolean(!arg3);
  var themeVars = shouldCreateVars ? createThemeContract(arg2) : arg2;
  var tokens = shouldCreateVars ? arg2 : arg3;
  appendCss({
    type: "global",
    selector,
    rule: {
      vars: assignVars(themeVars, tokens)
    }
  }, getFileScope());
  if (shouldCreateVars) {
    return themeVars;
  }
}
function createTheme(arg1, arg2, arg3) {
  var themeClassName = generateIdentifier(typeof arg2 === "object" ? arg3 : arg2);
  registerClassName(themeClassName, getFileScope());
  var vars2 = typeof arg2 === "object" ? createGlobalTheme(themeClassName, arg1, arg2) : createGlobalTheme(themeClassName, arg1);
  return vars2 ? [themeClassName, vars2] : themeClassName;
}
function composedStyle(rules, debugId) {
  var className = generateIdentifier(debugId);
  registerClassName(className, getFileScope());
  var classList = [];
  var styleRules = [];
  for (var rule of rules) {
    if (typeof rule === "string") {
      classList.push(rule);
    } else {
      styleRules.push(rule);
    }
  }
  var result = className;
  if (classList.length > 0) {
    result = "".concat(className, " ").concat(dudupeAndJoinClassList(classList));
    registerComposition({
      identifier: className,
      classList: result
    }, getFileScope());
    if (styleRules.length > 0) {
      markCompositionUsed(className);
    }
  }
  if (styleRules.length > 0) {
    var _rule = import_deepmerge.default.all(styleRules, {
      // Replace arrays rather than merging
      arrayMerge: (_, sourceArray) => sourceArray
    });
    appendCss({
      type: "local",
      selector: className,
      rule: _rule
    }, getFileScope());
  }
  return result;
}
function style(rule, debugId) {
  if (Array.isArray(rule)) {
    return composedStyle(rule, debugId);
  }
  var className = generateIdentifier(debugId);
  registerClassName(className, getFileScope());
  appendCss({
    type: "local",
    selector: className,
    rule
  }, getFileScope());
  return className;
}

// ../tokens/dist/index.mjs
var colors = {
  white: "#FFF",
  black: "#000",
  gray100: "#E1E1E6",
  gray200: "#A9A9B2",
  gray400: "#7C7C8A",
  gray500: "#505059",
  gray600: "#323238",
  gray700: "#29292E",
  gray800: "#202024",
  gray900: "#121214",
  ignite300: "#00B37E",
  ignite500: "#00875F",
  ignite700: "#015F43",
  ignite900: "#00291D"
};

// src/styles/theme.css.ts
var [themeClass, vars] = createTheme({
  color: __spreadValues({}, colors),
  font: {
    body: "arial"
  }
});

// src/components/Button.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function Button({ children, css }) {
  let classNames = "";
  if (css) {
    classNames = style(css(vars));
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: themeClass, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: classNames, children }) });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button
});
/*! Bundled license information:

cssesc/cssesc.js:
  (*! https://mths.be/cssesc v3.0.0 by @mathias *)

media-query-parser/dist/media-query-parser.esm.js:
  (*! @license MediaQueryParser - MIT License - Tom Golden (github@tbjgolden.com) *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)
*/

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.useLocalizer = void 0;

var _react = _interopRequireWildcard(require("react"));

var IntlLocalizers = _interopRequireWildcard(require("./IntlLocalizer"));

var _messages = require("./messages");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function mergeWithDefaults(date, number, messages, formatOverrides = {}) {
  if (!date && !number) throw new Error('This component requires a Localizer but none was provided');
  return {
    formatOverrides,
    messages: (0, _messages.getMessages)(messages),

    formatDate(value, format, userFormat) {
      return date[format](value, userFormat !== null && userFormat !== void 0 ? userFormat : this.formatOverrides[format]);
    },

    formatNumber(value, userFormat) {
      return number.format(value, userFormat !== null && userFormat !== void 0 ? userFormat : this.formatOverrides.number);
    },

    parseDate: date.parse.bind(date),
    parseNumber: number.parse.bind(number),
    decimalCharacter: number.decimalCharacter.bind(number),
    firstOfWeek: date.firstOfWeek.bind(date)
  };
}

const LocalizerContext = _react.default.createContext(mergeWithDefaults(new IntlLocalizers.DateLocalizer(), new IntlLocalizers.NumberLocalizer()));

const Localization = ({
  date,
  number,
  messages,
  children
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const localizer = (0, _react.useMemo)(() => mergeWithDefaults(date, number, messages), [date, number, // eslint-disable-next-line react-hooks/exhaustive-deps
  JSON.stringify(messages)]);
  return /*#__PURE__*/_react.default.createElement(LocalizerContext.Provider, {
    value: localizer
  }, children);
};

const useLocalizer = (messages, formats) => {
  const localizer = (0, _react.useContext)(LocalizerContext);
  return (0, _react.useMemo)(() => {
    if (!messages && !formats) return localizer;
    return _objectSpread(_objectSpread({}, localizer), {}, {
      messages: (0, _messages.getMessages)(_objectSpread(_objectSpread({}, localizer.messages), messages)),
      formatOverrides: _objectSpread(_objectSpread({}, localizer.formatOverrides), formats)
    });
  }, [messages, formats, localizer]);
};

exports.useLocalizer = useLocalizer;
Localization.useLocalizer = useLocalizer;
var _default = Localization;
exports.default = _default;
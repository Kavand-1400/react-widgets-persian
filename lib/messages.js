"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMessages = getMessages;
exports.useMessagesWithDefaults = void 0;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const messages = {
  moveToday: 'Today',
  moveBack: 'Navigate back',
  moveForward: 'Navigate forward',
  dateButton: 'Select date',
  timeButton: 'Select time',
  openCombobox: 'open combobox',
  openDropdown: 'open dropdown',
  placeholder: '',
  filterPlaceholder: '',
  emptyList: 'There are no items in this list',
  emptyFilter: 'هیچ نتیجه‌ای پیدا نشد!',
  createOption: (_value, searchTerm) => [' Create option', searchTerm && ' ', searchTerm && /*#__PURE__*/React.createElement("strong", {
    key: "_"
  }, `"${searchTerm}"`)],
  tagsLabel: 'Selected items',
  removeLabel: 'Remove selected item',
  noneSelected: 'no selected items',
  selectedItems: labels => `Selected items: ${labels.join(', ')}`,
  // number
  increment: 'Increment value',
  decrement: 'Decrement value'
};
const DEFAULTS = {};

function getMessages(defaults = DEFAULTS) {
  let processed = {};
  Object.keys(messages).forEach(message => {
    let value = defaults[message];
    if (value == null) value = messages[message];
    processed[message] = typeof value === 'function' ? value : () => value;
  });
  return processed;
}

const useMessagesWithDefaults = defaults => (0, React.useMemo)(() => getMessages(defaults), [defaults]);

exports.useMessagesWithDefaults = useMessagesWithDefaults;
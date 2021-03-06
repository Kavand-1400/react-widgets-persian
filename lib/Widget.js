"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWidgetProps = useWidgetProps;
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _useGlobalListener = _interopRequireDefault(require("@restart/hooks/useGlobalListener"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function useKeyboardNavigationCheck() {
  const [isNavigatingViaKeyboard, setIsNavigatingViaKeyboard] = (0, _react.useState)(false);
  (0, _useGlobalListener.default)('keydown', ({
    key
  }) => {
    if (key == ' ' || key === 'Tab' || key == 'Enter' || key && key.indexOf('Arrow') !== -1) {
      setIsNavigatingViaKeyboard(true);
    }
  }); // TODO: use pointerdown

  (0, _useGlobalListener.default)('mousedown', () => {
    setIsNavigatingViaKeyboard(false);
  });
  return isNavigatingViaKeyboard;
}

function useWidgetProps(props) {
  const tabIndex = props.tabIndex != null ? props.tabIndex : -1;
  const isKeyboardNavigating = useKeyboardNavigationCheck();
  return {
    tabIndex: tabIndex,
    'data-intent': isKeyboardNavigating ? 'keyboard' : 'mouse',
    className: (0, _classnames.default)(props.className, 'rw-widget', props.disabled && 'rw-state-disabled', props.readOnly && 'rw-state-readonly', props.focused && 'rw-state-focus', props.autofilling && 'rw-webkit-autofill', props.open && `rw-open${props.dropUp ? '-up' : ''}`)
  };
}

const Widget = _react.default.forwardRef((_ref, ref) => {
  let {
    className,
    tabIndex,
    focused,
    open,
    dropUp,
    disabled,
    readOnly,
    autofilling
  } = _ref,
      props = _objectWithoutProperties(_ref, ["className", "tabIndex", "focused", "open", "dropUp", "disabled", "readOnly", "autofilling"]);

  const widgetProps = useWidgetProps({
    className,
    tabIndex,
    focused,
    open,
    dropUp,
    disabled,
    readOnly,
    autofilling
  });
  return /*#__PURE__*/_react.default.createElement("div", Object.assign({
    ref: ref
  }, props, widgetProps));
});

Widget.displayName = 'Widget';
var _default = Widget;
exports.default = _default;
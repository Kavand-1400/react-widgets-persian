"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var PropTypes = _interopRequireWildcard(require("prop-types"));

var React = _interopRequireWildcard(require("react"));

var _uncontrollable = require("uncontrollable");

var _Icon = require("./Icon");

var _Input = _interopRequireDefault(require("./Input"));

var _List = _interopRequireDefault(require("./List"));

var _FocusListContext = require("./FocusListContext");

var _Popup = _interopRequireDefault(require("./Popup"));

var _InputAddon = _interopRequireDefault(require("./InputAddon"));

var _Widget = _interopRequireDefault(require("./Widget"));

var _WidgetPicker = _interopRequireDefault(require("./WidgetPicker"));

var _messages = require("./messages");

var _A11y = require("./A11y");

var CustomPropTypes = _interopRequireWildcard(require("./PropTypes"));

var _Accessors = require("./Accessors");

var _Filter = require("./Filter");

var _useDropdownToggle = _interopRequireDefault(require("./useDropdownToggle"));

var _useFocusManager = _interopRequireDefault(require("./useFocusManager"));

var _WidgetHelpers = require("./WidgetHelpers");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function indexOf(data, searchTerm, text) {
  if (!searchTerm.trim()) return -1;

  for (let idx = 0; idx < data.length; idx++) if (text(data[idx]).toLowerCase() === searchTerm) return idx;

  return -1;
}

let propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  open: PropTypes.bool,
  onToggle: PropTypes.func,
  renderListItem: PropTypes.func,
  listComponent: PropTypes.elementType,
  renderListGroup: PropTypes.func,
  groupBy: CustomPropTypes.accessor,
  data: PropTypes.array,
  dataKey: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,
  name: PropTypes.string,
  hideEmptyPopup: PropTypes.bool,
  hideCaret: PropTypes.bool,

  /**
   *
   * @type {(dataItem: ?any, metadata: { originalEvent: SyntheticEvent }) => void}
   */
  onSelect: PropTypes.func,
  autoFocus: PropTypes.bool,
  disabled: CustomPropTypes.disabled.acceptsArray,
  readOnly: CustomPropTypes.disabled,
  busy: PropTypes.bool,

  /** Specify the element used to render the select (down arrow) icon. */
  selectIcon: PropTypes.node,

  /** Specify the element used to render the busy indicator */
  busySpinner: PropTypes.node,
  dropUp: PropTypes.bool,
  popupTransition: PropTypes.elementType,
  placeholder: PropTypes.string,

  /** Adds a css class to the input container element. */
  containerClassName: PropTypes.string,
  inputProps: PropTypes.object,
  listProps: PropTypes.object,
  messages: PropTypes.shape({
    openCombobox: CustomPropTypes.message,
    emptyList: CustomPropTypes.message,
    emptyFilter: CustomPropTypes.message
  })
};

/**
 * ---
 * shortcuts:
 *   - { key: alt + down arrow, label: open combobox }
 *   - { key: alt + up arrow, label: close combobox }
 *   - { key: down arrow, label: move focus to next item }
 *   - { key: up arrow, label: move focus to previous item }
 *   - { key: home, label: move focus to first item }
 *   - { key: end, label: move focus to last item }
 *   - { key: enter, label: select focused item }
 *   - { key: any key, label: search list for item starting with key }
 * ---
 *
 * Select an item from the list, or input a custom value. The Combobox can also make suggestions as you type.

 * @public
 */
const ComboboxImpl = React.forwardRef(function Combobox(_ref, outerRef) {
  let {
    id,
    className,
    containerClassName,
    placeholder,
    autoFocus,
    textField,
    dataKey,
    autoSelectMatches,
    focusFirstItem = false,
    value,
    defaultValue = '',
    onChange,
    open,
    defaultOpen = false,
    onToggle,
    filter = true,
    busy,
    disabled,
    readOnly,
    selectIcon = _Icon.caretDown,
    hideCaret,
    hideEmptyPopup,
    busySpinner,
    dropUp,
    tabIndex,
    popupTransition,
    name,
    onSelect,
    onKeyDown,
    onBlur,
    onFocus,
    inputProps,
    listProps,
    groupBy,
    renderListItem,
    renderListGroup,
    optionComponent,
    listComponent: ListComponent = _List.default,
    data: rawData = [],
    messages: userMessages
  } = _ref,
      elementProps = _objectWithoutProperties(_ref, ["id", "className", "containerClassName", "placeholder", "autoFocus", "textField", "dataKey", "autoSelectMatches", "focusFirstItem", "value", "defaultValue", "onChange", "open", "defaultOpen", "onToggle", "filter", "busy", "disabled", "readOnly", "selectIcon", "hideCaret", "hideEmptyPopup", "busySpinner", "dropUp", "tabIndex", "popupTransition", "name", "onSelect", "onKeyDown", "onBlur", "onFocus", "inputProps", "listProps", "groupBy", "renderListItem", "renderListGroup", "optionComponent", "listComponent", "data", "messages"]);

  let [currentValue, handleChange] = (0, _uncontrollable.useUncontrolledProp)(value, defaultValue, onChange);
  const [currentOpen, handleOpen] = (0, _uncontrollable.useUncontrolledProp)(open, defaultOpen, onToggle);
  const ref = (0, React.useRef)(null);
  const inputRef = (0, React.useRef)(null);
  const listRef = (0, React.useRef)(null);
  const [suggestion, setSuggestion] = (0, React.useState)(null);
  const shouldFilter = (0, React.useRef)(false);
  const inputId = (0, _WidgetHelpers.useInstanceId)(id, '_input');
  const listId = (0, _WidgetHelpers.useInstanceId)(id, '_listbox');
  const activeId = (0, _WidgetHelpers.useInstanceId)(id, '_listbox_active_option');
  const accessors = (0, _Accessors.useAccessors)(textField, dataKey);
  const messages = (0, _messages.useMessagesWithDefaults)(userMessages);
  const toggle = (0, _useDropdownToggle.default)(currentOpen, handleOpen);
  const isDisabled = disabled === true;
  const isReadOnly = !!readOnly;
  const data = (0, _Filter.useFilteredData)(rawData, filter, shouldFilter.current ? accessors.text(currentValue) : void 0, accessors.text);
  const selectedItem = (0, React.useMemo)(() => data[accessors.indexOf(data, currentValue)], [data, currentValue, accessors]);
  const list = (0, _FocusListContext.useFocusList)({
    activeId,
    scope: ref,
    focusFirstItem,
    anchorItem: currentOpen ? selectedItem : undefined
  });
  const [focusEvents, focused] = (0, _useFocusManager.default)(ref, {
    disabled: isDisabled,
    onBlur,
    onFocus
  }, {
    didHandle(focused) {
      if (!focused) {
        shouldFilter.current = false;
        toggle.close();
        setSuggestion(null);
        list.focus(undefined);
      } else {
        focus({
          preventScroll: true
        });
      }
    }

  });
  (0, _A11y.useActiveDescendant)(ref, activeId, currentOpen, [list.getFocused()]);
  /**
   * Handlers
   */

  const handleClick = () => {
    if (readOnly || disabled) return;
    focus();
    toggle();
  };

  const handleSelect = (data, originalEvent) => {
    toggle.close();
    shouldFilter.current = false;
    setSuggestion(null);
    (0, _WidgetHelpers.notify)(onSelect, [data, {
      originalEvent
    }]);
    change(data, originalEvent);
    focus({
      preventScroll: true
    });
  };

  const handleInputKeyDown = ({
    key
  }) => {
    if (key === 'Backspace' || key === 'Delete') {
      list.focus(null);
    }
  };

  const handleInputChange = event => {
    let idx = autoSelectMatches ? indexOf(rawData, event.target.value.toLowerCase(), accessors.text) : -1;
    shouldFilter.current = true;
    setSuggestion(null);
    change(idx === -1 ? event.target.value : rawData[idx], event);
    toggle.open();
  };

  const handleKeyDown = e => {
    if (readOnly) return;
    let {
      key,
      altKey,
      shiftKey
    } = e;
    (0, _WidgetHelpers.notify)(onKeyDown, [e]);
    if (e.defaultPrevented) return;

    const select = item => item != null && handleSelect(item, e);

    const setFocused = el => {
      if (!el) return;
      setSuggestion(list.toDataItem(el));
      list.focus(el);
    };

    if (key === 'End' && currentOpen && !shiftKey) {
      e.preventDefault();
      setFocused(list.last());
    } else if (key === 'Home' && currentOpen && !shiftKey) {
      e.preventDefault();
      setFocused(list.first());
    } else if (key === 'Escape' && currentOpen) {
      e.preventDefault();
      setSuggestion(null);
      toggle.close();
    } else if (key === 'Enter' && currentOpen) {
      e.preventDefault();
      select(list.getFocused());
    } else if (key === 'ArrowDown') {
      e.preventDefault();

      if (currentOpen) {
        setFocused(list.next());
      } else {
        return toggle.open();
      }
    } else if (key === 'ArrowUp') {
      e.preventDefault();
      if (altKey) return toggle.close();

      if (currentOpen) {
        setFocused(list.prev());
      }
    }
  };
  /**
   * Methods
   */


  function focus(opts) {
    if (inputRef.current) inputRef.current.focus(opts);
  }

  function change(nextValue, originalEvent) {
    handleChange(nextValue, {
      lastValue: currentValue,
      originalEvent
    });
  }
  /**
   * Rendering
   */


  (0, React.useImperativeHandle)(outerRef, () => ({
    focus
  }));
  let shouldRenderPopup = (0, _WidgetHelpers.useFirstFocusedRender)(focused, currentOpen);
  let valueItem = accessors.findOrSelf(data, currentValue);
  let inputValue = accessors.text(suggestion || valueItem);
  let completeType = filter ? 'list' : 'none';
  let popupOpen = currentOpen && (!hideEmptyPopup || !!data.length);
  return /*#__PURE__*/React.createElement(_Widget.default, Object.assign({}, elementProps, {
    ref: ref,
    open: currentOpen,
    dropUp: dropUp,
    focused: focused,
    disabled: isDisabled,
    readOnly: isReadOnly
  }, focusEvents, {
    onKeyDown: handleKeyDown,
    className: (0, _classnames.default)(className, 'rw-combobox')
  }), /*#__PURE__*/React.createElement(_WidgetPicker.default, {
    className: containerClassName,
    hideCaret: hideCaret
  }, /*#__PURE__*/React.createElement(_Input.default, Object.assign({}, inputProps, {
    role: "combobox",
    name: name,
    id: inputId,
    className: (0, _classnames.default)( // @ts-ignore
    inputProps && inputProps.className, 'rw-widget-input rw-combobox-input'),
    autoFocus: autoFocus,
    tabIndex: tabIndex,
    disabled: isDisabled,
    readOnly: isReadOnly,
    "aria-busy": !!busy,
    "aria-owns": listId,
    "aria-autocomplete": completeType,
    "aria-expanded": currentOpen,
    "aria-haspopup": true,
    placeholder: placeholder,
    value: inputValue,
    onChange: handleInputChange,
    onKeyDown: handleInputKeyDown,
    ref: inputRef
  })), !hideCaret && /*#__PURE__*/React.createElement(_InputAddon.default, {
    busy: busy,
    icon: selectIcon,
    spinner: busySpinner,
    onClick: handleClick,
    disabled: !!isDisabled || isReadOnly // FIXME
    ,
    label: messages.openCombobox()
  })), /*#__PURE__*/React.createElement(_FocusListContext.FocusListContext.Provider, {
    value: list.context
  }, shouldRenderPopup && /*#__PURE__*/React.createElement(_Popup.default, {
    dropUp: dropUp,
    open: popupOpen,
    transition: popupTransition,
    onEntering: () => listRef.current.scrollIntoView()
  }, /*#__PURE__*/React.createElement(ListComponent, Object.assign({}, listProps, {
    id: listId,
    tabIndex: -1,
    data: data,
    groupBy: groupBy,
    disabled: disabled,
    accessors: accessors,
    renderItem: renderListItem,
    renderGroup: renderListGroup,
    optionComponent: optionComponent,
    value: selectedItem,
    searchTerm: valueItem && accessors.text(valueItem) || '',
    "aria-hidden": !popupOpen,
    "aria-labelledby": inputId,
    "aria-live": popupOpen ? 'polite' : void 0,
    onChange: (d, meta) => handleSelect(d, meta.originalEvent),
    ref: listRef,
    messages: {
      emptyList: rawData.length ? messages.emptyFilter : messages.emptyList
    }
  })))));
});
ComboboxImpl.displayName = 'Combobox';
ComboboxImpl.propTypes = propTypes;
var _default = ComboboxImpl;
exports.default = _default;
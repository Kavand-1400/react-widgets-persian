"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useAutoFocus;

var _react = require("react");

function useAutoFocus(autoFocus, ref) {
  (0, _react.useEffect)(() => {
    if (autoFocus && ref.current) ref.current.focus(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
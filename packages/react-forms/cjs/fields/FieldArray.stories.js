"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StressTest = exports.BasicArrayExample = exports.default = void 0;

var _react = require("react");

var _addonActions = require("@storybook/addon-actions");

var _Form = _interopRequireDefault(require("../forms/Form"));

var _InputField = _interopRequireDefault(require("./InputField"));

var _FieldArray = _interopRequireDefault(require("./FieldArray"));

var _FormElement = _interopRequireDefault(require("../forms/FormElement"));

var _useFormContext = _interopRequireDefault(require("../forms/useFormContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  title: 'Fields/Arrays',
  component: _FieldArray.default
};
exports.default = _default;

const ChangeWatcher = () => {
  const {
    state
  } = (0, _useFormContext.default)();
  (0, _react.useEffect)(() => {
    (0, _addonActions.action)('change')(state.get('value').toJS());
  }, [state.get('value')]);
  return null;
};

const BasicArrayExample = () => {
  const initialValue = (0, _react.useMemo)(() => ({
    items: [{
      title: 'Buy eggs',
      finished: true
    }, {
      title: 'Buy milk',
      finished: false
    }, {
      title: 'Wash car',
      finished: false
    }]
  }), []);
  return /*#__PURE__*/React.createElement("div", {
    className: "container mt-5 mb-5"
  }, /*#__PURE__*/React.createElement(_Form.default, {
    initialValue: initialValue,
    onSubmit: (0, _addonActions.action)('submit')
  }, /*#__PURE__*/React.createElement(ChangeWatcher, null), /*#__PURE__*/React.createElement(_FormElement.default, null, /*#__PURE__*/React.createElement(_FieldArray.default, {
    name: "items"
  }, ({
    map,
    push,
    unshift
  }) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => unshift({
      title: '',
      finished: false
    })
  }, "Prepend item"), map(({
    key,
    childName,
    remove
  }) => /*#__PURE__*/React.createElement(_react.Fragment, {
    key: key
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group form-group-inline"
  }, /*#__PURE__*/React.createElement("label", null, "Task:", /*#__PURE__*/React.createElement(_InputField.default, {
    className: "form-control",
    name: childName('title')
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-check form-check-inline"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-check-label"
  }, /*#__PURE__*/React.createElement(_InputField.default, {
    className: "form-check-input",
    type: "checkbox",
    name: childName('finished')
  }), ' ', "Finished")), /*#__PURE__*/React.createElement("div", {
    className: "form-group form-group-inline"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: remove
  }, "X"))))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => push({
      title: '',
      finished: false
    })
  }, "Append item"))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    type: "submit"
  }, "Submit")))));
};

exports.BasicArrayExample = BasicArrayExample;

const StressTest = () => {
  const initialValue = (0, _react.useMemo)(() => ({
    items: Array.from({
      length: 50
    }, (_, i) => ({
      title: `Item ${i}`,
      finished: true
    }))
  }), []);
  return /*#__PURE__*/React.createElement("div", {
    className: "container mt-5 mb-5"
  }, /*#__PURE__*/React.createElement(_Form.default, {
    initialValue: initialValue,
    onSubmit: (0, _addonActions.action)('submit')
  }, /*#__PURE__*/React.createElement(_FormElement.default, null, /*#__PURE__*/React.createElement(_FieldArray.default, {
    name: "items"
  }, ({
    map,
    push,
    unshift
  }) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    onClick: () => unshift(...Array.from({
      length: 50
    }, () => ({
      title: '',
      finished: false
    }))),
    type: "button"
  }, "Prepend 50 items"), map(({
    key,
    childName,
    remove
  }) => /*#__PURE__*/React.createElement(_react.Fragment, {
    key: key
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group form-group-inline"
  }, /*#__PURE__*/React.createElement("label", null, "Task:", /*#__PURE__*/React.createElement(_InputField.default, {
    className: "form-control",
    name: childName('title')
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-check form-check-inline"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-check-label"
  }, /*#__PURE__*/React.createElement(_InputField.default, {
    className: "form-check-input",
    type: "checkbox",
    name: childName('finished')
  }), ' ', "Finished")), /*#__PURE__*/React.createElement("div", {
    className: "form-group form-group-inline"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: remove
  }, "X"))))), /*#__PURE__*/React.createElement("button", {
    onClick: () => push(...Array.from({
      length: 50
    }, () => ({
      title: '',
      finished: false
    }))),
    type: "button"
  }, "Append 50 items"))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    type: "submit"
  }, "Submit")))));
};

exports.StressTest = StressTest;
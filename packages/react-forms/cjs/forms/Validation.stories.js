"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidationUsingYup = exports.default = void 0;

var _react = require("react");

var _addonActions = require("@storybook/addon-actions");

var _Form = _interopRequireDefault(require("./Form"));

var _InputField = _interopRequireDefault(require("../fields/InputField"));

var _FormElement = _interopRequireDefault(require("./FormElement"));

var _useFormContext = _interopRequireDefault(require("./useFormContext"));

var _yup = require("yup");

var _ErrorMessageList = _interopRequireDefault(require("../fields/ErrorMessageList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  title: 'Forms/Validation',
  component: _Form.default
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

const ValidationUsingYup = () => {
  const initialValue = (0, _react.useMemo)(() => ({
    email: '',
    password: '',
    contact: {
      firstName: '',
      lastName: ''
    }
  }), []);
  const validationSchema = (0, _react.useMemo)(() => (0, _yup.object)().shape({
    email: (0, _yup.string)().required().email().max(64),
    password: (0, _yup.string)().required().min(8).max(64),
    contact: (0, _yup.object)().required().shape({
      firstName: (0, _yup.string)().required().min(5),
      lastName: (0, _yup.string)().required().min(5)
    })
  }), []);
  return /*#__PURE__*/React.createElement("div", {
    className: "container mt-5 mb-5"
  }, /*#__PURE__*/React.createElement(_Form.default, {
    initialValue: initialValue,
    onSubmit: (0, _addonActions.action)('submit'),
    validationSchema: validationSchema
  }, /*#__PURE__*/React.createElement(ChangeWatcher, null), /*#__PURE__*/React.createElement(_FormElement.default, null, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "E-Mail Address:", /*#__PURE__*/React.createElement(_InputField.default, {
    className: "form-control",
    name: "email"
  }), /*#__PURE__*/React.createElement(_ErrorMessageList.default, {
    name: "email"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group col-md-6"
  }, /*#__PURE__*/React.createElement("label", null, "First Name:", /*#__PURE__*/React.createElement(_InputField.default, {
    className: "form-control",
    name: "contact.firstName"
  }), /*#__PURE__*/React.createElement(_ErrorMessageList.default, {
    name: "contact.firstName"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group col-md-6"
  }, /*#__PURE__*/React.createElement("label", null, "Last Name:", /*#__PURE__*/React.createElement(_InputField.default, {
    className: "form-control",
    name: "contact.lastName"
  }), /*#__PURE__*/React.createElement(_ErrorMessageList.default, {
    name: "contact.lastName"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "Password:", /*#__PURE__*/React.createElement(_InputField.default, {
    className: "form-control",
    name: "password"
  }), /*#__PURE__*/React.createElement(_ErrorMessageList.default, {
    name: "password"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    type: "submit"
  }, "Sign up")))));
};

exports.ValidationUsingYup = ValidationUsingYup;
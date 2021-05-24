"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NestedArrayPath = exports.NestedValues = exports.AllInbuiltInputs = exports.Basic = exports.default = void 0;

var _react = require("react");

var _addonActions = require("@storybook/addon-actions");

var _Form = _interopRequireDefault(require("./Form"));

var _InputField = _interopRequireDefault(require("../fields/InputField"));

var _SelectField = _interopRequireDefault(require("../fields/SelectField"));

var _TextAreaField = _interopRequireDefault(require("../fields/TextAreaField"));

var _SpanField = _interopRequireDefault(require("../fields/SpanField"));

var _FormElement = _interopRequireDefault(require("./FormElement"));

var _useFormContext = _interopRequireDefault(require("./useFormContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  title: 'Forms/Creating Forms',
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

const Basic = () => {
  const initialValue = (0, _react.useMemo)(() => ({
    email: 'someone@example.com',
    password: '12345'
  }), []);
  return /*#__PURE__*/React.createElement("div", {
    className: "container mt-5 mb-5"
  }, /*#__PURE__*/React.createElement(_Form.default, {
    initialValue: initialValue,
    onSubmit: (0, _addonActions.action)('submit')
  }, /*#__PURE__*/React.createElement(ChangeWatcher, null), /*#__PURE__*/React.createElement(_FormElement.default, null, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "E-Mail:", /*#__PURE__*/React.createElement(_InputField.default, {
    name: "email",
    className: "form-control"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "Password:", /*#__PURE__*/React.createElement(_InputField.default, {
    name: "password",
    type: "password",
    className: "form-control"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    type: "submit"
  }, "Submit")))));
};

exports.Basic = Basic;

const AllInbuiltInputs = () => {
  const initialValue = (0, _react.useMemo)(() => ({
    exampleText: 'Example Text',
    exampleOption: 'option-three',
    exampleMultiOption: ['option-three', 'option-five'],
    exampleChecked: true,
    exampleRadioValue: 'c',
    exampleTime: 6000,
    exampleDate: Math.floor(Date.now() / 1000),
    exampleDateTime: Math.floor(Date.now() / 1000),
    exampleTextArea: 'Some content'
  }), []);
  return /*#__PURE__*/React.createElement("div", {
    className: "container mt-5 mb-5"
  }, /*#__PURE__*/React.createElement(_Form.default, {
    initialValue: initialValue,
    onSubmit: (0, _addonActions.action)('submit')
  }, /*#__PURE__*/React.createElement(ChangeWatcher, null), /*#__PURE__*/React.createElement(_FormElement.default, null, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "Text Input:", /*#__PURE__*/React.createElement(_InputField.default, {
    name: "exampleText",
    className: "form-control"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "Select:", /*#__PURE__*/React.createElement(_SelectField.default, {
    name: "exampleOption",
    className: "form-control"
  }, /*#__PURE__*/React.createElement("option", {
    value: "option-one"
  }, "Option One"), /*#__PURE__*/React.createElement("option", {
    value: "option-twp"
  }, "Option Two"), /*#__PURE__*/React.createElement("option", {
    value: "option-three"
  }, "Option Three")))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "Multi Select:", /*#__PURE__*/React.createElement(_SelectField.default, {
    name: "exampleMultiOption",
    multiple: true,
    className: "form-control"
  }, /*#__PURE__*/React.createElement("option", {
    value: "option-one"
  }, "Option One"), /*#__PURE__*/React.createElement("option", {
    value: "option-twp"
  }, "Option Two"), /*#__PURE__*/React.createElement("option", {
    value: "option-three"
  }, "Option Three"), /*#__PURE__*/React.createElement("option", {
    value: "option-four"
  }, "Option Four"), /*#__PURE__*/React.createElement("option", {
    value: "option-five"
  }, "Option Five")))), /*#__PURE__*/React.createElement("div", {
    className: "form-check"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-check-label"
  }, /*#__PURE__*/React.createElement(_InputField.default, {
    name: "exampleChecked",
    type: "checkbox",
    className: "form-check-input"
  }), ' ', "Check this or don't")), /*#__PURE__*/React.createElement("div", {
    className: "form-check form-check-inline"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-check-label"
  }, /*#__PURE__*/React.createElement(_InputField.default, {
    name: "exampleRadioValue",
    type: "radio",
    value: "a",
    className: "form-check-input"
  }), "A"), ' ', /*#__PURE__*/React.createElement("label", {
    className: "form-check-label"
  }, /*#__PURE__*/React.createElement(_InputField.default, {
    name: "exampleRadioValue",
    type: "radio",
    value: "b",
    className: "form-check-input"
  }), ' ', "B"), ' ', /*#__PURE__*/React.createElement("label", {
    className: "form-check-label"
  }, /*#__PURE__*/React.createElement(_InputField.default, {
    name: "exampleRadioValue",
    type: "radio",
    value: "c",
    className: "form-check-input"
  }), ' ', "C")), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "Time:", /*#__PURE__*/React.createElement(_InputField.default, {
    name: "exampleTime",
    type: "time",
    className: "form-control"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "Date:", /*#__PURE__*/React.createElement(_InputField.default, {
    name: "exampleDate",
    type: "date",
    className: "form-control"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "Datetime Local:", /*#__PURE__*/React.createElement(_InputField.default, {
    name: "exampleDateTime",
    type: "datetime-local",
    className: "form-control"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "Text area:", /*#__PURE__*/React.createElement(_TextAreaField.default, {
    name: "exampleTextArea",
    rows: 6,
    className: "form-control"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, "Submit")))));
};

exports.AllInbuiltInputs = AllInbuiltInputs;

const NestedValues = () => {
  const initialValue = (0, _react.useMemo)(() => ({
    firstName: 'Bob',
    lastName: 'Kelsoe',
    snack: 'Muffin',
    age: 38,
    contactInfos: {
      linkedIn: 'https://linkedin.com/BobKelsoe',
      twitter: 'https://twitter.com/BobKelsoe',
      github: 'https://github.com/BobKelsoe'
    }
  }), []);
  return /*#__PURE__*/React.createElement("div", {
    className: "container mt-5 mb-5"
  }, /*#__PURE__*/React.createElement(_Form.default, {
    initialValue: initialValue,
    onSubmit: (0, _addonActions.action)('submit')
  }, /*#__PURE__*/React.createElement(ChangeWatcher, null), /*#__PURE__*/React.createElement(_FormElement.default, null, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "First Name:", /*#__PURE__*/React.createElement(_InputField.default, {
    name: "firstName",
    className: "form-control"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "Last Name:", /*#__PURE__*/React.createElement(_InputField.default, {
    name: "lastName",
    className: "form-control"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "Age:", /*#__PURE__*/React.createElement(_InputField.default, {
    name: "age",
    className: "form-control"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "Snack: ", /*#__PURE__*/React.createElement(_SpanField.default, {
    name: "snack"
  }))), /*#__PURE__*/React.createElement("fieldset", null, /*#__PURE__*/React.createElement("legend", null, "Contact Info"), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "LinkedIn:", /*#__PURE__*/React.createElement(_InputField.default, {
    name: "contactInfos.linkedIn",
    className: "form-control"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "Twitter:", /*#__PURE__*/React.createElement(_InputField.default, {
    name: "contactInfos.twitter",
    className: "form-control"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "GitHub:", /*#__PURE__*/React.createElement(_InputField.default, {
    name: "contactInfos.github",
    className: "form-control"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, "Submit")))));
};

exports.NestedValues = NestedValues;

const NestedArrayPath = () => {
  const initialValue = (0, _react.useMemo)(() => ({
    firstName: 'Bob',
    lastName: 'Kelsoe',
    snack: 'Muffin',
    age: 38,
    skills: [{
      description: 'Eating muffins'
    }, {
      description: 'Being awesome'
    }, {
      description: 'Eating more muffins'
    }]
  }), []);
  return /*#__PURE__*/React.createElement("div", {
    className: "container mt-5 mb-5"
  }, /*#__PURE__*/React.createElement(_Form.default, {
    initialValue: initialValue,
    onSubmit: (0, _addonActions.action)('submit')
  }, /*#__PURE__*/React.createElement(ChangeWatcher, null), /*#__PURE__*/React.createElement(_FormElement.default, null, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "First Name:", /*#__PURE__*/React.createElement(_InputField.default, {
    name: "firstName",
    className: "form-control"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "Last Name:", /*#__PURE__*/React.createElement(_InputField.default, {
    name: "lastName",
    className: "form-control"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "Age:", /*#__PURE__*/React.createElement(_InputField.default, {
    name: "age",
    className: "form-control"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "Snack: ", /*#__PURE__*/React.createElement(_SpanField.default, {
    name: "snack"
  }))), /*#__PURE__*/React.createElement("fieldset", null, /*#__PURE__*/React.createElement("legend", null, "Contact Info"), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "LinkedIn:", /*#__PURE__*/React.createElement(_InputField.default, {
    name: "skills.0.description",
    className: "form-control"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "Twitter:", /*#__PURE__*/React.createElement(_InputField.default, {
    name: "skills.1.description",
    className: "form-control"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "GitHub:", /*#__PURE__*/React.createElement(_InputField.default, {
    name: "skills.2.description",
    className: "form-control"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, "Submit")))));
};

exports.NestedArrayPath = NestedArrayPath;
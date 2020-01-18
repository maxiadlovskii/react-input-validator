function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSingleValidation } from "../../hooks";
import classNames from 'classnames';
export const Input = ({
  rules = [],
  onChange,
  onBlur,
  trigger,
  children,
  onErrors,
  cssModule = {},
  inputClassName,
  errorsClassName,
  errorClassName,
  className,
  showError = true,
  ...rest
}) => {
  const {
    onTrigger,
    errors
  } = useSingleValidation({
    trigger,
    rules
  });
  useMemo(() => !!errors.length && onErrors && onErrors(errors), [errors]);

  const handlerOnChange = e => {
    onTrigger.onChange && onTrigger.onChange(e);
    onChange && onChange(e);
  };

  const handlerOnBlur = e => {
    onTrigger.onBlur && onTrigger.onBlur(e);
    onBlur && onBlur(e);
  };

  useSingleValidation({
    rules,
    trigger: 'onChange'
  });
  return React.createElement(React.Fragment, null, React.createElement("input", _extends({
    className: classNames('my-validated-input', cssModule.input, inputClassName, className),
    onChange: handlerOnChange,
    onBlur: handlerOnBlur
  }, rest), children), showError && errors && !!errors.length && React.createElement("ul", {
    className: classNames('my-validated-input__errors', cssModule.errors, errorsClassName)
  }, errors.map((error, i) => React.createElement("li", {
    key: `error_${i}`,
    className: classNames('my-validated-input__error', cssModule.error, errorClassName)
  }, error))));
};
Input.propTypes = {
  rules: PropTypes.array
};
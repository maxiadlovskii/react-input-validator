import { useState, useCallback, useMemo } from "react";
const defaultMessages = {
  HIGHER: value => `Value should be lower or equal ${value}`,
  LOWER: value => `Value should be higher or equal ${value}`,
  REQUIRED: () => `Field is required`,
  VALIDATOR: () => `Field has incorrect value`
};
const mapValidate = {
  max: ({
    value,
    comparator: maximum,
    message
  }) => Number(maximum) < Number(value) && (message || defaultMessages.HIGHER(maximum)),
  min: ({
    value,
    comparator: minimum,
    message
  }) => Number(minimum) > Number(value) && (message || defaultMessages.LOWER(minimum)),
  regExp: ({
    comparator: regExp,
    value,
    message
  }) => regExp && !new RegExp(regExp).test(value) && (message || defaultMessages.VALIDATOR()),
  required: ({
    value,
    message,
    comparator: isRequired
  }) => isRequired && (value === undefined || value === '') && (message || defaultMessages.REQUIRED()),
  validator: ({
    comparator: f,
    value,
    message
  }) => !f(value) && (message || defaultMessages.VALIDATOR())
};
export const useSingleValidation = ({
  rules = [],
  trigger
}) => {
  const [errorList, setErrorList] = useState({});
  const [errors, setErrors] = useState([]);
  useMemo(() => {
    setErrors(Object.keys(errorList));
  }, [errorList]);
  const validate = useCallback(value => setErrorList(rules.reduce((errors, {
    message,
    ...rest
  }) => {
    Object.entries(mapValidate).forEach(([key, method]) => {
      if (rest.hasOwnProperty(key)) {
        const error = method({
          message,
          value,
          comparator: rest[key]
        });
        error && (errors[error] = true);
      }
    });
    return errors;
  }, {})), [rules, trigger]);
  const mapTrigger = useCallback(({
    target: {
      value
    }
  }) => {
    validate(value);
  }, [trigger, validate]);
  const forceValidation = useCallback(value => validate(value), [rules, trigger, validate]);
  return {
    onTrigger: {
      [trigger]: mapTrigger
    },
    forceValidation,
    errors
  };
};
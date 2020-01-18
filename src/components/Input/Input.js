import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import {useSingleValidation} from "../../hooks";
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
                          ...rest }) => {
    const {
        onTrigger,
        errors
    } = useSingleValidation({ trigger, rules });
    useMemo(()=>!!errors.length && onErrors && onErrors(errors), [errors]);
    const handlerOnChange = e => {
        onTrigger.onChange && onTrigger.onChange(e);
        onChange && onChange(e)
    };
    const handlerOnBlur = e => {
        onTrigger.onBlur && onTrigger.onBlur(e);
        onBlur && onBlur(e)
    };
    useSingleValidation({ rules, trigger: 'onChange'});
    return <>
        <input
            className={classNames(
                'my-validated-input',
                cssModule.input,
                inputClassName,
                className
                )
            }
            onChange={handlerOnChange}
            onBlur={handlerOnBlur}
            {...rest}
        >
            {children}
        </input>
        {showError && errors && !!errors.length && <ul
            className={classNames(
                'my-validated-input__errors',
                cssModule.errors,
                errorsClassName
            )
            }>
            {errors.map((error, i)=><li
                key={`error_${i}`}
                className={classNames(
                    'my-validated-input__error',
                    cssModule.error,
                    errorClassName
                )}
                >{error}</li>
            )}
        </ul>}
        </>
;}

Input.propTypes = {
    rules: PropTypes.array
}
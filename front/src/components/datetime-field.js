import React from 'react'
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'
import DateTime from 'react-datetime'

export default ({
  input,
  label,
  placeholder,
  dateFormat,
  timeFormat,
  type,
  meta: { touched, error, warning },
  ...otherProps
}) => (
  <FormGroup validationState={touched && error ? 'error' : null}>
    <ControlLabel>{label}</ControlLabel>
    <DateTime {...input} inputProps={{ placeholder }} dateFormat={dateFormat} timeFormat={timeFormat} {...otherProps} />
    {touched && error && <HelpBlock>{error}</HelpBlock>}
  </FormGroup>
)

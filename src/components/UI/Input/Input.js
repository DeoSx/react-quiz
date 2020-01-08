import React from 'react'
import classes from './Input.css'

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched
}

const Input = props => {
  const cls = [
    classes.Input
  ]
  const inputType = props.type || 'text'
  const htmlFor = `${inputType}-${Math.random()}`

  if (isInvalid(props)) {
    cls.push(classes.invalid)
  }

  return (
    <div
      className={cls.join(' ')}
    >
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={props.type}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />
      {
        isInvalid(props)
          ? <span>{props.errorMessage || 'Write the correct value'}</span>
          : null
      }
    </div>
  )
}

export default Input
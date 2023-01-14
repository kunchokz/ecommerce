import React from 'react';

export const SubmitButton = (props) => {
  const enabledLabel = props.enabledLabel || 'Submit';
  const disabledLabel = props.disabledLabel || 'Submitting...'

  let btn = props.isSubmitting
    ? <button disabled className="btn btn-info">{disabledLabel}</button>
    : <button disabled={props.isDisabled} className="btn btn-primary" type="submit">{enabledLabel}</button>

  return btn;
}
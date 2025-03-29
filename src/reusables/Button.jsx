import React from 'react'

function Button(props) {
    const{type, disabled,style, action} = props;
  return (
    <div>

    <button type={type} className={style} disabled={disabled} >{action}</button>
      
    </div>
  )
}

export default Button

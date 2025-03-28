import React from 'react'

function Button(props) {
    const{type, onClick, disabled,style, action} = props;
  return (
    <div>

    <button type={type} onClick={onClick} className={style} disabled={disabled} >{action}</button>
      
    </div>
  )
}

export default Button

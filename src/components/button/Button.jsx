import "./button.scss";

const classNames = {
    google:'google-sign-in',
    inverted : 'inverted'
}

const Button = ({children,classNameType,type,disabled,...others}) => {
  return (
    <button
    className={`button ${classNames[classNameType]}`}
    type={type}
    disabled={disabled}
    {...others}
    >{children}</button>
  )
}

export default Button
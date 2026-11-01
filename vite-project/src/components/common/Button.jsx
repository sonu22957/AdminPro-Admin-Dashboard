function Button({ children, variant = 'primary', type = 'button', onClick, ...props }) {
  return (
    <button
      type={type}
      className={variant === 'secondary' ? 'secondary-button' : 'primary-button'}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

import PropTypes from "prop-types";

const Button = ({
  disabled,
  styles,
  children,
  type = "primary",
  onClick = () => {},
}) => {
  const btnTypes = {
    primary: `bg-secondary text-white px-6 py-3 font-poppins text-[16px] font-medium outline-none ${styles} rounded-lg cursor-pointer transition-all duration-200 hover:bg-secondary/90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-md`,
    secondary: `bg-primary text-white px-6 py-3 font-poppins text-[16px] font-medium outline-none ${styles} rounded-lg cursor-pointer transition-all duration-200 hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-md`,
    submit: `bg-secondary text-white px-6 py-3 font-poppins text-[16px] font-medium outline-none ${styles} rounded-lg cursor-pointer transition-all duration-200 hover:bg-secondary/90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-md`,
    small: `bg-secondary px-4 py-2 font-poppins text-[14px] font-medium text-white outline-none ${styles} rounded-lg cursor-pointer transition-all duration-200 hover:bg-secondary/90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm`,
  };
  
  return (
    <button
      type={`button ${type === "submit" ? "submit" : ""}`}
      className={btnTypes[type]}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  styles: PropTypes.string,
  type: PropTypes.oneOf(["primary", "secondary", "submit", "small"]),
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default Button;
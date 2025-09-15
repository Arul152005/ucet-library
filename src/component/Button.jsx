import PropTypes from "prop-types";

const Button = ({
  disabled,
  styles,
  children,
  type = "primary",
  onClick = () => {},
}) => {
  const btnTypes = {
    primary: `bg-blue-gradient text-white px-6 py-4 font-poppins text-[18px] font-medium text-primary outline-none ${styles} rounded-[10px] cursor-pointer`,
    secondary: `bg-black-gradient px-6 py-4 font-poppins text-[18px] font-medium text-primary outline-none ${styles} rounded-[10px] text-white cursor-pointer`,
    submit: `bg-blue-gradient text-white px-6 py-4 font-poppins text-[18px] font-medium text-primary outline-none ${styles} rounded-[10px] cursor-pointer`,
    small: `bg-blue-gradient px-4 py-2 font-poppins text-[14px] font-medium text-primary outline-none ${styles} rounded-[10px] cursor-pointer`,
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
};

export default Button;

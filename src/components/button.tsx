import { ButtonProps } from '../utils/interface';

const HomeButton = ({
  title,
  onClick,
  type,
  bg,
  width,
  color,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      style={{ backgroundColor: bg, width: width, color: color }}
      className={`py-[12px] px-[30px] text-white   border-none  rounded-md cursor-pointer flex items-center justify-center text-[14px] font-semibold transition-all duration-300 ease-in-out hover:scale-105 active:scale-95`}
    >
      {title}
    </button>
  );
};

export default HomeButton;

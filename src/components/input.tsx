import { InputProps } from '../utils/interface';

const HomeInput = ({
  type,
  placeholder,
  label,
  onChange,
  value,
  name,
  border,
  onKeyPress,
}: InputProps) => {
  return (
    <div className='w-full'>
      <h3 className='text-[#1E1E1E] text-[13px] font-roboto mb-2'>{label}</h3>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        className={`h-[52px] w-full  border-solid border-[1px] border-[#E8ECEF] ${border} rounded-[2px] outline-none px-4 placeholder-[#98A9BC] placeholder:text-[14px] placeholder:font-[400]`}
      />
    </div>
  );
};

export default HomeInput;

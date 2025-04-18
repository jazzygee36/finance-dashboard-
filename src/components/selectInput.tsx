import { SelectProps } from '../utils/interface';

const SelectInput = ({
  option,
  label,
  name,
  value,
  onChange,
  border,
}: SelectProps) => {
  return (
    <div className='w-full'>
      <h3 className='text-[#1E1E1E] text-[13px] font-roboto mb-2'>{label}</h3>
      <select
        className={`h-[52px] w-full border-1 border-[#E8ECEF] ${border} outline-none px-4 rounded-[2px]`}
        name={name}
        value={value}
        onChange={onChange}
      >
        {option.map((opt: any, index: any) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;

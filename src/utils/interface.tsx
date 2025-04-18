export interface ButtonProps {
  title: string;
  onClick?: () => void;
  type: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  className?: string;
  bg: string;
  width: string;
  color?: string;
}

export interface InputProps {
  type: string;
  placeholder: string;
  label?: string;
  name?: string;
  value?: string;
  border?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
}

export interface SelectProps {
  label?: string;
  option: { value: string; label: string }[];
  name: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  border?: string;
}

export interface ErrorProps {
  title: string;
  onClose?: () => void;
}

export interface dashboardProps {
  title: string;
  setIsOpen?: (val: boolean) => void;
  isOpen?: boolean;
  children: React.ReactNode;
}
export interface headerProps {
  title: string;
}

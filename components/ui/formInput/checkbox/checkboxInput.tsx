import { Checkbox } from './checkbox';

type checkbox = {
  id: string;
  className?: string;
  label?: string;
  checked: boolean;
  onChange: () => void;
};

const CheckboxInput = ({
  id,
  className,
  label,
  checked,
  onChange,
}: checkbox) => {
  return (
    <div className={`flex items-center gap-3 ${className} `}>
      <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default CheckboxInput;

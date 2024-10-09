import { 
  Location, 
  Condition, 
  Department, 
  TransducerType 
} from "../../models/model";

interface Props extends React.ComponentPropsWithoutRef<"select">{
  label: string;
  name: string;
  value: string;
  className: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: Array<Location | Condition | Department | TransducerType>;
};

const Select = ({ label, name, value, className, onChange, options = [], ...props }: Props) => {
  return (
    <div className={className}>
      <label>
        {label}
        <select name={name} value={value} onChange={onChange} {...props}>
          <option value="">Select</option>
          {options.map(option => 
            (<option key={option} value={option}>{option}</option>)
          )}
        </select>
      </label>
    </div>
  );
};

export default Select;
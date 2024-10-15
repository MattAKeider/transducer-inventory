interface Props extends React.ComponentPropsWithoutRef<"input">{
  label: string;
  name: string;
  checked: boolean;
  className: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Checkbox = ({ label, name, checked, className, onChange, ...props}: Props) => {
  return (
    <div className={className}>
      <label>
        <input type="checkbox" name={name} checked={checked} onChange={onChange} {...props}/>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
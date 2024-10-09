interface Props extends React.ComponentPropsWithoutRef<"input">{
  label: string;
  name: string;
  value: string;
  className: string;
  type?: React.HTMLInputTypeAttribute;
  children?: React.ReactNode;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Input = ({ label, name, value, className, type = 'text', children, onChange, ...props }: Props) => {
  return (
    <div className={className}>
      <label>
        {label}
        <input type={type} name={name} value={value} onChange={onChange} {...props} />
        {children}
      </label>
    </div>
  );
};

export default Input;
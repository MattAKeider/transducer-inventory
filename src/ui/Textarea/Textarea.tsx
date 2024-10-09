interface Props extends React.ComponentPropsWithoutRef<"textarea">{
  label: string;
  name: string;
  value: string;
  className: string;
  rows?: number;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
};

const Textarea = ({ label, name, value, className, rows = 4, onChange, ...props }: Props) => {
  return (
    <div className={className}>
      <label>
        {label}
        <textarea name={name} value={value} rows={rows} onChange={onChange} {...props} />
      </label>
    </div>
  );
};

export default Textarea;
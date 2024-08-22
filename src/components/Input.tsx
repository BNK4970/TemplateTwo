interface InputProps {
  id?: string;
  name: string;
  type: string;
  value?: any;
  onChange?: any;
  children: string;
  addClassName?: string,
}
export const Input: React.FC<InputProps> = ({
  id,
  name,
  type,
  value,
  onChange,
  children,
  addClassName,
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={children}
      className={`bg-background rounded-md outline outline-2 outline-[#151515] py-2 px-6 ${addClassName}`}
    />
  );
};
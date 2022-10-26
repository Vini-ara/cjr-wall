export function UrlInputs({Icon, name, labelText, placeHolder, onChange, value, ...props }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1 text-gray-300 flex items-center gap-1"
      >
        {Icon &&  <Icon />} {labelText}
      </label>
      <input 
        name={name}
        value={value}
        type="url"
        className="
          block
          w-full
          px-3
          py-1.5
          text-base
          font-light
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id={name}
        onChange={onChange}
        placeholder={placeHolder}
        {...props}
      />
    </div>
  );
}

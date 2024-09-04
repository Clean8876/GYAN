/* eslint-disable react/prop-types */


export default function Iconbtn({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
  }) {
    return (
      <button
      disabled={disabled}
      onClick={onclick}
      className={`flex items-center ${
        outline ? "border border-[#ff6525]-bg-transparent" : "bg-[#ff6525]"
      } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
      type={type}
    >
      {children ? (
        <>
          <span className={`${outline && "text-[#ff6525]"}`}>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
    )
  }
  
  
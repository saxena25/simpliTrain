export default function Divider({ className, children, ...props }) {
  return <div className="relative w-full">
    <div aria-hidden="true" className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gray-300" />
    </div>
    <div className="relative flex justify-center">
      <span className="bg-white px-2 text-base font-medium text-text">{children}</span>
    </div>
  </div>
}

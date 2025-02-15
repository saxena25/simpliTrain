export default function DividerWithLeftTitle({ className, children, ...props }) {
  return <div className="relative w-full py-4">
    <div aria-hidden="true" className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300" />
    </div>
    <div className="relative flex justify-between items-center">
        <span className="pr-2 bg-white"> <span className="bg-gray-6 px-3 mr-2 text-sm md:text-base rounded-full text-gray-1">{children}</span></span>
        <span className="w-3 h-3 rounded-full bg-gray-3"></span>
    </div>
  </div>
}

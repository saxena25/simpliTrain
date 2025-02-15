
const DiscriptionRow = ({label, value}) => {
  return <div className="flex flex-row border-b border-gray-200 px-6 py-3 last:border-0">
    <div className="w-1/3 flex items-center">
      <p className="text-gray-600 text-xs">{label}</p>
    </div>
    <p className="font-semibold text-sm">{value}</p>
  </div>
}

export default DiscriptionRow;
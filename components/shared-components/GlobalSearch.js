
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Container, SearchField } from "../ui-components";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
  RectangleGroupIcon,
} from "@heroicons/react/20/solid";
import PopularSearch from "../../layout/header/PopularSearch";
import SearchContent from "../../layout/header/SearchContent";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding where your traffic is coming from",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers with our engagement tool",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: SquaresPlusIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
  { name: "View all products", href: "#", icon: RectangleGroupIcon },
];

const people = [
  { id: 1, name: "Leslie Alexander", url: "#" },
  // More people...
];

export default function HeaderSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const filteredPeople =
    query === ""
      ? []
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Popover className="w-full">
      <PopoverButton className="w-full max-w-[300px]">
        <div className="relative w-full">
          <MagnifyingGlassIcon
            className="pointer-events-none absolute left-4 top-2.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <input
            id={"head-search"}
            type={"text"}
            placeholder="What would you like to learn?"
            // onClick={() => setOpen(true)}
            className={
              "bg-input-background border-0 text-sm rounded-4xl w-full max-w-72 h-10 pl-10 text-input-text placeholder:text-input-placeholder"
            }
          />
        </div>
      </PopoverButton>

      <PopoverPanel
        transition
        className="h-[70vh] rounded-br-4xl rounded-bl-4xl absolute -ml-4 sm:-ml-6 lg:-ml-8 sm:-mr-6 lg:-mr-8 -mr-4 inset-x-0 top-14 -z-10 bg-white shadow-lg  transition data-[closed]:-translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in">
        <div className="flex flex-row">
          <PopularSearch />
          <SearchContent />
        </div>
        
          
        
      </PopoverPanel>
    </Popover>
  );
}

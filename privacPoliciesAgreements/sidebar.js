
import React from 'react';
import clsx from 'clsx'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
  } from '@headlessui/react'
  import {
    Bars3Icon,
    BellIcon,
    CalendarIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
  } from '@heroicons/react/24/outline'
  import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'


const navigation = [
    { name: 'Privacy Policy', href: '/documents/privacy_policies', current: true },
    { name: 'Terms and Conditions', href: '/documents/terms_conditions', current: false },
    { name: 'Instructor Agreement', href: '/documents/instructor_agreement', current: false },
    { name: 'Venue Provider Agreement', href: '/documents/venue_provider_agreement', current: false },
    { name: 'Payment Processing Agreement', href: '/documents/payment_processing_agreement', current: false }
  ]

const PoliciesAgreementsSideBar = () => {
  
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto px-8 py-8">
        <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                    <ul role="list" className=" space-y-4">
                        {navigation.map((item) => (
                            <li key={item.name}>
                            <a
                                href={item.href}
                                className={clsx(
                                item.current
                                    ? 'bg-gray-6 text-text'
                                    : 'text-gray-500',
                                'group flex py-2 px-4 rounded-full text-xs font-semibold',
                                )}
                            >
                                {item.name}
                            </a>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </nav>
    </div>
  );
};

export default PoliciesAgreementsSideBar;

'use client'

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  DialogBackdrop,
} from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { DocumentPlusIcon, FolderIcon, FolderPlusIcon, HashtagIcon, TagIcon } from '@heroicons/react/24/outline'
import { useState } from 'react';
import { checkIsMobile } from '../../utils/helpers';

const people = [
    { id: 1, name: 'Leslie Alexander', url: '#' },
    // More people...
  ]



export default function HomeSearch() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(true)

  const filteredPeople =
  query === ''
    ? []
    : people.filter((person) => {
        return person.name.toLowerCase().includes(query.toLowerCase())
      })
  return (
    <div className='w-full max-w-md bg-white rounded-3xl'>
       <Combobox
            onChange={(person) => {
              if (person) {
                window.location = person.url
              }
            }}
          >
            <div className="grid grid-cols-1 rounded-2xl border border-dark overflow-hidden relative">
              <ComboboxInput
                // autoFocus
                className="col-start-1  row-start-1 h-12 w-full pl-4 pr-4 text-base text-gray-900 border-0 outline-none focus:outline-none placeholder:text-gray-400 sm:text-sm"
                placeholder="What would you like to learn?"
                onChange={(event) => setQuery(event.target.value)}
                onBlur={() => setQuery('')}
              />
              <MagnifyingGlassIcon
                className="pointer-events-none col-start-1 border row-start-1 ml-4 size-12 self-center text-gray-400 absolute right-0 bg-[#27292F] rounded-2xl px-3 py-3 h-fit"
                aria-hidden="true"
              />
            </div>
{/* 
            {filteredPeople.length > 0 && (
              <ComboboxOptions static className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800">
                {filteredPeople.map((person) => (
                  <ComboboxOption
                    key={person.id}
                    value={person}
                    className="cursor-default select-none px-4 py-2 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
                  >
                    {person.name}
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            )}

            {query !== '' && filteredPeople.length === 0 && (
              <p className="p-4 text-sm text-gray-500">No people found.</p>
            )} */}
          </Combobox>
    </div>
  )
}

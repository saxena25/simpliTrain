import React, { useEffect, useRef, useState } from "react";
import { Switch } from "@headlessui/react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; 

export async function announcementsLoader() {
  return {
    date: new Date().toISOString(),
  };
}

export default function Announcements() {
  const quillRef = useRef([]); // Store multiple refs for each announcement

  const [announcement, setAnnouncement] = useState([
    { no: 1, title: "On Enrollment", description: "" },
    { no: 2, title: "24hrs Before Course Begins", description: "" },
    { no: 3, title: "3hrs Before Course Begins", description: "" },
    { no: 4, title: "At the Start of Course", description: "" },
    { no: 5, title: "On Course Completion", description: "" },
    { no: 6, title: "24hrs After Course Completion", description: "" },
    { no: 7, title: "1 Week After Course Completion", description: "" },
    { no: 8, title: "1 Month After Course Completion", description: "" },
  ]);

  const [showEditor, setShowEditor] = useState(Array(announcement.length).fill(false));

  useEffect(() => {
    announcement.forEach((_, index) => {
      if (quillRef.current[index] && !quillRef.current[index].quill) {
        quillRef.current[index].quill = new Quill(quillRef.current[index], {
          theme: "snow",
          placeholder: "Compose an announcement...",
          modules: {
            toolbar: true,
          },
        });

        // Handle text change
        quillRef.current[index].quill.on("text-change", () => {
          const newContent = quillRef.current[index].quill.root.innerHTML;
          setAnnouncement((prev) => {
            const updated = [...prev];
            updated[index].description = newContent;
            return updated;
          });
        });
      }
    });
  }, [showEditor]); // Reinitialize if editor visibility changes

  const handleSave = (index) => {
    if (quillRef.current[index]?.quill) {
      const newContent = quillRef.current[index].quill.root.innerHTML;
      setAnnouncement((prev) => {
        const updated = [...prev];
        updated[index].description = newContent;
        return updated;
      });
    }
  }

  return (
    <div className="w-full h-full bg-[#EFEFEF] flex flex-col justify-start items-start grow overflow-y-auto px-8">
      <div className="w-full flex flex-row justify-between items-center py-6">
        <h1 className="font-medium text-2xl text-left text-secondary mb-4">
          Announcements
        </h1>
      </div>

      <div className="flex flex-col justify-center mb-5 w-full">
        {announcement.map((item, index) => (
          <div key={item.no} className="flex flex-row gap-2 w-full">
            <div className="bg-white px-8 py-4 rounded-[24px] mb-4 flex flex-col items-start w-full">
              <div className="w-full flex flex-row justify-between items-center py-2">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                  {item.no}. {item.title}
                </h3>
                <div className="flex flex-row justify-between items-center gap-x-2">
                <Switch
                  checked={showEditor[index]}
                  onChange={() =>
                    setShowEditor((prev) => {
                      const updated = [...prev];
                      updated[index] = !updated[index];
                      return updated;
                    })
                  }
                  className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 data-[checked]:bg-indigo-600"
                >
                  <span className="sr-only">Toggle</span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                  />
                </Switch>
                <svg className="ml-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.25 4.5H9.75C6 4.5 4.5 6 4.5 9.75V14.25C4.5 18 6 19.5 9.75 19.5H14.25C18 19.5 19.5 18 19.5 14.25V12.75" stroke="#242220" stroke-opacity="0.7" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M15.0284 5.26592L9.11844 11.1759C8.89344 11.4009 8.66844 11.8434 8.62344 12.1659L8.30094 14.4234C8.18094 15.2409 8.75844 15.8109 9.57594 15.6984L11.8334 15.3759C12.1484 15.3309 12.5909 15.1059 12.8234 14.8809L18.7334 8.97092C19.7534 7.95092 20.2334 6.76592 18.7334 5.26592C17.2334 3.76592 16.0484 4.24592 15.0284 5.26592Z" stroke="#242220" stroke-opacity="0.7" strokeWidth="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14.1836 6.10938C14.6861 7.90187 16.0886 9.30437 17.8886 9.81437" stroke="#242220" stroke-opacity="0.7" strokeWidth="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
              </div>

              {showEditor[index] && (
                <div className="w-full">
                  <div className="card">
                    <div ref={(el) => (quillRef.current[index] = el)} className="min-h-60 bg-white" />
                  </div>
              <div className="w-full flex justify-end items-center">
                    {/* Save button */}
                    <button
                      onClick={() => handleSave(index)}
                      className="mt-4 px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-black hover:text-white transition duration-200"
                    >
                      Save
                    </button>

                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

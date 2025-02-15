import React from 'react';

function SocialLinks({ profile }) {
  return (
    <div className="border border-gray-200 rounded-xl my-4 relative">
      <h3 className="text-xl mx-6 mt-6 mb-8 font-semibold">Social Media</h3>
      <div className="flex flex-row mx-6 mb-6 gap-6">
        {profile?.socialLinks.map((item, index) => {
          const domain = new URL(item.link).hostname; // Extract domain from URL
          const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=40`; // Get favicon

          return (
            <a key={index} href={item.link} target="_blank" rel="noopener noreferrer">
              <img src={faviconUrl} alt={`${domain} logo`} className="w-8 h-8" />
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default SocialLinks;

import React from "react";
import { EditPencilTwo } from "../../../components/icons";
import linkedin from "../../../assets/svgs/linkedin.svg";
import twitter from "../../../assets/svgs/twitter.svg";
import colorGoogle from "../../../assets/svgs/colorGoogle.svg";
import pinkball from "../../../assets/svgs/pinkball.svg";
import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Drawer, FloatingTextField } from "../../../components/ui-components";
import { Button } from "../../../components/ui-components";
import { useDispatch } from "react-redux";
import {
  sendMultipleLinks,
  sendSocialLinks,
} from "../../../redux/profile/actionCreator";

function SocialMedia({ profile }) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [allSocialData, setSocialData] = useState(profile?.socialLinks || []);
  const dispatch = useDispatch();
  const userId = profile?.id || null;
  // console.log("userId: ", userId);
  // console.log("from SocialMedia: ",profile?.socialLinks);

  const [socialLinks, setSocialLinks] = useState(
    profile?.socialLinks?.length > 0
      ? profile?.socialLinks
      : [
          {
            platform: "linkedin",
            link: "",
          },
          {
            platform: "instagram",
            link: "",
          },
          {
            platform: "facebook",
            link: "",
          },
        ]
  );

  const platformLogos = {
    linkedin: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
    instagram: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
    facebook: "https://cdn-icons-png.flaticon.com/512/124/124010.png",
    twitter: "https://cdn-icons-png.flaticon.com/512/733/733579.png",
    youtube: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
    reddit:
      "https://img.icons8.com/external-justicon-flat-justicon/64/external-reddit-social-media-justicon-flat-justicon.png",
  };

  const getDomain = (url, subdomain) => {
    subdomain = subdomain || false;

    url = url.replace(/(https?:\/\/)?(www.)?/i, "");

    if (!subdomain) {
      url = url.split(".");

      // url = url.slice(url.length - 2).join('.');
      url = url[url.length - 2];
    }

    if (url.indexOf("/") !== -1) {
      return url.split("/")[0];
    }

    return url;
  };

  const getDomainName = (url) => {
    try {
      const { hostname } = new URL(url);
      const domainParts = hostname.split(".");
      return domainParts.length > 2 ? domainParts[1] : hostname.split(".")[0];
    } catch (err) {
      console.error("Invalid URL", err);
      return "";
    }
  };

  const addnewLink = () => {
    const lastLink = socialLinks[socialLinks.length - 1];
    if (lastLink.platform == "YOUR LINK") {
      if (lastLink.link) {
        setSocialLinks([
          ...socialLinks,
          {
            platform: "YOUR LINK",
            link: "",
          },
        ]);
      }
    } else {
      setSocialLinks([
        ...socialLinks,
        {
          platform: "YOUR LINK",
          link: "",
        },
      ]);
    }
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      // console.log(URL);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleChange = (e, index) => {
    let links = [...socialLinks];
    links[index].link = e.target.value;
    setSocialLinks([...links]);
  };

  const handleBlur = (e, index) => {
    // const newLink = {
    //   platform: e.target.name,
    //   link: e.target.value
    // };
    // console.log('e.target.value', e.target.value);
    if (e.target.value) {
      const newErrors = {};
      if (isValidUrl(e.target.value)) {
        let links = [...socialLinks];
        links[index].link = e.target.value;
        if (!links[index].platform || links[index].platform == "YOUR LINK") {
          links[index].platform = getDomain(e.target.value);
        }
        setSocialLinks([...links]);
      } else {
        newErrors[e.target.name] = "Invalid URL";
      }
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filter out the invalid links (empty or non-URL links)
    const validLinks = socialLinks.filter((link) => isValidUrl(link.link));
    console.log("Array length", profile?.socialLinks.length);

    if (profile?.socialLinks.length <= 0) {
      // If there's only one valid link, send it via the single link API
      const formData = validLinks.map((link) => {
        const platformName = getDomainName(link.link);
        return {
          platform: platformName,
          link: link.link,
        };
      });

      try {
        console.log("mutpliple links: ", formData);

        let response = await dispatch(sendMultipleLinks(formData));
        if (response && response.type === "PROFILE_SUCCESS") {
          console.log("Multiple links added successfully");
        } else {
          console.error("Error Multiple links");
        }
      } catch (error) {
        console.error("Error adding Multiple links: ", error);
      }
    } else if (validLinks.length > 1) {
      //Sending single links
      const lastLink = socialLinks[socialLinks.length - 1];
      const platformName = getDomainName(lastLink.link);
      const formData = {
        id: userId,
        platform: platformName,
        link: lastLink.link,
      };

      // console.log("Single link: ", formData)

      try {
        let response = await dispatch(sendSocialLinks(formData));
        if (response && response.type === "PROFILE_SUCCESS") {
          console.log("Single link added successfully");
        } else {
          console.error("Error sending Single link");
        }
      } catch (error) {
        console.error("Error adding Single link:", error);
      }
    } else {
      console.error("No valid links to add");
    }
  };

  return (
    <>
      <div className="border border-gray-200 rounded-xl my-4 relative">
        <h3 className="text-xl mx-6 mt-6 mb-8 font-semibold">Social Media</h3>
        <button
          className="border bg-white border-gray-200 px-2 py-2 rounded-full absolute right-4 top-6 w-22 flex gap-2 justify-center items-center transform transition duration-300 hover:scale-110"
          onClick={() => setOpen(true)}>
          <p className="text-base ml-2">Edit</p>
          <EditPencilTwo color="black" />
        </button>
        <div className="flex flex-row mx-6 mb-6 gap-6">
          {allSocialData.length <= 0
            ? null
            : allSocialData.map((item, index) => {
                const platform = getDomain(item.link, false);
                const logo = platformLogos[platform.toLowerCase()];
                return (
                  <a
                    href={item.link}
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer">
                    <img
                      src={logo || "https://via.placeholder.com/50"}
                      alt={platform}
                      className="w-10 h-10"
                    />
                  </a>
                );
              })}
        </div>
      </div>

      <Drawer open={open} onClose={setOpen} title="Edit Social Media Link">
        <form
          onSubmit={handleSubmit}
          className="w-96 flex flex-col justify-between m-auto mt-4 h-full">
          <div className="flex flex-col justify-center">
            {socialLinks.map((socialLink, index) => (
              <div
                className="flex justify-between items-start gap-3"
                key={index}>
                <div className="w-full">
                  <FloatingTextField
                    key={index}
                    label={socialLink.platform.toLocaleUpperCase()}
                    type="text"
                    value={socialLink.link}
                    onChange={(e) => handleChange(e, index)}
                    onBlur={(e) => handleBlur(e, index)}
                    name={socialLink.platform}
                    id={socialLink.platform}
                    error={errors[socialLink.platform]}
                    // placeholder="demo@gmail.com"
                  />
                </div>
                <div className="w-11 mt-4">
                  {index === socialLinks.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => addnewLink()}
                      className="bg-transparent text-gray-2 p-1 rounded-full">
                      <PlusCircleIcon aria-hidden="true" className="size-7" />
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          <Button
            type="submit"
            color="primary"
            variant="solid"
            className="w-52 m-auto my-6">
            SAVE
          </Button>
        </form>
      </Drawer>
    </>
  );
}

export default SocialMedia;

import React, { useState } from "react";
import rightArrow from "../../../assets/svgs/rightArrow.svg";
import { Button, Drawer } from "../../../components/ui-components";
import DeletePassword from "./DeletePassword";
import { checkIsMobile } from "../../../utils/helpers";
import MobDrawer from "../../../components/ui-components/MobDrawer";

function DeleteAC() {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const isMobile = checkIsMobile();

  return (
    <>
      <div
        className="w-full flex flex-row justify-between items-start transition-transform duration-300 ease-in-out hover:scale-105 hover:cursor-pointer mt-4 md:mt-8 border-b pb-4 md:border-none md:pb-0"
        onClick={() => setOpen(true)}>
        <div className="w-full flex flex-row justify-between gap-2">
          <p className="text-base text-primary">Delete Account</p>
          <img src={rightArrow} alt="" />
        </div>
      </div>

      {isMobile ? (
        <MobDrawer open={open} onClose={setOpen}>
          {success ? (
            <DeletePassword setSuccess={setSuccess} />
          ) : (
            <div className="md:max-w-[70%] h-full m-auto flex flex-col gap-4 justify-center items-center text-center">
              <h1 className="text-2xl font-medium text-secondary">
                Are you sure <br /> you wanna delete your account?
              </h1>
              <p className="text-xs md:text-base text-primary px-8">
                If you delete your account, you can reactivate it within 30
                days. After that, your account will be permanently deleted.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="submit"
                  color="primary"
                  variant="solid"
                  className="px-16 rounded-lg"
                  onClick={() => setOpen(false)}>
                  No
                </Button>
                <button
                  type="submit"
                  color="primary"
                  variant="outline"
                  className="border border-gray-300 px-16 rounded-lg"
                  onClick={() => setSuccess(true)}>
                  Yes
                </button>
              </div>
            </div>
          )}
        </MobDrawer>
      ) : (
        <Drawer open={open} onClose={setOpen}>
          {success ? (
            <DeletePassword setSuccess={setSuccess} />
          ) : (
            <div className="max-w-[70%] h-full m-auto flex flex-col gap-4 justify-center items-center text-center">
              <h1 className="text-2xl font-medium text-secondary">
                Are you sure <br /> you wanna delete your account?
              </h1>
              <p className="text-base text-primary px-8">
                If you delete your account, you can reactivate it within 30
                days. After that, your account will be permanently deleted.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="submit"
                  color="primary"
                  variant="solid"
                  className="px-16 rounded-lg"
                  onClick={() => setOpen(false)}>
                  No
                </Button>
                <button
                  type="submit"
                  color="primary"
                  variant="outline"
                  className="border border-gray-300 px-16 rounded-lg"
                  onClick={() => setSuccess(true)}>
                  Yes
                </button>
              </div>
            </div>
          )}
        </Drawer>
      )}
    </>
  );
}

export default DeleteAC;

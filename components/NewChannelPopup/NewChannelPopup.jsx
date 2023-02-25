import { AiFillCheckCircle } from "react-icons/ai";
import { useState } from "react";

export default function NewChannelPopup(
  value,
  handleClick = () => {},
  handleChange = (e) => {}
) {
  return (
    <>
      <div className="flex flex-col bg-[#3c3f45] text-white max-w-[350px] max-h-[250px] rounded-lg absolute top-0 left-0 bottom-0 right-0 m-auto">
        <div className="flex p-2 justify-center mt-4">
          <p className="text-lg font-bold">Create a new channel</p>
        </div>
        <div className="flex justify-center mt-10">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex gap-4 items-center "
          >
            <div className="flex">
              <input
                type="text"
                defaultValue={value}
                onChange={(e) => handleChange(e)}
                placeholder="Enter # channel name"
                className="bg-[#383a40] px-4 py-2 text-[#f5f5f5]"
              />
            </div>

            <button
              className="flex bg-[#5965F2] text-white p-1 rounded-full"
              onClick={handleClick}
            >
              <AiFillCheckCircle className="text-2xl" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

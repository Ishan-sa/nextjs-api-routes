import React from "react";

export default function UpdatePopup({
  handleEdit = () => {},
  handleDelete = () => {},
}) {
  return (
    <>
      <div className="flex flex-col bg-[#313338] text-white max-w-[150px] rounded-md">
        <div className="flex p-2">
          <p
            className="px-2 py-1 w-full hover:bg-[#45484f] rounded-md"
            onClick={handleEdit}
          >
            Edit
          </p>
        </div>
        <hr className="border-[#45484f] border-opacity-50" />
        <div className="flex p-2">
          <p
            className="px-2 py-1 w-full hover:bg-[#45484f] rounded-md text-red-400"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      </div>
    </>
  );
}

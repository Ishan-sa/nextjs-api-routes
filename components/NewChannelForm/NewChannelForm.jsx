import React from "react";

export default function NewChannelForm({
  handleValue,
  handleChange = (e) => {},
  handleClick = () => {},
}) {
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Name"
          value={handleValue}
          onChange={(e) => handleChange(e)}
          className="border-2 border-gray-300 rounded-lg px-2 py-1"
        />
        <button
          className="bg-[#f66] text-white px-2 py-1 rounded-lg my-4"
          onClick={handleClick}
        >
          Cancel
        </button>
      </form>
    </>
  );
}

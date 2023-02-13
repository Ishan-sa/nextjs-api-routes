import React from "react";

export default function EditForm({
  handleSubmit = (e) => {},
  defaultValue,
  handleChange = (e) => {},
  handleClick = () => {},
}) {
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Channel Name"
          className="border-2 border-gray-300 rounded-lg px-2 py-1"
          defaultValue={defaultValue}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <div>
          <button
            type="submit"
            className="bg-green-400 text-white px-2 py-1 rounded-lg mt-4 mr-2"
          >
            Save
          </button>
          <button
            onClick={() => {
              handleClick();
            }}
            className="bg-red-400 text-white px-2 py-1 rounded-lg mt-4"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

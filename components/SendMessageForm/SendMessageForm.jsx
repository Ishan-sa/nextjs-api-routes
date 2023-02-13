import React from "react";

export default function SendMessageForm({
  handleSubmit = (e) => {},
  handleChange = (e) => {},
  handleValue,
}) {
  return (
    <>
      <form
        action=""
        className="flex w-full bg-[#404349] fixed bottom-0 shadow-lg"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="border-2 border-gray-300 rounded-lg px-2 py-1 my-4 mx-6"
          placeholder="Send a Message"
          value={handleValue}
          onChange={handleChange}
        />
        <button
          className="bg-[#7289da] text-white px-2 py-1 rounded-lg my-4 mr-2"
          type="submit"
        >
          Send
        </button>
      </form>
    </>
  );
}

import { AiFillCheckSquare } from "react-icons/ai";

export default function MessageEditForm({
  handleChange = (e) => {},
  handleClick = () => {},
  handleValue,
  messageCreated,
  messageUserName,
}) {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex gap-2 items-center">
          <h3 className="text-md font-bold text-blue-900">{messageUserName}</h3>
          <p className="text-gray-500 text-sm">{messageCreated}</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={handleValue}
            onChange={handleChange}
            className="border-2 border-gray-300 rounded-lg px-2 py-1"
          />
          <AiFillCheckSquare
            onClick={handleClick}
            className="cursor-pointer w-7 h-7 text-green-500"
          />
        </div>
      </div>
    </>
  );
}

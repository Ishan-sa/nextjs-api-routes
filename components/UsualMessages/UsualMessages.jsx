import { AiFillDelete, AiFillEdit, AiFillCheckSquare } from "react-icons/ai";

export default function UsualMessages({
  messageUserName,
  messageText,
  messageCreated,
  handleEditClick = () => {},
  handleDeleteClick = () => {},
}) {
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <h3 className="text-md font-bold text-blue-900">
              {messageUserName}
            </h3>
            <p className="text-gray-500 text-sm">{messageCreated}</p>
          </div>
          <div className="flex">
            <p>{messageText}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <AiFillEdit onClick={handleEditClick} />
          <AiFillDelete onClick={handleDeleteClick} />
        </div>
      </div>
    </>
  );
}

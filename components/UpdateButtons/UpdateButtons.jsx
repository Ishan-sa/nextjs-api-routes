import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export default function UpdateButtons({
  handleEditClick = () => {},
  handleDeleteClick = () => {},
}) {
  return (
    <>
      <div className="flex items-center gap-2">
        <AiFillEdit
          onClick={handleEditClick}
          className="text-blue-400 text-2xl cursor-pointer"
        />
        <AiFillDelete
          onClick={handleDeleteClick}
          className="text-red-400 text-2xl cursor-pointer"
        />
      </div>
    </>
  );
}

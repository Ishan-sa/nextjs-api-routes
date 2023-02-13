import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { faker } from "@faker-js/faker";

export default function UsualMessages({
  messageUserName,
  messageText,
  messageCreated,
  handleEditClick = () => {},
  handleDeleteClick = () => {},
}) {
  const images = {
    image: faker.image.cats(),
  };
  return (
    <>
      <div className="flex items-center gap-3">
        <img src={images.image} className="w-7 h-7 rounded-full" />
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <h3 className="text-md font-bold text-[#afbff9]">
              {messageUserName}
            </h3>
            <p className="text-gray-500 text-sm">{messageCreated}</p>
          </div>
          <div className="flex text-white">
            <p>{messageText}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <AiFillEdit
            onClick={handleEditClick}
            className="cursor-pointer w-5 h-5 text-[#c7c7c7]"
          />
          <AiFillDelete
            onClick={handleDeleteClick}
            className="cursor-pointer w-5 h-5 text-[#ff9898]"
          />
        </div>
      </div>
    </>
  );
}

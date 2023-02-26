import { getAllChannels } from "../../database";
import { useState } from "react";
import axios from "axios";
import EditForm from "components/EditForm/EditForm";
import UpdateButtons from "components/UpdateButtons/UpdateButtons";
import Link from "next/link";
import NewChannelForm from "components/NewChannelForm/NewChannelForm";
import { AiFillDelete, AiFillCheckCircle, AiOutlineSend } from "react-icons/ai";

function wait(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}

export default function Channels({ channels: initialChannels }) {
  const [editMode, setEditMode] = useState(false);
  const [newChannelPopup, setNewChannelPopup] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [channels, setChannels] = useState(initialChannels);

  const createNewChannel = async () => {
    try {
      setNewChannelPopup(!newChannelPopup);
      const { data } = await axios.post("/api/channels", {
        name: newChannelName,
      });
      setChannels([...channels, data]);
      setNewChannelName("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="flex w-full">
        <div className="flex flex-col bg-[#2B2D31] min-w-[20%] h-screen overflow-scroll px-4 hide-scroll">
          <button
            className="bg-[#5965F2] px-4 py-2 m-2 rounded-lg text-white hover:bg-[#4752C4]"
            onClick={() => {
              createNewChannel();
              //   setNewChannelPopup(!newChannelPopup);
            }}
          >
            New Channel +
          </button>
          {newChannelPopup && (
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
                      value={newChannelName}
                      onChange={(e) => setNewChannelName(e.target.value)}
                      placeholder="Enter # channel name"
                      className="bg-[#383a40] px-4 py-2 text-[#f5f5f5]"
                    />
                  </div>

                  <button
                    className="flex bg-[#5965F2] text-white p-1 rounded-full"
                    onClick={createNewChannel}
                  >
                    <AiFillCheckCircle className="text-2xl" />
                  </button>
                </form>
              </div>
              <div className="flex justify-center mt-8">
                <button
                  className="flex bg-[#5965F2] text-white px-4 py-2 rounded-lg hover:bg-[#4752C4]"
                  onClick={() => setNewChannelPopup(!newChannelPopup)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-2 mt-2">
            {channels.map((channel) => (
              <div key={channel.id}>
                <Link href={`/channels/${channel.id}`}>
                  <h1 className="text-md text-[#989AA2] py-1 px-2 rounded-md flex items-center gap-2 justify-between hover:bg-[#3f4248]">
                    {`${
                      channel.name.length > 20
                        ? "# " + channel.name.substr(0, 25) + "..."
                        : "# " + channel.name
                    }`}
                  </h1>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#313338] w-full h-screen overflow-scroll hide-scroll">
          <div className="flex justify-start bg-[#313338] py-2 px-6 shadow-xl fixed w-full top-0">
            <h1 className="text-white font-bold text-lg">
              Select a channel on the left to view messages in that channel.
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const channels = await getAllChannels();

  return {
    props: {
      channels: JSON.parse(JSON.stringify(channels)),
    },
  };
}

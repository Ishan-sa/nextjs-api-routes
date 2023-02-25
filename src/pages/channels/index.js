import { getAllChannels } from "../../database";
import { useState } from "react";
import axios from "axios";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import EditForm from "components/EditForm/EditForm";
import UpdateButtons from "components/UpdateButtons/UpdateButtons";
import Link from "next/link";
import NewChannelForm from "components/NewChannelForm/NewChannelForm";

function wait(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}

export default function Channels({ channels }) {
  const [editMode, setEditMode] = useState(false);
  //   const [updatedData, setUpdatedData] = useState({});
  //   const [selectedChannelId, setSelectedChannelId] = useState(null);
  //   const [currentChannelName, setCurrentChannelName] = useState("");
  //   const [newChannelForm, setNewChannelForm] = useState(false);
  //   const [newChannelName, setNewChannelName] = useState("");

  const handleChannelChangeQuery = async (e) => {};

  return (
    <div className="flex flex-col">
      <NewChannelForm />
      <h1 className="text-xl font-bold">Channels</h1>
      {channels.map((channel) => (
        //   <li key={channel.id}>{channel.name}</li>
        <div
          key={channel.id}
          className="flex flex-row px-2 py-4 rounded-lg gap-8"
        >
          <Link href={`/channels/${channel.id}`}>
            <h1 className="text-md text-[#272727]"># {channel.name}</h1>
          </Link>
        </div>
      ))}
    </div>
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

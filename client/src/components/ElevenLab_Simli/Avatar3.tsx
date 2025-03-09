import SimliElevenlabs from "./SimliElevenlabs";
import React, { useState } from "react";
import DottedFace from "./DottedFace";
import { AGENT_ID } from "../../constants/keys.js"

interface avatarSettings {
  elevenlabs_agentid: string;
  simli_faceid: string;
}

// Customize your avatar here
const avatar: avatarSettings = {
  elevenlabs_agentid: AGENT_ID || "",
  simli_faceid: "5514e24d-6086-46a3-ace4-6a7264e5cb7c",
};

const Avatar3: React.FC = () => {
  const [showDottedFace, setShowDottedFace] = useState(true);

  const onStart = () => {
    console.log("Setting setshowDottedface to false...");
    setShowDottedFace(false);
  };

  const onClose = () => {
    console.log("Setting setshowDottedface to true...");
    setShowDottedFace(true);
  };

  return (
    <div className="h-full rounded-[3rem] flex flex-col items-center font-abc-repro font-normal text-sm text-white p-8">      
      <div className="flex flex-col items-center gap-6 bg-effect15White p-6 pb-[40px] rounded-xl w-full">
        <div>
          {showDottedFace && <DottedFace />}
          <SimliElevenlabs
            agentId={avatar.elevenlabs_agentid}
            simli_faceid={avatar.simli_faceid}
            onStart={onStart}
            onClose={onClose}
            showDottedFace={showDottedFace}
          />
        </div>
      </div>
    </div>
  );
};

export default Avatar3;

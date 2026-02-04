import React from "react";

const MissionVision = ({ missionImage, vissionImage, data }) => {
  return (
    <section className="w-full">
      {/* ------ Mission Row ------ */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Text Left */}
        <div className="flex flex-col justify-center p-10 bg-gradient-to-r from-[#E0F7F4] to-[#bfddd9] text-gray-800">
          <h2 className="text-4xl font-bold mb-4">
            {data.our_mission_title}{" "}
            <span className="text-[#3780B2]">
              {" "}
              {data.our_mission_color_title}
            </span>
          </h2>
          <p className="text-lg leading-relaxed">
            {data.our_mission_description}
          </p>
        </div>
        {/* Image Right */}
        <div>
          <img
            src={missionImage}
            alt="Our Mission"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ------ Vision Row ------ */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Image Left */}
        <div>
          <img
            src={vissionImage}
            alt="Our Vision"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Text Right */}
        <div className="flex flex-col justify-center p-10 bg-gray-100 text-gray-800">
          <h2 className="text-4xl font-bold mb-4">
            {data.our_vission_title}{" "}
            <span className="text-[#3780B2]">
              {data.our_vission_color_title}
            </span>
          </h2>
          <p className="text-lg leading-relaxed">
            {data.our_vission_description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;

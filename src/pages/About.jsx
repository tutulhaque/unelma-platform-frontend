import React, { useEffect, useState } from "react";
import AboutBanner from "../components/about/AboutBanner";
import MissionVision from "../components/about/MissionVision";
import AboutCompany from "../components/about/AboutCompany";
import TeamSection from "../components/about/TeamSection";

const API_URL = "https://unelma-platform-backend.onrender.com";

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch(`${API_URL}/api/about?populate=*`);
        const json = await res.json();
        setAboutData(json.data);
      } catch (err) {
        console.error("Failed to fetch About data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!aboutData) return <p className="text-center py-10">No data found.</p>;

  const banner = aboutData.about_bg_image?.url;
  const aboutImage = aboutData.who_we_are_image?.url;
  const missionImage = aboutData.our_mission_image?.url;
  const vissionImage = aboutData.our_vission_image?.url;
  // const missionVision = aboutData.mission_vision || [];
  // const teamMembers = aboutData.team_members || [];

  return (
    <div>
      <AboutBanner
        title={aboutData?.about_title}
        backgroundImage={`${API_URL}${banner}`}
      />
      <AboutCompany
        image={`${API_URL}${aboutImage}`}
        heading={aboutData?.who_we_are_title}
        who_we_are_color_title={aboutData?.who_we_are_color_title}
        text={aboutData?.who_we_are_description}
      />
      <MissionVision
        missionImage={`${API_URL}${missionImage}`}
        vissionImage={`${API_URL}${vissionImage}`}
        data={aboutData}
      />
      <TeamSection
        title={aboutData.team_title}
        team_color_title={aboutData.team_color_title}
        teams={aboutData.Team}
      />
    </div>
  );
};

export default About;

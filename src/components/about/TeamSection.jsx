const TeamSection = ({ title, team_color_title, teams }) => {
  const API_URL = "https://unelma-platform-backend.onrender.com";
  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          {title} <span className="text-[#3780B2]">{team_color_title}</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {teams.map((team) => (
            <div key={team.id} className="text-center">
              <img
                src={`${API_URL}${team?.image?.url}`}
                alt={API_URL.team?.name}
                className="w-full h-[300px] object-cover rounded-2xl mb-4 shadow-lg"
              />
              <h3 className="text-xl font-semibold">{team.name}</h3>
              <p className="text-teal-600 mb-2">{team.role}</p>
              <p className="text-gray-600 text-sm">{team.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

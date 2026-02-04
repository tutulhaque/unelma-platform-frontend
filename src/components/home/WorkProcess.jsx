import * as Icons from "lucide-react";

const WorkProcess = ({ title, workProcesses, workprocess_color_title }) => {
  if (!Array.isArray(workProcesses)) return null; // prevent errors if data not ready

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          {title}{" "}
          <span className="text-[#3780B2]">{workprocess_color_title}</span>
        </h2>

        {/* Desktop - Horizontal Process */}
        <div className="hidden md:flex justify-between relative">
          {/* connecting line */}
          <div className="absolute top-7 left-0 w-full h-[2px] bg-gradient-to-r from-[#B2EAEA] via-[#008081]/20 to-[#B2EAEA] z-0"></div>

          {workProcesses.map((step) => {
            const Icon = Icons[step.icon];
            return (
              <div
                key={step.id}
                className="relative z-10 flex flex-col items-center text-center w-1/5"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-md ring-2 ring-[#B2EAEA]">
                  {Icon ? <Icon className="w-6 h-6 text-[#008081]" /> : null}
                </div>
                <h3 className="mt-4 font-semibold text-gray-900 text-lg">
                  {step.title}
                </h3>
                <p className="mt-2 text-gray-500 text-sm max-w-[200px]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile - Vertical Timeline */}
        <div className="md:hidden relative mt-10">
          {/* vertical line */}
          <div className="absolute left-7 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#B2EAEA] via-[#008081]/20 to-[#B2EAEA] z-0"></div>

          <div className="space-y-10">
            {workProcesses.map((step) => {
              const Icon = Icons[step.icon];
              return (
                <div key={step.id} className="relative pl-16 z-10 text-left">
                  <div className="absolute left-3 top-0 w-10 h-10 bg-white rounded-full shadow-md ring-2 ring-[#B2EAEA] flex items-center justify-center">
                    {Icon ? <Icon className="w-6 h-6 text-[#008081]" /> : null}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-gray-500 text-sm">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;

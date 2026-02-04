import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

const Portfolio = ({
  title,
  portfolio_color_title,
  description,
  portfolioItems,
}) => {
  const navPrevRef = useRef(null);
  const navNextRef = useRef(null);

  return (
    <section className="py-24 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {title}{" "}
              <span className="text-[#3780B2]">{portfolio_color_title}</span>
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl">{description}</p>
          </div>

          {/* Nav buttons */}
          <div className="flex gap-3">
            <button
              ref={navPrevRef}
              className="p-2 rounded-full bg-white shadow hover:bg-gray-50"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              ref={navNextRef}
              className="p-2 rounded-full bg-white shadow hover:bg-gray-50"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: navPrevRef.current,
              nextEl: navNextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = navPrevRef.current;
              swiper.params.navigation.nextEl = navNextRef.current;
            }}
            loop={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            spaceBetween={24}
            speed={600}
            className="py-8"
          >
            {portfolioItems.map((portfolio) => (
              <SwiperSlide
                key={portfolio.id}
                style={{ width: portfolio.id % 2 === 0 ? 446 : 360 }}
                className="!flex !justify-center"
              >
                <div className="portfolio-card relative rounded-2xl overflow-hidden shadow-lg w-full">
                  <img
                    src={`https://unelma-platform-backend.onrender.com${portfolio.image.url}`}
                    alt={portfolio.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ height: 400 }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  <div className="absolute left-6 bottom-6 z-10 text-left">
                    <h3 className="text-white text-xl font-semibold">
                      <a href={portfolio.button_link}>{portfolio.title}</a>
                    </h3>
                    <p className="text-gray-200 text-sm max-w-xs mt-2">
                      {portfolio.description}
                    </p>
                    <button className="mt-4 bg-[#3780B2] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#006666] transition">
                      <a
                        href={portfolio.button_link}
                        className="inline-flex items-center gap-2"
                      >
                        {portfolio.button_text}
                        <ExternalLink size={14} />
                      </a>
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

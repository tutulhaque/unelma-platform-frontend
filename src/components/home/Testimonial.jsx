import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules"; // correct import
import "swiper/css";
import "swiper/css/pagination";

export default function Testimonial({
  title,
  testimonials,
  testimonial_color_title,
}) {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          {title}{" "}
          <span className="text-[#3780B2]">{testimonial_color_title}</span>
        </h2>

        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{ 768: { slidesPerView: 2 } }}
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 transition-transform hover:-translate-y-2">
                <img
                  src={`https://unelma-platform-backend.onrender.com${t.image.url}`}
                  alt={t.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#008081]"
                />
                <div className="text-left md:flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t.name}
                  </h3>
                  <p className="text-sm text-gray-500">{t.from}</p>
                  <p className="text-gray-700 leading-relaxed italic mt-2 md:mt-4">
                    “{t.message}”
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

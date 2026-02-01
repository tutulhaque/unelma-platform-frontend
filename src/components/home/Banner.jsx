import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { gsap } from "gsap";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const Banner = () => {
  const swiperRef = useRef(null);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = "https://unelma-platform-backend.onrender.com";

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch(`${API_URL}/api/sliders?populate=*`);
        const data = await res.json();

        if (data.data && data.data.length) {
          const formattedSlides = data.data.map((item) => {
            return {
              image: item.image?.url ? `${API_URL}${item.image.url}` : "",
              icon: item.icon?.url ? `${API_URL}${item.icon.url}` : "",
              title: item.title || "",
              desc: item.description || "",
              color: item.color || "#3780B2",
              button_text: item.button_text || "Get Started",
              button_link: item.button_link || "#",
            };
          });

          setSlides(formattedSlides);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching slider data:", err);
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  // GSAP animation
  useEffect(() => {
    if (!slides.length) return;

    const swiperEl = swiperRef.current.swiper;

    const animateSlide = () => {
      gsap.fromTo(
        ".swiper-slide-active .slide-content",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.25, ease: "power3.out" },
      );
    };

    animateSlide();

    swiperEl.on("slideChangeTransitionStart", () => {
      gsap.set(".slide-content", { opacity: 0, y: 40 });
    });

    swiperEl.on("slideChangeTransitionEnd", animateSlide);
  }, [slides]);

  if (loading) return <p>Loading banner...</p>;
  if (!slides.length) return <p>No slides found.</p>;

  return (
    <section className="relative w-full h-[70vh] text-white overflow-hidden">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        loop
        className="h-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div
              className="h-full w-full bg-cover bg-center flex flex-col justify-center items-center text-center relative"
              style={{
                backgroundImage: `linear-gradient(to bottom right, ${slide.color}cc, rgba(0,0,0,0.65)), url(${slide.image})`,
              }}
            >
              <div className="slide-content space-y-4">
                {slide.icon && (
                  <div className="flex justify-center mb-3">
                    <img
                      src={slide.icon}
                      alt="slide icon"
                      className="w-52 h-24 object-contain drop-shadow-lg"
                    />
                  </div>
                )}

                <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto px-4 opacity-90">
                  {slide.desc}
                </p>
                <a
                  href={slide.button_link}
                  className="px-8 py-3 font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 inline-block"
                  style={{
                    backgroundColor: slide.color,
                    boxShadow: `0 4px 15px ${slide.color}55`,
                  }}
                >
                  {slide.button_text}
                </a>
              </div>

              <div
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-[120px] blur-3xl opacity-60"
                style={{
                  background: `radial-gradient(circle at center, ${slide.color}, transparent)`,
                }}
              ></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;

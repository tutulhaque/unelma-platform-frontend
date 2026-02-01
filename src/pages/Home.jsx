import React, { useEffect, useState } from "react";
import Banner from "../components/home/Banner";
import SlidingTexts from "../components/home/SlidingTexts";
import Services from "../components/home/Services";
import Portfolio from "../components/home/Portfolio";
import Testimonial from "../components/home/Testimonial";
import WorkProcess from "../components/home/WorkProcess";
import Blog from "../components/home/Blog";
import ContactSection from "../components/home/ContactSection";

const Home = () => {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await fetch(
          "https://unelma-platform-backend.onrender.com/api/home?populate=*",
        );
        const data = await res.json();

        // Check if data has 'attributes' or use it directly
        if (data.data) {
          setHomeData(data.data.attributes); // for standard Strapi REST API
        } else {
          setHomeData(data); // your current setup
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching home data:", err);
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!homeData) return <p>No data found.</p>;
  return (
    <div>
      <Banner></Banner>
      <SlidingTexts slidingTexts={homeData.SlidingText} />
      <Services
        services_title={homeData.services_title}
        service_color_title={homeData.service_color_title}
        services_description={homeData.services_description}
        services_image={homeData.services_image}
        HomeServices={homeData.HomeServices}
      />

      <Portfolio
        title={homeData.portfolio_title}
        portfolio_color_title={homeData.portfolio_color_title}
        description={homeData.portfolio_description}
        portfolioItems={homeData.HomePortfolio}
      />
      <Testimonial
        title={homeData.testimonialTitle}
        testimonial_color_title={homeData.testimonial_color_title}
        testimonials={homeData.HomeTestimonial}
      />
      <WorkProcess
        title={homeData.workprocessTitle}
        workprocess_color_title={homeData.workprocess_color_title}
        workProcesses={homeData.HomeWorkProcess}
      />
      <Blog
        title={homeData.blogTitle}
        blog_color_title={homeData.blog_color_title}
        blogs={homeData.homeBlog}
      />
      <ContactSection
        title={homeData.contact_title}
        contacts_color_title={homeData.contacts_color_title}
        description={homeData.contact_description}
      />
    </div>
  );
};

export default Home;

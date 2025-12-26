import CTAHome from "../components/CTA/CTAHome";
import HomeHeroSection from "../components/HeroSection/HomeHeroSection";
import HowItWorks from "../components/HowItWork";
import Kit from "./Kit";
import Owner from "../components/Owner";
import Gallery from "../components/Gallery";

const Home = () => {
  return (
    <div>
      <HomeHeroSection />
      <HowItWorks />
      <Owner />
      <Gallery />
      <Kit />
      <CTAHome />
    </div>
  );
};

export default Home;

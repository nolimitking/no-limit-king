import CTAHome from "../components/CTA/CTAHome";
import HomeHeroSection from "../components/HeroSection/HomeHeroSection";
import HowItWorks from "../components/HowItWork";
import Kit from "./Kit";

const Home = () => {
  return (
    <div>
      <HomeHeroSection />
      <HowItWorks />
      <Kit />
      <CTAHome />
    </div>
  );
};

export default Home;

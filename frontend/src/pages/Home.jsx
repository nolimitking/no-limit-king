import CTAHome from "../components/CTA/CTAHome";
import HomeHeroSection from "../components/HeroSection/HomeHeroSection";
import HowItWorks from "../components/HowItWork";
import Kit from "./Kit";
import Owner from "../components/owner";

const Home = () => {
  return (
    <div>
      <HomeHeroSection />
      <HowItWorks />
      <Owner />
      <Kit />
      <CTAHome />
    </div>
  );
};

export default Home;

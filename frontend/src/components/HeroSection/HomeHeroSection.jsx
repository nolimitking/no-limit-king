import Kit from "../../assets/Kit.jpg";

const HomeHeroSection = () => {
  return (
    <div className="flex flex-col items-center my-48">
      <h1>Kit</h1>
      <img className="w-150 rounded-xl" src={Kit} alt="" />
    </div>
  );
};

export default HomeHeroSection;

import { logo } from "../assets";

const Hero = () => {
  const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

  return (
    <header className="w-full flex justify-center items-center flex-col">
      {console.log({ rapidApiKey })}
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="sumz_logo" className="w-28 object-contain" />
        <button
          type="button"
          onClick={() => window.open("https://github.com/Mehdi-Rh")}
          className="black_btn"
        >
          Github
        </button>
      </nav>
      <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Too busy to read? Sumz delivers key insights from any article.
      </h2>
    </header>
  );
};

export default Hero;

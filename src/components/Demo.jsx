import { useEffect, useState } from "react";
import { loader, linkIcon, copy, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({ url: "", summary: "" });

  const [allArticles, setAllArticles] = useState([]);

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) setAllArticles(articlesFromLocalStorage);
  }, []);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      setArticle(newArticle);

      const updatedAllArticles = [newArticle, ...allArticles];
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(allArticles));
    }
  };

  const [copied, setCopied] = useState("");
  const handleCopy = (urlToCopy) => {
    setCopied(urlToCopy);
    navigator.clipboard.writeText(urlToCopy);
    setTimeout(() => setCopied(""), 3000);
  };
  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Search */}
      <div className="w-full flex flex-col gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 "
          >
            ↵
          </button>
        </form>
        {/* Browser URL History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn">
                <img
                  src={copied.length > 0 ? tick : copy}
                  alt="copy_icon"
                  className="h-[40%] w-[40%] object-contain"
                  onClick={() => handleCopy(item.url)}
                />
              </div>{" "}
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
        {/* Display Result */}

        {console.log({ article })}
        <div className="my-10 max-w-full flex justify-center items-center">
          {isFetching ? (
            <img
              src={loader}
              alt="loader"
              className="w-20 h-20 object-contain"
            />
          ) : article.summary ? (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          ) : (
            error && (
              <p>
                Well, that wasn&apos;t supposed to happen ...
                <br />
                <span className="fonst-satoshi font-normal text-gray-700">
                  {error?.data?.error}
                </span>
              </p>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Demo;

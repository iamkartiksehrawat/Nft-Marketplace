import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconLoader2 } from "@tabler/icons-react";
import axios from "axios";

type article = {
  image: string;
  heading: string;
  description: string;
};

type ArticleList = {
  count: number;
  articles: article[];
};

const defaultlist: ArticleList = {
  count: 0,
  articles: [
    {
      image: "",
      heading: "",
      description: "",
    },
  ],
};

const Nftarticles = () => {
  const [articleList, setArticleList] = useState<ArticleList>(defaultlist);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticleList = async () => {
      try {
        const response = await axios.get("/articles/articlelist.json");
        if (response.status != 200) {
          throw new Error("Failed to fetch data");
        }
        setArticleList(response.data);
      } catch (error) {
        console.error("Error fetching article list:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticleList();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="w-full flex justify-center items-center p-48 gap-2">
          <IconLoader2 className="h-10 w-10 animate-spin" /> Loading
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-16 px-16 py-8">
          {articleList.articles.map((val, indx) => (
            <Link to={`/learn/${indx + 1}`}>
              <Card className="group cursor-pointer  hover:bg-[#161616]">
                <CardContent className="p-8 h-full text-sm sm:text-sm md:text-lg ">
                  <div className="flex flex-col gap-4">
                    <div className="overflow-hidden rounded-md">
                      <img
                        src={val.image}
                        className="object-cover rounded-sm transform transition-transform duration-300 ease-in-out group-hover:scale-110"
                      ></img>
                    </div>
                    <div className="font-bold text-xl pt-3 px-1">
                      {val.heading}
                    </div>
                    <div className="text-sm text-[#808080] px-1 ">
                      <p className=" line-clamp-3">{val.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const LearnNftHome = () => {
  return (
    <div className=" pt-28 font-inter">
      <div className="text-2xl font-semibold px-8 py-4">All articles</div>
      <Nftarticles />
    </div>
  );
};

export default LearnNftHome;

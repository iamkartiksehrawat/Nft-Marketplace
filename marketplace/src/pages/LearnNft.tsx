import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { IconLoader2 } from "@tabler/icons-react";
import axios from "axios";

type ArticleData = {
  date: string;
  title: string;
  main_image: string;
  short_desc: string;
  paragraphs: Paragraph[];
};

type Paragraph = {
  heading: string;
  content: string[];
  images: string[];
};

const defaultArticleData: ArticleData = {
  date: "",
  title: "",
  main_image: "",
  short_desc: "",
  paragraphs: [
    {
      heading: "",
      content: [],
      images: [],
    },
  ],
};

const LearnNft = () => {
  let { nftid } = useParams();
  const [jsonData, setJsonData] = useState<ArticleData>(defaultArticleData);
  const [isloading, setloading] = useState(false);

  useEffect(() => {
    const fetchJsonData = async () => {
      setloading(true);
      try {
        console.log(nftid);
        const response = await axios.get(
          `/articles/article-${nftid}/article-${nftid}.json`
        );
        if (response.status != 200) {
          throw new Error("Network response was not ok.");
        }

        setJsonData(response.data);
      } catch (error) {
        console.error("Error fetching JSON:", error);
      } finally {
        setloading(false);
      }
    };

    fetchJsonData();
  }, [nftid]);

  return (
    <div className=" pt-28 font-inter">
      {isloading ? (
        <div className="w-full flex justify-center items-center p-48 gap-2">
          <IconLoader2 className="h-10 w-10 animate-spin" /> Loading
        </div>
      ) : (
        <div className="flex w-full h-full justify-center">
          <div className="max-w-[75%] flex flex-col lg:p-8 sm:p-6 sm:gap-16 gap-12 p-4">
            <div>
              <div className="text-sm text-[#808080]">{jsonData?.date}</div>
              <div className="lg:text-7xl sm:text-6xl text-3xl font-semibold sm:pt-4 pt-2  ">
                {jsonData.title}
              </div>
            </div>

            <div className="flex w-full justify-center items-center">
              <div className="max-w-full overflow-hidden rounded-lg">
                <img
                  src={jsonData.main_image}
                  className="object-cover rounded-lg"
                ></img>
              </div>
            </div>
            {jsonData.paragraphs.map((val, dataindx) => (
              <div className="flex flex-col gap-8" key={dataindx}>
                <div className="text-4xl font-semibold">{val.heading}</div>
                {val.content.map((para, valindx) => (
                  <p
                    className="whitespace-pre-wrap text-sm leading-loose text-[#c4c4c4]"
                    key={valindx}
                  >
                    {para}
                  </p>
                ))}
                {val.images.map((img, imgindx) => (
                  <div
                    className="flex w-full justify-center items-center"
                    key={imgindx}
                  >
                    <div className="max-w-full overflow-hidden rounded-lg">
                      <img src={img} className="object-cover rounded-lg"></img>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnNft;

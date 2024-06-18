import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Infocard = ({ val, indx }) => {
  return (
    <Link to={`learn/${indx + 1}`}>
      <Card className="h-full bg-[#202020] overflow-hidden transition transform hover:-translate-y-2 hover:shadow-2xl duration-300 cursor-pointer hover:bg-[#242424]">
        <CardContent className="p-0 pb-2">
          <img src={val.image} className="aspect-square object-cover "></img>
          <div className="font-bold text-lg p-4">{val.heading}</div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Infocard;

import { Card, CardContent } from "@/components/ui/card";

const Infocard = ({ val, indx }) => {
  return (
    <Card className="h-full bg-[#202020] overflow-hidden transition transform hover:-translate-y-2 hover:shadow-2xl duration-300 cursor-pointer hover:bg-[#242424]">
      <CardContent className="p-0 pb-2">
        <img src={val.src} className="aspect-square object-cover "></img>
        <div className="font-bold text-lg p-4">{val.title}</div>
      </CardContent>
    </Card>
  );
};

export default Infocard;

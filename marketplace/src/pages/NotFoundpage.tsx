import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { IconError404 } from "@tabler/icons-react";

const NotFoundpage = () => {
  const navigate = useNavigate();
  return (
    <div className=" pt-28 font-inter">
      <div className="flex justify-center items-center px-20 font-inter">
        <Card className="m-12 mx-4">
          <CardContent className="p-20">
            <div className="flex justify-center">
              <IconError404 className=" h-52 w-52" />
            </div>
            <div className="font-bold text-4xl text-center">
              {" "}
              Page Not Found
            </div>
            <div className="font-semibold text-center text-sm text-[#a0a0a0] pt-3">
              {" "}
              Sorry, the page you are looking for does not exist.
            </div>
            <div className="flex justify-center items-center pt-6">
              <Button
                variant="outline"
                onClick={() => {
                  navigate("/");
                }}
              >
                Go to Home Page !!
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFoundpage;

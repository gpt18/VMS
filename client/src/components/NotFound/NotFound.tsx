import { Link } from "react-router-dom";
import imageNot from "../../assets/img/404.png";
import { Button } from "../Button";

export default function NotFound() {
  return (
    <>

      <div className="container mx-auto h-screen flex justify-center text-center items-center">
        <div className="lg:flex justify-center text-center items-center">
          <div className="">
            <img src={imageNot} alt="" />
          </div>
          <div className="space-y-2">
            <div className="text-5xl">We looked <br /> Everywhere</div>
            <div className="font-bold text-xl">Looks like this page is missing</div>
            <br />
            <Link to={"/"} className="btn btn-primary  "><Button variant={"outlined"}>Go to homepage</Button></Link>
            <Link to={-1} className="mx-4"><Button variant={"contained"}>Go Back</Button></Link>
          </div>
        </div>
      </div>
    </>
  )
}

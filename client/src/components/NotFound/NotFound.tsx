import { Link } from "react-router-dom";
import imageNot from "../../assets/img/404.png";

export default function NotFound() {
  return (
    <>
    <div id="notfound" className="vh-100 overflow-hidden d-flex flex-column justify-content-center align-items-center align-content-center">
      <div className="conatiner ">
      <div className="row">
        <div className="col-md-6 align-self-center">
          <img src={imageNot} alt="" />
        </div>
        <div className="col-md-6 align-self-center text-center">
          <h1 className="display-1 fw-bold">We looked <br /> Everywhere</h1>
          <b>Looks like this page is missing</b>
          <br />
          <Link to={-1} className="btn btn-secondary my-4 me-2">Go Back</Link>
          <Link to={"/"} className="btn btn-primary my-4 ">Go to homepage</Link>
          
        </div>
      </div>
      </div>
    </div>
    </>
  )
}

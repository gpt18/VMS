
import { strings, url } from '../../utils/costants';
import styles from './pages_styles.module.scss'
import { BsArrowRight, BsFillCalendarEventFill } from 'react-icons/bs'
import { FaPeopleCarryBox } from 'react-icons/fa6';
import { RiTeamFill, RiGlobalLine } from 'react-icons/ri'
import imageGroup from "../../assets/img/group.png";
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <>
      <section className={styles.hero} id="hero">
        <div className="container">
          <div className="row">
            <div className={`col-lg-6`}>
              <div className={`pb-5 ${styles.img__container}`}>
                <img src={imageGroup} alt="" />
              </div>
            </div>
            <div className={`col-lg-6`}>
              <div className={`pb-5 ${styles.quote__container}`}>
                <h1>Connect Today</h1>
                <h1 className={styles.highlight}>Drive Tommorow</h1>
                <h1>Thrive Together</h1>
              </div>
              <div className={styles.button__container}>
                <button className={`btn btn-secondary ${styles.btn}`}>
                  <Link to={url.goto.ngo_admin_dashboard}>
                  <span>For NGO</span>
                  <BsArrowRight />
                  </Link>
                </button>
                <button className={`btn btn-primary ${styles.btn}`}>
                  <span>For Volunteer</span>
                  <BsArrowRight />
                </button>
              </div>
            </div>
          </div>

        </div>

      </section>
      <section id="services" className={styles.services}>
        <div className="container">
          <div className={styles.heading}>Our Services</div>
          <div className={`${styles.subtitle}`}>
            As a critical platform bridging NGOs and Volunteers, we provide a structured framework sevicing stratergically towards a clear mission and shared success. Below are some of {strings.APP_NAME} unique features:
          </div>
          <div className={styles.services_layer}>
            <ServicesCard icon={<FaPeopleCarryBox/>} title='Volunteer Management' />
            <ServicesCard icon={<RiTeamFill/>} title='Drive Collaboration'/>
            <ServicesCard icon={<BsFillCalendarEventFill/>} title='Event Organization'/>
            <ServicesCard icon={<RiGlobalLine/>} title='Global Campaigns'/>
          </div>
        </div>
      </section>

      <section className={styles.about} id="about">
        <div className="container">
        <div className={styles.heading}>About {strings.APP_NAME} </div>
        <div className={`${styles.subtitle}`}>
        {strings.APP_NAME} is a dedicated platform serving NGOs and volunteers alike by structuring and streamlining collaborations. By bridging the gap between humanitarian organizations and willing individuals, we maintain our commitment to improving and facilitating volunteerism.
        <ul>
          <li>{strings.APP_NAME} is built around the central ethos of promoting effective collaboration, enabling NGOs and volunteers to connect easily.</li>
          <li>We provide a unique dashboard where volunteers can track their contributions and NGOs can measure the impact of their drives in real-time.</li>
          <li>Our simplified system makes it easy to manage campaigns, events, and drives without any hassle.</li>
          <li>Our simplified system makes it easy to manage campaigns, events, and drives without any hassle.</li>
        </ul>
        We exist to drive societal change through efficient and effective volunteer management. Choose {strings.APP_NAME} for a tool that's trusted by some of the world's leading NGOs.
        </div>
        </div>
      </section>
    </>
  );
}

type ServicesCardProps = {
  icon?: React.ReactNode,
  title: string,
}

function ServicesCard(props: ServicesCardProps) {
  const {icon = <FaPeopleCarryBox/>} = props;
  return (
    <>
      <div className={styles.service__card}>
        <div className={styles.icon}> {icon} </div>
        <div className={styles.card__heading}> {props.title} </div>
      </div>
    </>
  );
}

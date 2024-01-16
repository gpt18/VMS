import { strings, url } from '../../utils/costants';
import { BsArrowRight, BsFillCalendarEventFill } from 'react-icons/bs'
import { FaPeopleCarryBox } from 'react-icons/fa6';
import { RiTeamFill, RiGlobalLine } from 'react-icons/ri'
import imageGroup from "../../assets/img/group.png";
import { Link } from 'react-router-dom';
import styles from './pages_styles.module.scss'; // Import the generated CSS file
import { Button } from '../../components/Button';

export default function LandingPage() {
  return (
    <>
      <section className={styles.hero} id="hero">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-1/2 px-4">
              <div className={styles.img__container}>
                <img src={imageGroup} alt="" />
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <div className={styles.quote__container}>
                <h1>Connect Today</h1>
                <h1 className={styles.highlight}>Drive Tommorow</h1>
                <h1>Thrive Together</h1>
              </div>
              <div className='my-5 text-xl'>Join Us 🤝 </div>
              <div className="flex gap-4 mt-5">
                <div className='w-full'>
                  <Link to={"/ngo-signup"}>
                    <Button variant={'contained'} endIcon={<BsArrowRight />} className='w-full p-4'>For NGO</Button>
                  </Link>
                </div>
                <div className='w-full'>
                  <Link to={"/vol-signup"}>
                    <Button variant={'contained'} endIcon={<BsArrowRight />} className='w-full p-4'>For Volunteer</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="services" className={styles.services}>
        <div className="container mx-auto px-4">
          <div className={styles.heading}>Our Services</div>
          <div className={styles.subtitle}>
            As a critical platform bridging NGOs and Volunteers, we provide a structured framework sevicing stratergically towards a clear mission and shared success. Below are some of {strings.APP_NAME} unique features:
          </div>
          <div className={styles.services_layer}>
            <ServicesCard icon={<FaPeopleCarryBox />} title='Volunteer Management' />
            <ServicesCard icon={<RiTeamFill />} title='Drive Collaboration' />
            <ServicesCard icon={<BsFillCalendarEventFill />} title='Event Organization' />
            <ServicesCard icon={<RiGlobalLine />} title='Global Campaigns' />
          </div>
        </div>
      </section>

      <section className={styles.about} id="about">
        <div className="container mx-auto px-4">
          <div className={styles.heading}>About {strings.APP_NAME} </div>
          <div className={styles.subtitle}>
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
  const { icon = <FaPeopleCarryBox /> } = props;
  return (
    <>
      <div className={styles.service__card}>
        <div className={styles.icon}> {icon} </div>
        <div className={styles.card__heading}> {props.title} </div>
      </div>
    </>
  );
}
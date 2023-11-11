import { NavLink, Link } from 'react-router-dom'
import styles from './Header.module.scss'
import { FiMenu } from 'react-icons/fi'
import { BsBoxArrowUpRight } from 'react-icons/bs'

type HeaderProps = {
    appName?: string,
    icon: string,
    menu: {
        tag: string,
        link: string,
    }[]
}

const Header = (props: HeaderProps) => {

    const { appName = 'Voluntās' } = props

    return (
        <>
            <div className={`shadow ${styles.header}`}>
                <div className={`container ${styles.container}`}>
                    <Link to="/" className={styles.brand}>
                        <img id="icon" src={props.icon} alt="appIcon" />
                        <div className={styles.app__name}> {appName} </div>
                    </Link>

                    <nav className={`${styles.nav} d-none d-md-block `}>
                        {props.menu.map((item, index) => {
                            return <NavLink to={item.link} className={`clickable ${styles.navLink}`} key={index}> {item.tag} </NavLink>
                        })}
                        <button className="btn btn-primary">Login <BsBoxArrowUpRight /></button>
                    </nav>

                    <div className={`d-md-none clickable ${styles.menu}`} >
                        <a href="#sideMenu" data-bs-toggle="offcanvas" aria-controls="sideMenu"><FiMenu /></a>
                    </div>
                </div>
            </div>

            {/* offcanvas */}
            <div className="offcanvas offcanvas-end d-md-none" tabIndex={-1} id='sideMenu'>
                <div className="offcanvas-header justify-content-end">
                    <button className="btn-close m-2" data-bs-dismiss="offcanvas"></button>
                </div>
                <div className="offcanvas-body">
                    {props.menu.map((item, index) => {
                        return <h1 key={index} className="link" data-bs-dismiss="offcanvas">
                            <NavLink to={item.link} className={styles.navLink}> {item.tag} </NavLink>
                            </h1>
                    })}
                    <button className="btn btn-primary mt-4">Login <BsBoxArrowUpRight /></button>
                </div>
            </div>

        </>

    )
}

export default Header
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import styles from './MainLayout.module.scss'
import Header from '../../components/Header/Header';
import { strings } from '../../utils/costants';
import logo from '../../assets/logo.svg'
import Footer from '../../components/Footer/Footer';

const menu = [
  {
    tag: "Home",
    link: "/"
  },
  {
    tag: "Contact",
    link: "/contact"
  },
  {
    tag: "About",
    link: "/about"
  },
]

const MainLayout: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header appName={ strings.APP_NAME } icon={logo} menu={menu} />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default MainLayout;

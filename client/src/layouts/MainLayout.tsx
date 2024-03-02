import React from 'react'
import { Outlet } from 'react-router-dom'
import  './layout_styles.scss'

import { strings } from '../utils/costants';
import logo from '../assets/logo.svg'

import MainHeader from '../components/MainHeader';
import Footer from '../components/Footer';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

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
    <>
    <div id="main_layout">
    <div className="holder">
      <MainHeader appName={strings.APP_NAME} icon={logo} menu={menu}/>
      {/* <Header appName={ strings.APP_NAME } icon={logo} menu={menu} /> */}
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
    </div>
    </>
  );
};

export default MainLayout;

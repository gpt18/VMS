import React from 'react'
import styles from './Footer.module.scss'
import { strings } from '../../utils/costants'

export default function Footer() {
  return (
    <>
    <div className={styles.footer} id="footer">
        <div className="container">
            Copyright © {strings.APP_NAME} 2023 
        </div>
    </div>
    </>
  )
}

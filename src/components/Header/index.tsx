import { useContext } from 'react'

import Link from 'next/link'

import styles from './styles.module.scss'
import Image from 'next/image'
import logoImg from '../../../public/logo.svg'

import { FiLogOut } from 'react-icons/fi'

import { AuthContext } from '../../contexts/AuthContext'

export function Header(){

  const { signOut } = useContext(AuthContext)

  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href='/dashboard'>
          <span className={styles.textPizzaria}>
            Pizzari
            <Image src={logoImg} alt="Logo Pizzaria" width={20} height={20} />
          </span>
        </Link>

        <nav className={styles.menuNav}>
          <Link href='/category' className={styles.menuLink}>
           Categoria
          </Link>

          <Link href='/product' className={styles.menuLink}>
           Cardapio
          </Link>

          <button onClick={signOut}>
            <FiLogOut color='#fff' size={24} />
          </button>
        </nav>

      </div>
    </header>
  )
}
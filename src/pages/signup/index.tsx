import { FormEvent, useState, useContext } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import styles from '../../../styles/home.module.scss'
import logoImg from '../../../public/logo.svg'

import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

import { AuthContext } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'

import Link from 'next/link'

export default function SignUp() {
  const { signUp } = useContext(AuthContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSignUp(event: FormEvent){
    event.preventDefault()

    if(name === '' || email === '' || password === ''){
      toast.error("Preencha todos os campos!")
      return
    }

    setLoading(true)

    let data = {
      name,
      email,
      password
    }

    await signUp(data)

    setLoading(false)

  }

  return (
    <>
      <Head>
        <title>Faça seu cadaastro agora!</title>
      </Head>
      <div className={styles.containerCenter}>
        <span className={styles.textPizzaria}>
          Pizzari
          <Image src={logoImg} alt="Logo Pizzaria" width={50} height={50} />
        </span>

        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          
          <form onSubmit={handleSignUp}>
            <Input 
             placeholder='Digite seu nome' 
             type='text'
             value={name}
             onChange={(e) => setName(e.target.value)}
            />
            <Input 
             placeholder='Digite seu email' 
             type='text'
             value={email}
             onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              placeholder='Digite sua senha' 
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type='submit'
              loading={loading}
            >
              Cadastrar
            </Button>

          </form>
          <Link href="/">
            <div className={styles.text}>Já possui uma conta? Faça login!</div>
          </Link>
        </div>

      </div>
    </>
  )
}

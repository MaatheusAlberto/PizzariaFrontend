import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie } from "nookies";
import { AuthTokenError } from "../services/errors/AuthTokenError";

// paginas que so pode ser acessado por usuarios logados

export function canSSRAuth<P>(funcao: GetServerSideProps<P>){

  return async (contexto: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

    const cookies = parseCookies(contexto)

    const token = cookies['@nextauth.token']

    if(!token){
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    try{
      return await funcao(contexto)

    } catch(error){

      if(error instanceof AuthTokenError){
        destroyCookie(contexto, '@nextauth.token')

        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }
    }

  }

}
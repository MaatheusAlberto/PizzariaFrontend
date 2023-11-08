import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

// paginas que so pode ser acessado por visitantes

export function canSSRGuest<P>(funcao: GetServerSideProps<P>) {

  return async (contexto: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

    const cookies = parseCookies(contexto)

    // se tentar acessar a pagina e usuario ja tem login
    if(cookies['@nextauth.token']) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false
        }
      }
    }


    return await funcao(contexto)
  }

}

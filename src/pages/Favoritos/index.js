import { useEffect, useState } from 'react'
import './favoritos.css'
import {Link} from 'react-router-dom'

export default function Favoritos() {
    const [filmes, setFilmes] = useState([])
   
    useEffect(()=>{
        const minhaLista = localStorage.getItem("@primeflix")
        setFilmes(JSON.parse(minhaLista) || [])
    }, [])

  return (
    <div className='meus-filmes'>
      <h1>TELA DE FAVORITOS!</h1>
      <ul>
        {filmes.map((i)=> {
            return(
                <li key={i.id}>
                    <span>{i.title}</span>
                    <div>
                        <Link to={`/filme/${i.id}`}>Ver detalhes</Link>
                        <button>Excluir</button>
                    </div>
                </li>
            )
        })}
      </ul>
    </div>
  )
}

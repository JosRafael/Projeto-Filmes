import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/api'
import './filme-info.css'

export default function Filme() {
  const { id } = useParams()
  const [filme, setFilme] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadingFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: '28fc232cc001c31e8a031f419d0a14ca',
            language: 'pt-BR',
          },
        })
        .then((r) => {
          setFilme(r.data)
          setLoading(false)
        })
        .catch(() => {
          console.error('Filme não encontrado')
        })
    }
    loadingFilme()

    return () => {
      console.log('componente foi desmontado')
    }
  }, [id])

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className="area-buttons">
        <button>Salvar</button>
        <button>
          <a href={`https://www.youtube.com/results?search_query=${filme.title} trailer`} target="_blank" rel="noopener noreferrer">Trailer</a>
        </button>
      </div>
    </div>
  )
}

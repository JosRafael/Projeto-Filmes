import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import api from "../../services/api"

export default function Filme(){
    const {id} = useParams();
    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadingFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key: "28fc232cc001c31e8a031f419d0a14ca",
                    language: "pt-BR",         
                }
            })
            .then((r)=>{
                setFilme(r.data);
                setLoading(false);
            })
            .catch(()=>{
                console.error("Filme não encontrado")
            })
        }
        loadingFilme()

        return () =>{
            console.log('componente foi desmontado')
        }
    }, [])
    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregabdi detalhes...</h1>
            </div>
        )
    }
    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average} / 10</strong>
        </div>
    )
}
import { useEffect, useState } from "react"
import api from "../../services/api";

export default function Home(){
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        async function loadFilmes(){
            const response = await api.get("/movie/now_playing", {
               params: {
                api_key: "28fc232cc001c31e8a031f419d0a14ca",
                language: "pt-BR",
                page: 1,
               }
            });
            console.log(response.data.results);
        }
        loadFilmes()
    })
    return(
        <div>
            <h1>Você está na home!</h1>
        </div>
    )
}
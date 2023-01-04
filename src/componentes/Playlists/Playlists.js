import React, { useEffect, useState } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios"

// const playlistsLocal = [
//     {
//         id: 1,
//         name: "Playlist 1"
//     },
//     {
//         id: 2,
//         name: "Playlist 2"
//     },
//     {
//         id: 3,
//         name: "Playlist 3"
//     },
//     {
//         id: 4,
//         name: "Playlist 4"
//     },
// ]

function Playlists() {
    const [playlists, setPlaylists] = useState([]);
    const [pesquisa, setPesquisa] = useState("");

    useEffect(() => { getAllPlaylists() }, [])

    const getAllPlaylists = () => {
        axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists",
            { headers: { Authorization: "renan-maruffa-barbosa" } }
        )
            .then((response) => {
                setPlaylists(response.data.result.list)
            })
            .catch((err) => {
                console.log(err.response);
            })
    };

    const searchPlaylist = async (busca) => {
        try {
            const response = await axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/search?name=${busca}`,
                { headers: { Authorization: "renan-maruffa-barbosa" } }
            );
            setPlaylists(response.data.result.playlist)
            setPesquisa("")
        }
        catch (error) {
            console.log(error.response);
        }
    };

    const deletePlaylist = async (id) => {
        try {
            const response = await axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${id}`,
                { headers: { Authorization: "renan-maruffa-barbosa" } })
            alert("Playlist deletada com sucesso!")
            getAllPlaylists()
        }
        catch (error) {
            alert("Playlist não encontrada")
        }
    }


    return (
        <div>

            <input
                placeholder="Digite o nome da Playlist"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}>
            </input>

            <button onClick={() => searchPlaylist(pesquisa)}>Pesquisar</button>
            <button onClick={getAllPlaylists}>Voltar</button>

            {playlists.map((playlist) => {
                return (
                    <><Musicas key={playlist.id} playlist={playlist} />
                        <button onClick={() => deletePlaylist(playlist.id)}>Excluir Playlist</button></>
                )
            })
            }

        </div>
    );
}

export default Playlists;

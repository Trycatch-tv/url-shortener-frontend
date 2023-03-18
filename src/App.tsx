import axios from "axios"
import { useEffect, useState } from "react"
import "./App.css"

function App() {
  const [links, setLinks] = useState<any>([])
  const [mostrarInput, setMostrarInput] = useState(false)
  const [link, setLink] = useState<any>({})
  const [mostrarRespuesta, setMostrarRespuesta] = useState("")
  const getLinks = async () => {
    const res = await axios.get(
      "https://z2a8mtyxgl.execute-api.us-east-1.amazonaws.com/dev/enlaces/listar"
    )
    setLinks(res.data.data)
  }

  useEffect(() => {
    getLinks()
  }, [])

  const mostrarInputHandler = (link: any) => {
    setMostrarInput(true)
    setLink(link)
  }

  const actualizarLink = async () => {
    const res = await axios.get(
      `https://z2a8mtyxgl.execute-api.us-east-1.amazonaws.com/dev/enlaces/actualizar/${link.id}?enlace_corto=${link.enlace_corto}`
    )
    setMostrarRespuesta(res.data.data)
    setTimeout(() => {
      setMostrarRespuesta("")
    }, 2000)
    setMostrarInput(false)
    getLinks()
  }

  const onChangeHandler = (e: any) => {
    setLink({ ...link, enlace_corto: e.target.value })
  }

  return (
    <>
      <h1>Enlaces</h1>
      <hr />
      <button> Añadir Enlace </button>
      <br />
      <input type="text" placeholder="Buscar" />
      <ul>
        {links.map((link: any) => (
          <li key={link.id}>
            <a href={link.enlace_original}>{link.enlace_original}</a>(
            {link.enlace_corto}) -
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                mostrarInputHandler(link)
              }}
            >
              Editar
            </span>
            - <span>Eliminar</span>
          </li>
        ))}

        {mostrarInput === true && (
          <>
            <input
              type="text"
              placeholder="Enlace corto"
              value={link.enlace_corto}
              onChange={(e) => {
                onChangeHandler(e)
              }}
            />
            <button
              type="button"
              onClick={() => {
                actualizarLink()
              }}
            >
              Actualizar
            </button>
          </>
        )}
        <p>{mostrarRespuesta}</p>
      </ul>
    </>
  )
}

export default App

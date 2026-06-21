function Buttons() {

    const alerta = () => {
        alert("Estou te olhando")
    }
    return(
        <div><input type="button" value={'Meu botão criado!'} onClick={alerta} className="icon"></input></div>
    )
}


function Bluisky(){
  return(
    <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
  )
}

export {Buttons, Bluisky}

import { useState, useRef, useReducer } from "react"
import "./Game.css"

const Game = ({ verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, score, guesses }) => {

    const [letter, setLetter] = useState("");

    const letterInputRef = useRef(null)
    const handleSubmit = (e) => {
        e.preventDefault();

        // enviando a letra para a função no App.jsx
        verifyLetter(letter)

        // colocando o valor da letra como ""
        setLetter("")

        // focando no input
        letterInputRef.current.focus()
    }

    return (
        <div className="game">
            <p className="points">
                <span>Pontuação: {score}</span>
            </p>
            <h1>Adivinhe a Palavra</h1>
            <h3 className="tip">
                Dica: <span>{pickedCategory}</span>
            </h3>
            <p id="chance">Você possui mais <span>{guesses}</span> tentativas</p>

            <div className="wordContainer">
                {letters.map((letra, index) => (
                    guessedLetters.includes(letra) ? (
                        <span key={index} className="letra">{letra}</span>
                    ) : (
                        <span key={index} className="blankSquare"></span>
                    )
                ))}
            </div>

            <div className="letterContainer">
                <p>Insira uma letra</p>
                <form onSubmit={handleSubmit}>
                    <input 
                    type="text" 
                    name="letra" 
                    maxLength="1" 
                    autoComplete="off" 
                    required 
                    onChange={(e) => setLetter(e.target.value)} value={letter} 
                    ref={letterInputRef}
                    />
                    <button>Jogar</button>
                </form>
            </div>

            <div className="wrongLettersContainer">
                <p>Letras utilizadas: </p>

                {wrongLetters.map((letra, index) => (
                    <span key={index}>{letra}, </span>
                ))}
            </div>
        </div>
    )
}

export default Game
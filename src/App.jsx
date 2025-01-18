// css
import './App.css'

// react
import { useCallback, useEffect, useState } from 'react'

// data
import { wordsList } from "./data/words.js"

// components
import StartScreen from './components/StartScreen'
import Game from './components/Game.jsx'
import GameOver from './components/GameOver.jsx'

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
]

function App() {
  const [ gameState, setGameState ] = useState(stages[0].name); // start => inicia no start
  const [ words ] = useState(wordsList);
  const [ pickedWord, setPickedWord ] = useState();
  const [ pickedCategory, setPickedCategory ] = useState();
  const [ letters, setLetters ] = useState([]);
  
  const pickWordAndCategory = () => {
    // pick category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];

    // pick word
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    // hint
    return [ word, category ]
  }
  
    // start the secret word game
    const startGame = () => {
    const [ word, category ] = pickWordAndCategory();

    // create an array of letters
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((letter) => {
      return letter.toLowerCase()
    })

    console.log(word, category, wordLetters)

    // fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameState(stages[1].name);
  }

  // process the letter input
  const verifyLetter = () => {
    setGameState(stages[2].name);
  }

  const retry = () => {
    setGameState(stages[0].name);
  }

  return (
    <div className='App'>
      {gameState === "start" && <StartScreen startGame={startGame} />}
      {gameState === "game" && <Game verifyLetter={verifyLetter} />}
      {gameState === "end" && <GameOver retry={retry} />}
    </div>
  )
}

export default App

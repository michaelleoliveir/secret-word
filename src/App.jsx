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
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
]

const quessesQty = 3;

function App() {
  const [gameState, setGameState] = useState(stages[0].name); // start => inicia no start
  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState();
  const [pickedCategory, setPickedCategory] = useState();
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setgGuesses] = useState(quessesQty)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = useCallback(() => {
    // pick category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];

    // pick word
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    // hint
    return [word, category]
  }, [words])

  // start the secret word game
  const startGame = useCallback(() => {
    // clear all letters
    clearLetterStates();

    const [word, category] = pickWordAndCategory();

    // create an array of letters
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((letter) => {
      return letter.toLowerCase()
    })

    // fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameState(stages[1].name);
  }, [pickWordAndCategory])

  // process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    // check if letter has already been utilized
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }

    // push guessed letter or remove a guess
    if(letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, 
        normalizedLetter
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, 
        normalizedLetter
      ]);

      setgGuesses((actualGuesses) => actualGuesses - 1)
    }
  }

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  // check if guesses ended
  useEffect(() => {
    if(guesses <= 0) {
      // reset all states
      clearLetterStates();

      setGameState(stages[2].name)
    }
  }, [guesses]);

  // check win condition
  useEffect(() => {
    // o new Set() cria uma nova array somente com as letras que não foram repetidas
    const uniqueLetters = [... new Set(letters)]

    // win condition
    if(guessedLetters.length === uniqueLetters.length && gameState === stages[1].name) {
      // add score
      setScore((actualScore) => actualScore + 100)

      // restart game with new word
      setTimeout(() => {
        startGame();
      }, 800);
    }
  }, [guessedLetters])

  const retry = () => {
    setScore(0)
    setgGuesses(quessesQty)
    setGameState(stages[0].name);
  }

  return (
    <div className='App'>
      {gameState === "start" && <StartScreen startGame={startGame} />}
      {gameState === "game" && <Game verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score} />}
      {gameState === "end" && <GameOver retry={retry} score={score} />}
    </div>
  )
}

export default App

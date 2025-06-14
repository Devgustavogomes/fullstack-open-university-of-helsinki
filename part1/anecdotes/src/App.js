import { useState } from 'react'

const Text = ({ content }) => {
  return (
    <div>
      <p>{content}</p>
    </div>
  )
}

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const MostVotes = ({ anecdotes, pontos }) => {
  const anecdoteMostVote = () => {
    let maior = pontos[0];
    let maiorIndex = 0;
    for (let i = 1; i < anecdotes.length; i++) {
      if (pontos[i] > maior) {
        maior = pontos[i];
        maiorIndex = i
      }
    }
    return maiorIndex;
  }

  return (
    <div>
      <p>{anecdotes[anecdoteMostVote()]}</p>
      <p>{`Has ${pontos[anecdoteMostVote()]} votes`}</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'Se fazer algo dói, faça isso com mais frequência.',
    'Contratar mão de obra para um projeto de software que já está atrasado, faz com que se atrase mais ainda!',
    'Os primeiros 90% do código correspondem aos primeiros 10% do tempo de desenvolvimento... Os outros 10% do código correspondem aos outros 90% do tempo de desenvolvimento.',
    'Qualquer tolo escreve código que um computador consegue entender. Bons programadores escrevem código que humanos conseguem entender.',
    'Otimização prematura é a raiz de todo o mal.',
    'Antes de mais nada, depurar é duas vezes mais difícil do que escrever o código. Portanto, se você escrever o código da forma mais inteligente possível, você, por definição, não é inteligente o suficiente para depurá-lo.',
    'Programar sem o uso extremamente intenso do console.log é o mesmo que um médico se recusar a usar raio-x ou testes sanguíneos ao diagnosticar pacientes.',
    'A única maneira de ir rápido é ir bem.'
  ]

  const [selected, setSelected] = useState(0)
  const [pontos, setPontos] = useState([0, 0, 0, 0, 0, 0, 0, 0])
  const handleClickNext = () => {
    setSelected(Math.floor(Math.random() * 8))
  }

  const handleClickVote = () => {
    const copia = [...pontos]
    copia[selected] += 1
    setPontos(copia)
  }

  return (
    <div>
      <Text content={anecdotes[selected]} />
      <Text content={`has ${pontos[selected]} votes`} />
      <Button text='vote' handleClick={handleClickVote} />
      <Button text='next anecdote' handleClick={handleClickNext} />
      <Text content={'Anecdote with most votes'} />
      <MostVotes anecdotes={anecdotes} pontos={pontos} />
    </div>

  )
}

export default App
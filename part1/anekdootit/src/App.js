import React, {useEffect, useState} from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [model, setModel] = useState(new Array(anecdotes.length).fill(0));
  const [mostVotes, setMostVotes] = useState(0);

  const next = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  const vote = () => {
    const cp = [...model];
    cp[selected] += 1;
    setModel(cp);
  }

  useEffect(() => {
      const i = model.indexOf(Math.max(...model));
      setMostVotes(i);
  }, [model]);

  return (
      <div style={{display: "flex", flexDirection: "column",}}>
        <h2>Anecdote of the day</h2>
        <span>{anecdotes[selected]}</span>
        <span>has {model[selected]} votes</span>
        <div>
          <button onClick={next}>next anecdote</button>
          <button onClick={vote}>vote</button>
        </div>
        <h2>Anecdote with the most votes</h2>
          <span>{anecdotes[mostVotes]}</span>
      </div>
  )
}

export default App
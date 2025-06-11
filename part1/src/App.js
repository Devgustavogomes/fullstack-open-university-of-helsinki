const Header = (props) => {
  console.log(props);
  <>
    <h1>{props.course}</h1>
  </>
}
const Parts = (props) => {
  console.log(props);
  <>
    <p>
      {props.part} {props.exercises}
    </p>
  </>
}
const Content = (props) => {
  console.log(props);
  <>
    <Parts part={props.parts[0]} exercises={props.exercises[0]} />
    <Parts part={props.parts[1]} exercises={props.exercises[1]} />
    <Parts part={props.parts[2]} exercises={props.exercises[2]} />☻
  </>
}

const Total = (props) => {
  console.log(props);
  <p>Number of exercises {props.total}</p>
}

const App = () => {
  const course = {
    name: 'Desenvolvimento de aplicação Half Stack',
    parts: [
      {
        name: 'Fundamentos da biblioteca React',
        exercises: 10
      },
      {
        name: 'Usando props para passar dados',
        exercises: 7
      },
      {
        name: 'Estado de um componente',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total total={totalExercises} />
    </div>
  )
}

export default App
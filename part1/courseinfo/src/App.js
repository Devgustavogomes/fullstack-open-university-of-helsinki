const Header = (props) => {
  console.log(props);
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}
const Parts = (props) => {
  console.log(props);
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  )
}
const Content = (props) => {
  console.log(props);
  return (
    <>
      <Parts part={props.course.parts[0].name} exercises={props.course.parts[0].exercises} />
      <Parts part={props.course.parts[1].name} exercises={props.course.parts[1].exercises} />
      <Parts part={props.course.parts[2].name} exercises={props.course.parts[2].exercises} />
    </>
  )
}

const Total = (props) => {
  console.log(props.exercises);
  return (
    <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
  )
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
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App
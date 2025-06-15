const Header = ({ name }) => {

    return (
        <>
            <h1>{name}</h1>
        </>
    )
}
const Content = ({ parts }) => {

    return (
        <>
            {parts.map(part => {
                return <Parts key={part.id} name={part.name} exercises={part.exercises} />
            })}
        </>
    )
}
const Parts = ({ name, exercises }) => {
    return (
        <>
            <p>
                {name} {exercises}
            </p>
        </>
    )
}
const Total = ({ parts }) => {
    return (
        <p>Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}</p>
    )
}

const Course = ({ courses }) => {
    return (
        <div>
            {courses.map(course => {
                return (
                    <div key={course.id}>
                        <Header name={course.name} />
                        <Content parts={course.parts} />
                        <Total parts={course.parts} />
                    </div>
                )
            })}
        </div>
    )
}


export default Course
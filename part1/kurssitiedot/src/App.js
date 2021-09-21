const Header = ({course}) => {
    return (<h1>{course}</h1>)
}

const Part = ({name, exercises}) => (<p>{name} {exercises}</p>)

const Content = ({items}) => {
    return (
        <>
            {items.map(({name, exercises}) => (
                <Part name={name} exercises={exercises}/>
            ))}
        </>
    )
}

const Total = ({items}) => {
    return (
        <p>Number of exercises {items.reduce((t, i) => t + i.exercises, 0)}</p>
    )
}


const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {name: 'Fundamentals of React', exercises: 10},
            {name: 'Using props to pass data', exercises: 7},
            {name: 'State of a component', exercises: 14}
        ],
    }

    return (
        <div>
            <Header course={course.name}/>
            <Content items={course.parts}/>
            <Total items={course.parts}/>
        </div>
    )
}

export default App
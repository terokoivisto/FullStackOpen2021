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
        <b>Number of exercises {items.reduce((t, i) => t + i.exercises, 0)}</b>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name}/>
            <Content items={course.parts}/>
            <Total items={course.parts}/>
        </div>
    )
}

export default Course;
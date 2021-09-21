import {useState} from "react";

const StatisticLine = ({text, value}) => {
    return (
        <tr>
            <td>{text}:</td>
            <td>{value}</td>
        </tr>
    );
}

const Statistics = ({good, bad, neutral}) => {
    const all = good + neutral + bad;
    const isFbGiven = () => !!all;

    return (
        <>
            <h2>Statistics</h2>
            {isFbGiven() ?
                <table>
                    <tbody>
                    <StatisticLine value={good} text="good"/>
                    <StatisticLine value={neutral} text="neutral"/>
                    <StatisticLine value={bad} text="bad"/>
                    <StatisticLine value={all} text="all"/>
                    <StatisticLine value={(good + bad * -1) / all} text="average"/>
                    <StatisticLine value={good / all} text="positive"/>
                    </tbody>
                </table>
                : "No feedback given!"}
        </>
    )
}

const Button = (
    {
        fn, children
    }
) => {
    return <button onClick={fn}>{children}</button>
}

const App = () => {

    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h2>Give feedback</h2>
            <Button fn={() => setGood(good + 1)}>good</Button>
            <Button fn={() => setNeutral(neutral + 1)}>neutral</Button>
            <Button fn={() => setBad(bad + 1)}>bad</Button>
            <Statistics bad={bad} neutral={neutral} good={good}/>
        </div>
    )
}

export default App;

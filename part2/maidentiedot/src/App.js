import {useEffect, useState} from "react";
import axios from "axios";
import Country from "./Country";

const App = () => {
    const [data, setData] = useState([]);
    const [dataFiltered, setDataFiltered] = useState([]);
    const [search, setSearch] = useState('');
    const [country, setCountry] = useState();

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(resp => setData(resp.data));
    }, []);

    useEffect(() => {
        if (!search) setDataFiltered(data);
        else setDataFiltered(data.filter(c => c.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())));
    }, [data, search]);

    const handleShow = (selected) => {
        setCountry(selected);
    }

    const renderCountries = () => {
        if (country) return (
            <Country country={country}/>
        )
        if (dataFiltered.length > 10) return "Too many results";
        else if (dataFiltered.length > 1) return (
            <ul>
                {dataFiltered.map(c => (
                    <li key={c.name}>{c.name}
                        <button onClick={() => handleShow(c)}>show</button>
                    </li>
                ))}
            </ul>
        )
        else if (dataFiltered.length === 1) return (
            <Country country={dataFiltered[0]}/>
        )
    };

    return (
        <>
            <form>
                find countries: <input value={search} onChange={ev => setSearch(ev.target.value)}/>
            </form>
            <div>
                {renderCountries()}
            </div>
        </>
    )
}

export default App;

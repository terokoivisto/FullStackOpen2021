import {useEffect, useState} from "react";
import axios from "axios";
import DBService from "./DBService";

const Search = ({search, onChange}) => {
    return (
        <form>
            <div>
                Search: <input value={search} onChange={onChange}/>
            </div>
        </form>
    )
}

const NewEntry = ({handleSubmit, newName, newNumber, onNameChange, onNumberChange}) => {
    return (
        <>
            <h3>Add new</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    name: <input value={newName} onChange={onNameChange}/>
                    number: <input value={newNumber} onChange={onNumberChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

const Numbers = ({show, handleDelete}) => {
    return (
        <>
            <h2>Numbers</h2>
            <ul>
                {show.map(p => (
                    <li key={p.id}>{p.name} {p.number}
                        <button onClick={() => handleDelete(p.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

const App = () => {
    const [persons, setPersons] = useState([]);
    const [show, setShow] = useState([]);
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('');

    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const fetchData = async () => setPersons(await DBService.getAllPersons());
        fetchData();
    }, []);

    useEffect(() => {
        if (!search) setShow(persons);
        else setShow(persons.filter(p => p.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())));
    }, [search, persons]);

    const doSuccess = (msg) => {
        setSuccessMsg(msg);
        setTimeout(() => {
            setSuccessMsg("");
        }, 5000);
    }

    const doError = (msg) => {
        setErrorMsg(msg);
        setTimeout(() => {
            setErrorMsg("");
        }, 5000);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const existing = persons.find(p => p.name === newName);
        if (!existing) {
            DBService.createPerson({name: newName, number: newNumber,})
                .then(resp => {
                    setPersons(persons.concat(resp));
                    doSuccess("Successfully added!")
                })
                .catch(err => doError("Could not add!"));
        } else if (window.confirm(`${newName} is already added to phonebook. Do you want to update the number?`)) {
            try {
                const updated = await DBService.updatePerson(existing.id, {...existing, number: newNumber});
                setPersons(persons.map(p => p.id === existing.id ? updated : p));
                doSuccess("Successfully updated the number!");
            } catch (e) {
                doError("Could not update the number!");
            }
        }
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete?"))
            DBService.deletePerson(id).then(() => {
                setPersons(persons.filter(p => p.id !== id));
                doSuccess("Deleted!")
            }).catch(err => doError("Failed to delete!"));
    }

    return (
        <div>
            <h2>Phonebook</h2>
            {!!successMsg && <div style={{padding: "1rem", margin: "1rem 0", border: "solid 1px green"}}>
                {successMsg}
            </div>}
            {!!errorMsg && <div style={{padding: "1rem", margin: "1rem 0", border: "solid 1px red"}}>
                {errorMsg}
            </div>}
            <Search search={search} onChange={ev => setSearch(ev.target.value)}/>
            <NewEntry handleSubmit={handleSubmit} newName={newName} newNumber={newNumber}
                      onNumberChange={(ev) => setNewNumber(ev.target.value)}
                      onNameChange={(ev) => setNewName(ev.target.value)}/>
            <Numbers show={show} handleDelete={handleDelete}/>
        </div>
    )

}

export default App
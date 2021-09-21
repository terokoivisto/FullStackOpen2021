import axios from "axios";

const personsUrl = "http://localhost:3333/persons"

const getAllPersons = () => {
    return axios
        .get(personsUrl)
        .then(resp => resp.data);
}

const createPerson = (data) => {
    return axios
        .post(personsUrl, data)
        .then(resp => resp.data);
}

const deletePerson = (id) => axios
    .delete(`${personsUrl}/${id}`)
    .then(resp => resp.data);

const updatePerson = (id, data) => axios
    .put(`${personsUrl}/${id}`, data)
    .then(resp => resp.data);

export default {
    getAllPersons,
    createPerson,
    deletePerson,
    updatePerson,
}
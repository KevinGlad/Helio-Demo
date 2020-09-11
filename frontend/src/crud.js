// this file handles the api calls to our backend
// functions require data and an api endpoint

// Get all
const getAll = (endpoint) => {

    return fetch(endpoint,{
        method: "GET",
        "Content-Type": "application/json"
    })
    .then(httpResponse => {

        if (!httpResponse.ok) {
            throw new Error(`Error with GET at ${endpoint}`)
        }

        return httpResponse.json()

    })
    .catch(err => {
        throw err
    })

}

// Get One
const getOne = () => {

}

// Update One
const updateOne = () => {

}

// Delete One
const deleteOne = () => {

}

export {getAll, getOne, updateOne, deleteOne}
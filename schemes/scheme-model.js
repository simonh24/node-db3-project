const db = require('../data/connection.js');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db('schemes');
}

function findById(id) {
    return db('schemes').where({ id }).first();
}

function add(scheme) {
    return db('schemes').insert(scheme, "id")
        .then(([id]) => {
            return findById(id);
        })
}

function findSteps(id) {
    return db.select('steps.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions').from('steps').join('schemes', 'schemes.id', '=', 'steps.scheme_id').where('schemes.id', id); // exact output as readme
    // return db('steps').join('schemes', 'schemes.id', '=', 'steps.scheme_id').where('schemes.id', id); // all info
}

function update(changes, id) {
    return db('schemes').where({ id }).update(changes)
        .then(() => {
            return findById(id);
        })
}

async function remove(id) {
    const temp = await db('schemes').where({ id }).first();
    if (temp) {
        const del = await db('schemes').where({ id }).del();
        if (del === 1) {
            return temp;
        }
    }
}
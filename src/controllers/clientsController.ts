import { RequestHandler } from 'express-serve-static-core'
import { pool } from '../db'
import { RowData } from '../interfaces/RowData'

export const getClients: RequestHandler = async (req, res) => {
    try {
        const [clients] = await pool.query('SELECT * FROM client')
        res.send(clients)
    } catch (e) {
        console.error(e)
    }
}

export const getClient: RequestHandler = async (req, res) => {
    try {
        const id = req.params.id
        const [client] = await pool.query('SELECT * FROM client WHERE id = ?', [id]) as RowData[]
        if(client.length <= 0) res.status(404).json({ message: 'Client not found' })
        res.send(client[0])
    } catch (e) {
        console.error(e)
    }
}

export const addClient: RequestHandler = async (req, res) => {
    try {
        const { name, password } = req.body
        const [client] = await pool.query('INSERT INTO client (name, password) values (?, ?)', [name, password]) as RowData[]
        res.send({
            id: client.insertId,
            name,
            password
        })
    } catch (e) {
        console.error(e)
    }
}

export const deleteClient: RequestHandler = async (req, res) => {
    try {
        const id = req.params.id
        const [result] = await pool.query('DELETE FROM client WHERE id = ?', [id]) as RowData[]
        if(result.affectedRows <= 0) res.status(404).json({ message: 'Client not found' })
        res.sendStatus(204)
    } catch (e) {
        console.error(e)
    }
}

export const updateClient: RequestHandler = async (req, res) => {
    try {
        const id = req.params.id
        const { name, password } = req.body
        const [result] = await pool.query('UPDATE client SET name = IFNULL(?, name), password = IFNULL(?, password) WHERE id = ?', [name, password, id]) as RowData[]
        if(result.affectedRows === 0) res.status(404).json({ message: 'Client not found'})
        const [client] = await pool.query('SELECT * FROM client WHERE id = ?', [id]) as RowData[]
        res.json(client[0])
    } catch (e) {
        console.error(e)
    }
}
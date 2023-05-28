import { RequestHandler } from 'express-serve-static-core'
import { pool } from '../db'
import { RowData } from '../interfaces/RowData'

export const getStrings: RequestHandler = async (req, res) => {
    try {
        const [strings] = await pool.query('SELECT * FROM string')
        res.send(strings)
    } catch (e) {
        console.error(e)
    }
}

export const getString: RequestHandler = async (req, res) => {
    try {
        const id = req.params.id
        const [string] = await pool.query('SELECT * FROM string WHERE id = ?', [id]) as RowData[]
        if(string.length <= 0) res.status(404).json({ messsage: 'String not found' })
        res.send(string[0])
    } catch (e) {
        console.error(e)
    }
}

export const addString: RequestHandler = async (req, res) => {
    try {
        const { name, brand, price, size } = req.body
        const [string] = await pool.query('INSERT INTO string (name, brand, price, size) VALUES (?, ?, ?, ?)', [name, brand, price, size]) as RowData[]
        res.send({
            id: string.insertId,
            name,
            brand,
            price,
            size
        })
    } catch (e) {
        console.error(e)
    }
}

export const deleteString: RequestHandler = async (req, res) => {
    try {
        const id = req.params.id
        const [result] = await pool.query('DELETE FROM string WHERE id = ?', [id]) as RowData[]
        if(result.affectedRows <= 0) res.status(404).json({ message: 'String not found' })
        res.sendStatus(204)
    } catch (e) {
        console.error(e)
    }
}

export const updateString: RequestHandler = async (req, res) => {
    try {
        const id = req.params.id
        const { name, brand, price, size } = req.body
        const [result] = await pool.query('UPDATE string SET name = IFNULL(?, name), brand = IFNULL(?, brand), price = IFNULL(?, price), size = IFNULL(?, size) WHERE id = ?', [name, brand, price, size, id]) as RowData[]
        if(result.affectedRows === 0) res.status(404).json({ message: 'String not found' })
        const [string] = await pool.query('SELECT * FROM string WHERE id = ?', [id]) as RowData[]
        res.json(string[0])
    } catch (e) {
        console.error(e)
    }
}
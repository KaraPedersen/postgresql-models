import pool from '../utils/pool';

export default class Cat {
  id;
  name;
  age;
  weight;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.age = row.age;
    this.weight = row.weight;
  }

  static async insert({ name, age, weight }) {
    const { rows } = await pool.query(
      'INSERT INTO cats (name, age, weight) VALUES ($1, $2, $3) RETURNING *',
      [name, age, weight]
    );
    return new Cat(rows[0]);

  }

  static async findAll() {

    const { rows } = await pool.query(`SELECT * 
    FROM cats
    `);

    return rows.map(row => new Cat(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(`
    SELECT *
    FROM cats
    WHERE id= $1
    `, [id]);

    if (!rows[0]) return null;

    return new Cat(rows[0]);
  }

  static async update(cat, id) {

    const { rows } = await pool.query(`
    UPDATE cats
    SET name = $1,
        age = $2,
        weight = $3
    WHERE id = $4
    RETURNING *
    `, [cat.name, cat.age, cat.weight, id]);

    return new Cat(rows[0]);
  }

  static async delete(id) {

    const { rows } = await pool.query(`
    DELETE FROM cats
    WHERE id = $1
    RETURNING *
    `, [id]);

    return new Cat(rows[0]);
  }
}

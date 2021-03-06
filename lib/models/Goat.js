import pool from '../utils/pool';

export default class Goat {
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
      'INSERT INTO goats (name, age, weight) VALUES ($1, $2, $3) RETURNING *',
      [name, age, weight]
    );
    return new Goat(rows[0]);
  }

  static async findAll() {

    const { rows } = await pool.query(`SELECT * 
    FROM goats
    `);

    return rows.map(row => new Goat(row));
  }
  static async findById(id) {
    const { rows } = await pool.query(`
    SELECT *
    FROM goats
    WHERE id= $1
    `, [id]);

    if (!rows[0]) return null;

    return new Goat(rows[0]);
  }

  static async update(goat, id) {

    const { rows } = await pool.query(`
    UPDATE goats
    SET      name = $1,
             age = $2,
             weight = $3
    WHERE    id = $4
    RETURNING *
    `, [goat.name, goat.age, goat.weight, id]);

    return new Goat(rows[0]);
  }

  static async delete(id) {

    const { rows } = await pool.query(`
    DELETE FROM goats
    WHERE id = $1
    RETURNING   *
    `, [id]);

    return new Goat(rows[0]);
  }
}

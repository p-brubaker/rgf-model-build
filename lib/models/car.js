const pool = require("../utils/pool");

class Car {
  constructor(row) {
    this.id = row.id;
    this.make = row.make;
    this.model = row.model;
    this.year = row.year;
  }

  static async insert({ make, model, year }) {
    const { rows } = await pool.query(
      `
      INSERT INTO cars (
          make,
          model,
          year
      ) VALUES ($1, $2, $3)
      RETURNING *;`,
      [make, model, year]
    );
    return new Car(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query("SELECT * FROM cars WHERE id=$1", [id]);
    return new Car(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query("SELECT * FROM cars");
    return rows.map((row) => new Car(row));
  }

  static async update({ id, make, model, year }) {
    const { rows } = await pool.query(
      `
      UPDATE cars
      SET
        make=$1,
        model=$2,
        year=$3
      RETURNING *;`,
      [make, model, year]
    );
    return new Car(rows[0]);
  }

  static async delete(id) {
    await pool.query(
      `
      DELETE FROM cars
      WHERE id=$1`,
      [id]
    );
  }
}

module.exports = Car;

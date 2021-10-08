const fs = require("fs");
const pool = require("../utils/pool");
const Car = require("./car");

describe("Car model", () => {
  beforeEach(() => {
    return pool.query(
      fs.readFileSync(__dirname + "/../../sql/setup.sql", "utf-8")
    );
  });

  it("should return a car object when a new car is inserted", async () => {
    const car = await Car.insert({ make: "Ford", model: "Taurus", year: 2002 });
    expect(car).toEqual({ id: "1", make: "Ford", model: "Taurus", year: 2002 });
  });

  afterAll(() => {
    return pool.end();
  });
});

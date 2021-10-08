const fs = require("fs");
const pool = require("../utils/pool");
const Car = require("./car");

describe("Car model", () => {
  const testCar2 = { make: "Toyota", model: "Corolla", year: 2005 };
  const testCar = { make: "Ford", model: "Taurus", year: 2002 };
  beforeEach(() => {
    return pool.query(
      fs.readFileSync(__dirname + "/../../sql/setup.sql", "utf-8")
    );
  });

  it("should return a car object when a new car is inserted", async () => {
    const car = await Car.insert(testCar);
    expect(car).toEqual({ id: "1", make: "Ford", model: "Taurus", year: 2002 });
  });

  it("should find a car by id", async () => {
    await Car.insert(testCar);
    const car = await Car.findById(1);
    expect(car).toEqual({ id: "1", make: "Ford", model: "Taurus", year: 2002 });
  });

  it("should find all cars", async () => {
    await Car.insert(testCar);
    await Car.insert(testCar2);
    const cars = await Car.findAll();
    expect(cars).toEqual([
      { id: "1", ...testCar },
      { id: "2", ...testCar2 },
    ]);
  });

  it("should update a car by id", async () => {
    await Car.insert(testCar);
    const updatedCar = await Car.update({
      id: 1,
      make: "Drof",
      model: "Suruat",
      year: 2002,
    });
    expect(updatedCar).toEqual({
      id: "1",
      make: "Drof",
      model: "Suruat",
      year: 2002,
    });
  });

  it("should delete a car by id", async () => {
    await Car.insert(testCar);
    await Car.insert(testCar2);
    await Car.delete(2);
    const remainingCars = await Car.findAll();
    expect(remainingCars).toEqual([{ id: "1", ...testCar }]);
  });

  afterAll(() => {
    return pool.end();
  });
});

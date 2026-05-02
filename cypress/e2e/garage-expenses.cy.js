/// <reference types="cypress" />

import { garagePage } from "../pageObjects/garagePage";
import { expensesPage } from "../pageObjects/expensesPage";

const getTestData = () => {
  const brand = "Audi";
  const model = "TT";
  const initialMileageValue = Cypress._.random(100, 999);
  const expenseMileageValue = Cypress._.random(initialMileageValue + 1, 1000);
  const liters = String(Cypress._.random(5, 200));
  const totalCost = String(Cypress._.random(5, 200));

  return {
    brand,
    model,
    carName: `${brand} ${model}`,
    initialMileage: String(initialMileageValue),
    expenseMileage: String(expenseMileageValue),
    liters,
    totalCost,
    totalCostPattern: new RegExp(`^${totalCost}(?:\\.00)? USD$`),
  };
};

describe("Garage and fuel expenses", () => {
  beforeEach(() => {
    cy.visit("/", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });

    cy.login(Cypress.env("userEmail"), Cypress.env("userPassword"));
  });

  it("adds a car and fuel expense", () => {
    const {
      brand,
      model,
      carName,
      initialMileage,
      expenseMileage,
      liters,
      totalCost,
      totalCostPattern,
    } = getTestData();

    garagePage.visitGaragePage();

    garagePage.addCar(brand, model, initialMileage);
    garagePage.assertCarIsAdded(carName);

    garagePage.openAddFuelExpenseModal(carName);
    expensesPage.addFuelExpense(carName, expenseMileage, liters, totalCost);
    expensesPage.assertFuelExpenseIsAdded(expenseMileage, liters, totalCostPattern);

    garagePage.removeCar(carName);
  });
});

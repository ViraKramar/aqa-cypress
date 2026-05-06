/// <reference types="cypress" />

import { expensesPage } from "../pageObjects/expensesPage";
import { garagePage } from "../pageObjects/garagePage";

const basicAuth = {
  username: "guest",
  password: "welcome2qauto",
};

const visitWithBasicAuth = (url = "/") => {
  cy.visit(url, {
    auth: basicAuth,
  });
};

const getTestData = () => {
  const brand = "Ford";
  const model = "Focus";
  const initialMileageValue = Cypress._.random(100, 999);

  return {
    brand,
    model,
    carName: `${brand} ${model}`,
    initialMileage: String(initialMileageValue),
  };
};

describe("Cars and expenses API", () => {
  beforeEach(() => {
    visitWithBasicAuth();

    cy.login(Cypress.env("userEmail"), Cypress.env("userPassword"));
  });

  it("creates a car via UI and gets created car id from API interception", () => {
    const { brand, model, carName, initialMileage } = getTestData();

    cy.intercept("POST", "**/api/cars").as("createCar");

    garagePage.visitGaragePage();
    garagePage.addCar(brand, model, initialMileage);

    cy.wait("@createCar").then(({ response }) => {
      expect(response.statusCode).to.eq(201);

      const createdCar = response.body.data;
      const carId = createdCar.id;

      expect(carId).to.exist;
      expect(carId).to.be.a("number");
      expect(createdCar.brand).to.eq(brand);
      expect(createdCar.model).to.eq(model);
      expect(createdCar.initialMileage).to.eq(Number(initialMileage));

      cy.request("GET", "/api/cars").then((carsResponse) => {
        expect(carsResponse.status).to.eq(200);

        const createdCarFromList = carsResponse.body.data.find((car) => car.id === carId);

        expect(createdCarFromList).to.exist;
        expect(createdCarFromList.id).to.eq(carId);
        expect(createdCarFromList.brand).to.eq(brand);
        expect(createdCarFromList.model).to.eq(model);
        expect(createdCarFromList.initialMileage).to.eq(Number(initialMileage));
      });

      garagePage.assertCarIsAdded(carName);
      garagePage.removeCar(carName);
    });
  });

  it("creates an expense via API and validates it in UI", () => {
    const { brand, model, carName, initialMileage } = getTestData();
    const expenseMileage = String(Number(initialMileage) + Cypress._.random(1, 100));
    const liters = String(Cypress._.random(5, 200));
    const totalCost = String(Cypress._.random(5, 200));
    const reportedAt = new Date().toISOString().split("T")[0];
    const totalCostPattern = new RegExp(`^${totalCost}(?:\\.00)? USD$`);

    cy.intercept("POST", "**/api/cars").as("createCar");

    garagePage.visitGaragePage();
    garagePage.addCar(brand, model, initialMileage);

    cy.wait("@createCar").then(({ response }) => {
      expect(response.statusCode).to.eq(201);

      const carId = response.body.data.id;

      expect(carId).to.exist;
      expect(carId).to.be.a("number");

      cy.createExpense({
        carId,
        reportedAt,
        mileage: Number(expenseMileage),
        liters: Number(liters),
        totalCost: Number(totalCost),
      }).then((expenseResponse) => {
        expect(expenseResponse.status).to.eq(200);

        const createdExpense = expenseResponse.body.data;

        expect(createdExpense.id).to.exist;
        expect(createdExpense.carId).to.eq(carId);
        expect(createdExpense.reportedAt).to.eq(reportedAt);
        expect(createdExpense.mileage).to.eq(Number(expenseMileage));
        expect(createdExpense.liters).to.eq(Number(liters));
        expect(createdExpense.totalCost).to.eq(Number(totalCost));
      });

      expensesPage.visitExpensesPageByCarId(carId, basicAuth);
      expensesPage.assertFuelExpenseIsAdded(carName, expenseMileage, liters, totalCostPattern);

      garagePage.removeCar(carName);
    });
  });
});

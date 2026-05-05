class ExpensesPage {
  visitExpensesPageByCarId(carId, auth) {
    cy.visit(`/panel/expenses?carId=${carId}`, {
      auth,
    });
  }

  getAddExpenseModal() {
    return cy.get("app-add-expense-modal");
  }

  getExpenseCarSelect() {
    return cy.get("#addExpenseCar");
  }

  getExpenseMileageInput() {
    return cy.get("#addExpenseMileage");
  }

  getExpenseLitersInput() {
    return cy.get("#addExpenseLiters");
  }

  getExpenseTotalCostInput() {
    return cy.get("#addExpenseTotalCost");
  }

  getAddButton() {
    return cy.contains("button", "Add");
  }

  getAddExpenseModalTitle() {
    return cy.contains("h4", "Add an expense");
  }

  getReportDateLabel() {
    return cy.contains("label", "Report date");
  }

  getNumberOfLitersLabel() {
    return cy.contains("label", "Number of liters");
  }

  getTotalCostLabel() {
    return cy.contains("label", "Total cost");
  }

  getFuelExpenseAddedAlert() {
    return cy.contains(".alert-success", "Fuel expense added");
  }

  getFuelExpensesPageTitle() {
    return cy.contains("h1", "Fuel expenses");
  }

  getCarNameCell(carName) {
    return cy.contains(carName);
  }

  getMileageCell(mileage) {
    return cy.contains("td", mileage);
  }

  getLitersCell(liters) {
    return cy.contains("td", `${liters}L`);
  }

  getTotalCostCell(totalCostPattern) {
    return cy.contains("td", totalCostPattern);
  }

  assertAddExpenseModalOpened(carName) {
    this.getAddExpenseModal().within(() => {
      this.getAddExpenseModalTitle().should("be.visible");
      this.getExpenseCarSelect().should("be.visible").and("contain.text", carName);
      this.getExpenseMileageInput().should("be.visible").and("not.have.value", "");

      this.getReportDateLabel().should("be.visible");
      this.getNumberOfLitersLabel().should("be.visible");
      this.getTotalCostLabel().should("be.visible");
    });
  }

  fillExpenseForm(mileage, liters, totalCost) {
    this.getAddExpenseModal().within(() => {
      this.getExpenseMileageInput().clear().type(mileage);
      this.getExpenseLitersInput().clear().type(liters);
      this.getExpenseTotalCostInput().clear().type(totalCost);
    });
  }

  submitExpenseForm() {
    this.getAddExpenseModal().within(() => {
      this.getAddButton().should("not.be.disabled").click();
    });

    this.getFuelExpenseAddedAlert().should("be.visible");
  }

  addFuelExpense(carName, mileage, liters, totalCost) {
    this.assertAddExpenseModalOpened(carName);
    this.fillExpenseForm(mileage, liters, totalCost);
    this.submitExpenseForm();
  }

  assertFuelExpenseIsAdded(carName, mileage, liters, totalCostPattern) {
    cy.url().should("include", "/panel/expenses");
    this.getFuelExpensesPageTitle().should("be.visible");
    this.getCarNameCell(carName).should("be.visible");
    this.getMileageCell(mileage).should("be.visible");
    this.getLitersCell(liters).should("be.visible");
    this.getTotalCostCell(totalCostPattern).should("be.visible");
  }
}

export const expensesPage = new ExpensesPage();

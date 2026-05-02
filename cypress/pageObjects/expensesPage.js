class ExpensesPage {
  addFuelExpense(carName, mileage, liters, totalCost) {
    cy.get("app-add-expense-modal").within(() => {
      cy.contains("h4", "Add an expense").should("be.visible");

      cy.get("#addExpenseCar").should("be.visible").and("contain.text", carName);
      cy.get("#addExpenseMileage").should("be.visible").and("not.have.value", "");

      cy.contains("label", "Report date").should("be.visible");
      cy.contains("label", "Number of liters").should("be.visible");
      cy.contains("label", "Total cost").should("be.visible");

      cy.get("#addExpenseMileage").clear().type(mileage);
      cy.get("#addExpenseLiters").clear().type(liters);
      cy.get("#addExpenseTotalCost").clear().type(totalCost);

      cy.contains("button", "Add").should("not.be.disabled").click();
    });

    cy.contains(".alert-success", "Fuel expense added").should("be.visible");
  }

  assertFuelExpenseIsAdded(mileage, liters, totalCostPattern) {
    cy.url().should("include", "/panel/expenses");
    cy.contains("h1", "Fuel expenses").should("be.visible");
    cy.contains("td", mileage).should("be.visible");
    cy.contains("td", `${liters}L`).should("be.visible");
    cy.contains("td", totalCostPattern).should("be.visible");
  }
}

export const expensesPage = new ExpensesPage();

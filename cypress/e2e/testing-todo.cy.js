Cypress.Commands.add("createDefaultTodos", () => {
  cy.get(".new-todo").type("Make every second count").type("{enter}");
  cy.get(".new-todo").type("Invest in yourself").type("{enter}");
  cy.get(".new-todo").type("Learn Cypress").type("{enter}");
});

describe("Testing the to-do items", () => {
  let TODO_ITEM_ONE = "Make every second count";
  let TODO_ITEM_TWO = "Invest in yourself";
  let TODO_ITEM_THREE = "Learn Cypress";

  beforeEach(() => {
    cy.visit("http://localhost:8888/#/");
  });

  it("displays items", () => {
    cy.get(".new-todo").type(TODO_ITEM_ONE).type("{enter}");
    cy.get(".new-todo").type(TODO_ITEM_TWO).type("{enter}");
    cy.get(".new-todo").type(TODO_ITEM_THREE).type("{enter}");

    // Ensure that the items render and validate the text
    cy.get(".todo-list").should("contain", TODO_ITEM_ONE);
    cy.get(".todo-list").should("contain", TODO_ITEM_TWO);
    cy.get(".todo-list").should("contain", TODO_ITEM_THREE);
  });

  context("Mark all as completed", function () {
    beforeEach(function () {
      cy.visit("http://localhost:8888/#/");
      cy.createDefaultTodos()
        .as("todos")
        .then(() => {
          // Ensure that todo creation is complete before proceeding
          // to the test cases in this context
          cy.get(".todo-list").should("contain", TODO_ITEM_ONE);
          cy.get(".todo-list").should("contain", TODO_ITEM_TWO);
          cy.get(".todo-list").should("contain", TODO_ITEM_THREE);
        });
    });

    it("should allow me to mark 'Learn Cypress' as complete", function () {
      // Find the 'Learn Cypress' item and mark it as complete
      cy.contains("label", "Learn Cypress").parent().find(".toggle").check();
    }); // Add the missing closing bracket for this test case

    it("should ensure 'Learn Cypress' is marked as complete in the todos list", function () {
      // Mark 'Learn Cypress' as complete (similar to the previous test case)
      cy.contains("label", "Learn Cypress").parent().find(".toggle").check();

      // Get the todos list and validate that 'Learn Cypress' is marked complete
      cy.get(".todo-list")
        .contains("li", "Learn Cypress")
        .should("have.class", "completed");
    });
  });
});

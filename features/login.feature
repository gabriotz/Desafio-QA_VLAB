Feature: Login

  Background:
    Given the user is on the login page

  Scenario: Successful login with valid credentials
    When the user enters username "admin" and password "admin123"
    And clicks the login button
    Then the user should be redirected to the dashboard

  Scenario: Login with wrong password
    When the user enters username "admin" and password "wrongpassword"
    And clicks the login button
    Then an error message should be visible

  Scenario: Login with non-existent user
    When the user enters username "ghost" and password "anything"
    And clicks the login button
    Then an error message should be visible

  Scenario: Login with empty fields
    When the user clicks the login button without filling any field
    Then an error message should be visible

  Scenario: Access dashboard without authentication
    When the user tries to access "/dashboard" directly
    Then the user should be redirected to the login page
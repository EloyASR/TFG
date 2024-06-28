Feature: Prize creation with a COMPANY user

Scenario: The user is a company with no prizes created and create a simple prize
    Given A company user without prizes
    When The user log in and create a prize
    Then The user is redirected to prizes list and the prize appear in the list of prizes
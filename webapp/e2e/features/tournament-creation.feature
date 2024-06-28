Feature: Prize creation with a COMPANY user

Scenario: The user is an admin with no tournaments created and create a simple tournament
    Given An admin user without tournaments
    When The user log in and create a tournament
    Then The user is redirected to tournaments list and the tournament appear in the list of tournaments
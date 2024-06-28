Feature: Prize creation with a COMPANY user

Scenario: The user is a company with no tournaments sponsored and decide to sponsor a tournament
    Given A company user without tournaments sponsored and an admin user with a tournament
    When The user log in and sponsor a tournament with a prize
    Then The admin of the tournament review the sponsor and accept it and later he remove it
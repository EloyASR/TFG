Feature: Login con usuario de tipo USER

Scenario: The user is not logged in the site
    Given An unlogged user
    When Fill the form of Login click Login button and is redirected to profile
    Then The user is logged in and he log out
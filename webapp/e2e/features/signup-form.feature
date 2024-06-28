Feature: Login con usuario de tipo USER

Scenario: The user is not signed up in the site
    Given An unsigned user
    When The user fill the form of Signup click the Sign Up button
    Then The user is redirected to Login
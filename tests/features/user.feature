Feature: Reqres Users API

  @create @REQ-POST-001
  Scenario: REQ-POST-001 - Create a new user successfully
    When I create a user with name "Ali" and job "QA Engineer"
    Then the response status should be 201
    And the response should contain name "Ali"
    And the response should contain job "QA Engineer"
    And the response should contain a generated user ID
    And the response should contain a creation timestamp

  @create @negative @REQ-POST-002
  Scenario: REQ-POST-002 - Create a user without a name
    When I create a user with payload:
      """
      {
        "job": "QA Engineer"
      }
      """
    Then the response status should be 201
    And the response should not contain field "name"
    And the response should contain job "QA Engineer"

  @create @negative @REQ-POST-003
  Scenario: REQ-POST-003 - Create a user with empty name and job
    When I create a user with payload:
      """
      {
        "name": "",
        "job": ""
      }
      """
    Then the response status should be 201
    And the response should contain name ""
    And the response should contain job ""

  @get @REQ-GET-001
  Scenario: REQ-GET-001 - Get an existing user successfully
    When I request user with ID 2
    Then the response status should be 200
    And the response should contain user ID 2
    And the response should contain a valid email address

  @get @REQ-GET-002
  Scenario: REQ-GET-002 - Get all users
    When I request all users
    Then the response status should be 200
    And the response should contain a list of users

  @get @negative @REQ-GET-003
  Scenario: REQ-GET-003 - Get a user that does not exist
    When I request user with ID 9999
    Then the response status should be 404

  @update @REQ-PUT-001
  Scenario: REQ-PUT-001 - Update an existing user successfully
    When I update user with ID 2 to name "Ali Updated" and job "Senior QA Engineer"
    Then the response status should be 200
    And the response should contain name "Ali Updated"
    And the response should contain job "Senior QA Engineer"
    And the response should contain an update timestamp

  @update @negative @REQ-PUT-002
  Scenario: REQ-PUT-002 - Update a user with a missing name
    When I update user with payload for ID 2:
      """
      {
        "job": "Senior QA Engineer"
      }
      """
    Then the response status should be 200
    And the response should not contain field "name"
    And the response should contain job "Senior QA Engineer"
    And the response should contain an update timestamp

  @update @negative @REQ-PUT-003
  Scenario: REQ-PUT-003 - Update a user with empty name and job
    When I update user with payload for ID 2:
      """
      {
        "name": "",
        "job": ""
      }
      """
    Then the response status should be 200
    And the response should contain name ""
    And the response should contain job ""
    And the response should contain an update timestamp

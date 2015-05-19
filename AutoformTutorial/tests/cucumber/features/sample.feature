Feature: One-liner description of this feature

  As a [role]
  I want [feature]
  So that [benefit]

  The story above is to set context for the reader. It doesn't actually have any impact on the test
  itself. The phrases inside the scenarios are ties to test code using regex, which you can see in
  /tests/features/step_definitions/steps.js

  In this textual part of the file, you can include context about this feature, you can add links to
  external documents and whatever is needed to create the full specification.

  # The background will be run for every scenario
  Background:
    Given I am a new user

  # This scenario will run as part of the Meteor dev cycle because it has the @dev tag
  @dev
  Scenario:
    When I navigate to "/"
    Then I should see the title "Autoform"
    And I should not see button "Insert1"
    And I should see Category drop down list
  @dev
  Scenario:
    When I navigate to "/"
    Then I should see button "Next"
    And I click on button "Next" and should see "Random Page"
    #And I should see h1 "Random Page"

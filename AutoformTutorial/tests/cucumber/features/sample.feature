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
#  Background:
#    Given I am a new user

  # This scenario will run as part of the Meteor dev cycle because it has the @dev tag

  Scenario:
    When I navigate to "/"
    Then I should see the title "Autoform"
    And I should not see button "Insert1"
    And I should see Category drop down list


  Scenario:
    When I navigate to "/"
    Then I should see button "Next"
    And I click on button "Next" and should see "Random Page"
    #And I should see h1 "Random Page"

#  @dev
  Scenario: Completing and submitting a form
    Given I navigate to "/"
    And I am an authenticated user
    Then I should see header "Add Post"
    And I should see label "Title"
    And The input closest to "Title" should be "random post"
#    And I should see label "Content"
#    And I should fill the closes text area with "random content"
#    And I should see label "TagsT"
#    And I should fill the closest input field with "randomTag1, randomTag2, randomTag3
    And I should click button "Insert"
    And The input closest to "Title" should be ""
    And I should remove user I created
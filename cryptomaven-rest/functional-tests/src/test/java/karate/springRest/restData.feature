Feature: Thorough Testing of Spring Data REST APIs

  Background:
    * url 'http://localhost:8080/'

  # Test - Retrieve All Users (GET)
  Scenario: Get All Users
    Given path 'rest/users'
    When method get
    Then status 200
    * def users = response
    * match users._embedded.users != null
    * match users.page.size == '#number'
    * match users.page.totalPages == '#number'
    * match users.page.number == '#number'
    * print users

  # Test - Retrieve Single User by ID (GET)
  Scenario: Get Single User by ID
    Given path 'rest/users/10'
    When method get
    Then status 200
    * def user = response
    * match user.username == 'thomas1@gmail.com'
    * match user.email == 'thomas1@gmail.com'
    * match user._links.self.href == 'http://localhost:8080/rest/users/10'
    * print user

  # Test - Create New User (POST)
  @ignore
  Scenario: Create New User
    Given path 'rest/users'
    And request
  """
  {
  "username": "newuser@gmail.com",
  "password": "newpassword",
  "firstName": "New",
  "lastName": "User",
  "userType": 1,
  "email": "newuser@gmail.com",
  "isActive": 1
  }
  """
    When method post
    Then status 201
    * def newUser = response
    * match newUser.username == 'newuser@gmail.com'
    * print newUser

  # Test - Update Existing User (PUT)
  @ignore
  Scenario: Update Existing User
    Given path 'rest/users/10'
    And request
    """
    {
    "userId":10
  "firstName": "Updated",
  "lastName": "User"
  }
    """
    When method put
    Then status 201
    * def updatedUser = response
    * match updatedUser.firstName == 'Updated'
    * match updatedUser.lastName == 'User'
    * print updatedUser

  # Test - Delete User (DELETE)
  @ignore
  Scenario: Delete User
    Given path 'rest/users/10'
    When method delete
    Then status 204
    * print 'User deleted successfully'

  # Test - Verify User Deletion (GET)
  @ignore
  Scenario: Verify User Deletion
    Given path 'rest/users/10'
    When method get
    Then status 404
    * print 'User not found, deletion verified'

  # Test - Retrieve User Addresses
  Scenario: Get User Addresses
    Given path 'rest/users/11/addresses'
    When method get
    Then status 200
    * def addresses = response
    * match addresses._embedded.addresses != null
    * print addresses

  # Test - Retrieve User Roles
  Scenario: Get User Roles
    Given path 'rest/users/11/roles'
    When method get
    Then status 200
    * def roles = response
    * match roles._embedded.roles != null
    * print roles

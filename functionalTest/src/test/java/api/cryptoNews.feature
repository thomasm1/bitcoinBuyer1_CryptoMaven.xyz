Feature:  CryptoNews

  Background:
    * url 'http://localhost:3000/'

  Scenario: get all preliminary articles  
 
    Given path '/cryptoNews/' 
    When method get
    Then status 200
     
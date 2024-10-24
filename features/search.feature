Feature: Search a course
    Scenario: Successful ticket purchase
        Given user is on "/client/index.php" page
        When user clicks on the line date, day, second in the list
        When user selects the first movie and clicks on the session time 
        When user selects a row 2 and clicks on the place 4
        When user clicks on the Book button
        Then user sees the row and place of reservation "2/4"

    Scenario: Successful VIP ticket purchase
        Given user is on "/client/index.php" page
        When user clicks on the line date, day, Saturday in the list
        When user selects the third movie and clicks on the session time
        When user selects a row 1 and clicks on the place 1
        When user clicks on the Book button
        Then user sees the ticket price "1000"

    Scenario: Unsuccessful VIP ticket purchase
        Given user is on "/client/index.php" page
        When user clicks on the line date, day, Saturday in the list
        When user selects the third movie and clicks on the session time 
        When user selects a row 1 and clicks on the place 10
        When user clicks on the Book button
        When the user clicks on the Get booking code button
        When returns to the "/client/index.php" page
        When user clicks on the line date, day, Saturday in the list
        When user selects the third movie and clicks on the session time         
        Then user clicks on an already reserved seat


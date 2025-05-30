### User Input Validation (Real-Time)
```
IF THE USER ENTERED AND THEN LEFT FIRST NAME FIELD
    CALL CHECK-FIRST-NAME
ENDIF

IF THE USER ENTERED AND THEN LEFT LAST NAME FIELD
    CALL CHECK-LAST-NAME
ENDIF

IF THE USER ENTERED AND THEN LEFT EMAIL FIELD
    CALL CHECK-EMAIL
ENDIF

IF THE USER ENTERED AND THEN LEFT PHONE FIELD
    CALL CHECK-PHONE
ENDIF

IF THE USER ENTERED AND THEN LEFT PASSWORD FIELD
    CALL CHECK-PASSWORD
ENDIF

IF THE USER ENTERED AND THEN LEFT CONFIRM PASSWORD FIELD
    CALL CHECK-CONFIRM-PASSWORD
ENDIF
```

---

### Handling Button Clicks
```
IF the REVIEW BUTTON was chosen
    CALL GET-DATA
    DISPLAY REVIEW MODAL
ENDIF

IF the SUBMIT BUTTON was chosen
    IF NO ERROR CONDITIONS
        DISPLAY THANK YOU MESSAGE
    ELSE
        DISPLAY "FIX YOUR ERRORS" MESSAGE
    ENDIF
ENDIF

IF the RESET BUTTON was chosen
    CLEAR THE FORM
ENDIF
```

---

### Retrieving and Displaying Data (Review Modal)
```
GET-DATA

RETRIEVE FORM DATA

LOOP THROUGH EVERY DATA ITEM UNTIL NONE LEFT
    CHECK THE DATA TYPE
    
    CASE OF A TEXT INPUT, EMAIL, PHONE, PASSWORD:
        DISPLAY DATA NAME
        DISPLAY DATA TYPE
        DISPLAY DATA VALUE
    END CASE
    
    CASE OF A CHECKBOX TYPE:
        IF THIS ITEM WAS CHECKED
            CALL HEADING-CHECK
            DISPLAY DATA NAME
            DISPLAY DATA TYPE
            DISPLAY "CHECKED"
        ELSE
            CALL HEADING-CHECK
            DISPLAY DATA NAME
            DISPLAY DATA TYPE
            DISPLAY "NOT CHECKED"
        ENDIF
    END CASE
    
    CASE OF A RADIO BUTTON:
        IF THIS RADIO BUTTON WAS CHOSEN
            CALL HEADING-CHECK
            DISPLAY VALUE OF THE BUTTON
        ENDIF
    END CASE

    CASE OF A BUTTON:
        DO NOTHING
    END CASE

    DEFAULT CASE:
        DISPLAY VALUE
    END CASE
END LOOP

IF FOOTER FLAG WAS SET
    DISPLAY FOOTER
ENDIF

END GET-DATA
```

---

### Input Validation Functions
```
CHECK-FIRST-NAME
    IF First Name is too short (less than 2 chars)
        DISPLAY "NAME TOO SHORT"
        SET ERROR CONDITION
    ELSE IF THE NAME HAS INVALID CHARACTERS
        DISPLAY "NAME INVALID, ONLY ALLOW LETTERS"
        SET ERROR CONDITION
    ELSE
        REMOVE ERROR MESSAGE
    ENDIF
END CHECK-FIRST-NAME

CHECK-LAST-NAME
    SAME LOGIC AS CHECK-FIRST-NAME
END CHECK-LAST-NAME

CHECK-EMAIL
    IF EMAIL FORMAT IS INVALID
        DISPLAY "INVALID EMAIL FORMAT"
        SET ERROR CONDITION
    ELSE
        REMOVE ERROR MESSAGE
    ENDIF
END CHECK-EMAIL

CHECK-PHONE
    IF PHONE NUMBER IS NOT 10 DIGITS
        DISPLAY "INVALID PHONE NUMBER"
        SET ERROR CONDITION
    ELSE
        REMOVE ERROR MESSAGE
    ENDIF
END CHECK-PHONE

CHECK-PASSWORD
    IF PASSWORD IS LESS THAN 8 CHARACTERS OR MISSING REQUIRED ELEMENTS
        DISPLAY "PASSWORD MUST CONTAIN LETTER, NUMBER, SPECIAL CHAR"
        SET ERROR CONDITION
    ELSE
        REMOVE ERROR MESSAGE
    ENDIF
END CHECK-PASSWORD

CHECK-CONFIRM-PASSWORD
    IF PASSWORD DOES NOT MATCH CONFIRM PASSWORD
        DISPLAY "PASSWORDS DO NOT MATCH"
        SET ERROR CONDITION
    ELSE
        REMOVE ERROR MESSAGE
    ENDIF
END CHECK-CONFIRM-PASSWORD
```

---

### Review Modal Handling
```
HEADING-CHECK
    IF THIS IS THE FIRST DATA ITEM
        DISPLAY A HEADING
        SET FOOTER-NEEDED-FLAG
    ENDIF
END HEADING-CHECK
```



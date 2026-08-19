# Sauce Demo Login Functionality Test Plan

## Application Overview

The Sauce Demo application (https://www.saucedemo.com/) is a sample e-commerce web application commonly used for testing and QA practice. This test plan focuses on comprehensive testing of the login functionality, including positive scenarios, negative scenarios, validation errors, edge cases, and error message handling. The login form consists of two input fields (Username and Password) and a Login button. The system has six valid test users with different account states, and all users share the same password (secret_sauce).

## Test Scenarios

### 1. Login Functionality Test Suite

**Seed:** `tests/seed.spec.ts`

#### 1.1. TC-001: Successful Login with Valid Credentials - Standard User

**File:** `tests/login-functionality/tc-001-successful-login-standard-user.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed with username field, password field, and Login button visible
  2. Click on the Username field
    - expect: Username field is focused and ready for input
  3. Enter 'standard_user' in the Username field
    - expect: Text 'standard_user' is entered in the Username field
  4. Click on the Password field
    - expect: Password field is focused and ready for input
  5. Enter 'secret_sauce' in the Password field
    - expect: Password field contains the entered password (displayed as dots/asterisks for security)
  6. Click the Login button
    - expect: User is redirected to the inventory page (URL changes to https://www.saucedemo.com/inventory.html
    - expect: Page shows the list of products available for purchase
    - expect: No error messages are displayed

#### 1.2. TC-002: Successful Login with Valid Credentials - Problem User

**File:** `tests/login-functionality/tc-002-successful-login-problem-user.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter 'problem_user' in the Username field
    - expect: Username field displays 'problem_user'
  3. Enter 'secret_sauce' in the Password field
    - expect: Password field is filled with the password
  4. Click the Login button
    - expect: User is redirected to the inventory page with URL https://www.saucedemo.com/inventory.html
    - expect: Inventory page loads successfully (though products may render with visual glitches if this is a problem_user account)

#### 1.3. TC-003: Invalid Password Error - Valid Username with Wrong Password

**File:** `tests/login-functionality/tc-003-invalid-password.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter 'standard_user' in the Username field
    - expect: Username field displays 'standard_user'
  3. Enter 'wrong_password' in the Password field
    - expect: Password field is filled with the incorrect password
  4. Click the Login button
    - expect: User remains on the login page (URL stays as https://www.saucedemo.com/)
    - expect: An error message 'Epic sadface: Username and password do not match any user in this service' is displayed
    - expect: The error message is visible to the user (typically highlighted in red)

#### 1.4. TC-004: Invalid Username Error - Non-existent Username with Valid Password

**File:** `tests/login-functionality/tc-004-invalid-username.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter 'nonexistent_user' in the Username field
    - expect: Username field displays 'nonexistent_user'
  3. Enter 'secret_sauce' in the Password field
    - expect: Password field is filled with the valid password
  4. Click the Login button
    - expect: User remains on the login page (URL stays as https://www.saucedemo.com/)
    - expect: An error message 'Epic sadface: Username and password do not match any user in this service' is displayed

#### 1.5. TC-005: Empty Username Field Error - Password Provided but Username Empty

**File:** `tests/login-functionality/tc-005-empty-username.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Leave the Username field empty (do not enter any text)
    - expect: Username field remains empty
  3. Click on the Password field
    - expect: Password field is focused
  4. Enter 'secret_sauce' in the Password field
    - expect: Password field is filled with text
  5. Click the Login button
    - expect: User remains on the login page
    - expect: An error message 'Epic sadface: Username is required' is displayed
    - expect: The error message clearly indicates that the Username field is mandatory

#### 1.6. TC-006: Empty Password Field Error - Username Provided but Password Empty

**File:** `tests/login-functionality/tc-006-empty-password.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter 'standard_user' in the Username field
    - expect: Username field displays 'standard_user'
  3. Leave the Password field empty (do not enter any text)
    - expect: Password field remains empty
  4. Click the Login button
    - expect: User remains on the login page
    - expect: An error message 'Epic sadface: Password is required' is displayed
    - expect: The error message clearly indicates that the Password field is mandatory

#### 1.7. TC-007: Both Fields Empty Error - Neither Username nor Password Provided

**File:** `tests/login-functionality/tc-007-both-fields-empty.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed with both fields empty
  2. Do not enter any text in either the Username or Password field
    - expect: Both fields remain empty
  3. Click the Login button
    - expect: User remains on the login page
    - expect: An error message is displayed indicating missing required field(s). Expected message: 'Epic sadface: Username is required' (system validates username first before password)

#### 1.8. TC-008: Locked Out User Error - Valid Credentials for Locked Account

**File:** `tests/login-functionality/tc-008-locked-out-user.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter 'locked_out_user' in the Username field
    - expect: Username field displays 'locked_out_user'
  3. Enter 'secret_sauce' in the Password field
    - expect: Password field is filled with the valid password for this user
  4. Click the Login button
    - expect: User remains on the login page (URL stays as https://www.saucedemo.com/)
    - expect: An error message 'Epic sadface: Sorry, this user has been locked out.' is displayed
    - expect: The error message clearly indicates the account is locked and login has been denied

#### 1.9. TC-009: Case Sensitivity Test - Uppercase Username

**File:** `tests/login-functionality/tc-009-case-sensitivity-uppercase.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter 'STANDARD_USER' (all uppercase) in the Username field
    - expect: Username field displays 'STANDARD_USER'
  3. Enter 'secret_sauce' in the Password field
    - expect: Password field is filled correctly
  4. Click the Login button
    - expect: User remains on the login page (URL stays as https://www.saucedemo.com/)
    - expect: An error message 'Epic sadface: Username and password do not match any user in this service' is displayed
    - expect: This confirms that usernames are case-sensitive and the system does not accept uppercase variations

#### 1.10. TC-010: Mixed Case Username Test

**File:** `tests/login-functionality/tc-010-mixed-case-username.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter 'Standard_User' (mixed case) in the Username field
    - expect: Username field displays 'Standard_User'
  3. Enter 'secret_sauce' in the Password field
    - expect: Password field is filled correctly
  4. Click the Login button
    - expect: User remains on the login page
    - expect: An error message 'Epic sadface: Username and password do not match any user in this service' is displayed
    - expect: This confirms that the system requires exact case matching for usernames

#### 1.11. TC-011: Special Characters in Username - Username with Symbols

**File:** `tests/login-functionality/tc-011-special-characters-username.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter 'standard_user@#$' in the Username field
    - expect: Username field displays 'standard_user@#$' (special characters may or may not be visible depending on browser)
  3. Enter 'secret_sauce' in the Password field
    - expect: Password field is filled correctly
  4. Click the Login button
    - expect: User remains on the login page
    - expect: An error message 'Epic sadface: Username and password do not match any user in this service' is displayed
    - expect: Special characters in the username do not cause validation errors, but result in no match found

#### 1.12. TC-012: Password Case Sensitivity - Uppercase Password

**File:** `tests/login-functionality/tc-012-password-case-sensitivity.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter 'standard_user' in the Username field
    - expect: Username field displays 'standard_user'
  3. Enter 'SECRET_SAUCE' (all uppercase) in the Password field
    - expect: Password field is filled with the uppercase password
  4. Click the Login button
    - expect: User remains on the login page
    - expect: An error message 'Epic sadface: Username and password do not match any user in this service' is displayed
    - expect: This confirms that passwords are also case-sensitive

#### 1.13. TC-013: Whitespace - Leading Spaces in Username

**File:** `tests/login-functionality/tc-013-whitespace-leading-spaces.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter '  standard_user' (with two leading spaces) in the Username field
    - expect: Username field displays text with leading spaces
  3. Enter 'secret_sauce' in the Password field
    - expect: Password field is filled correctly
  4. Click the Login button
    - expect: User remains on the login page
    - expect: An error message is displayed indicating credentials do not match
    - expect: This tests how the system handles leading whitespace in usernames

#### 1.14. TC-014: Error Message Persistence - Error Message Remains Visible After Failed Login

**File:** `tests/login-functionality/tc-014-error-message-persistence.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed with no error messages
  2. Enter 'standard_user' in the Username field
    - expect: Username field displays 'standard_user'
  3. Enter 'wrong_password' in the Password field
    - expect: Password field is filled with the incorrect password
  4. Click the Login button
    - expect: An error message 'Epic sadface: Username and password do not match any user in this service' is displayed
  5. Wait for 3 seconds without performing any action
    - expect: The error message remains visible on the page
    - expect: The error message does not auto-dismiss
  6. Click in the Username field
    - expect: The error message remains visible even after clicking in the input field

#### 1.15. TC-015: Error Message Dismissal - Close Button on Error Message

**File:** `tests/login-functionality/tc-015-error-message-dismissal.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter 'standard_user' in the Username field
    - expect: Username field displays 'standard_user'
  3. Enter 'wrong_password' in the Password field
    - expect: Password field is filled with incorrect password
  4. Click the Login button
    - expect: An error message is displayed on the page
  5. Look for and click the close button (X) on the error message if available
    - expect: If a close button exists, clicking it should dismiss the error message
    - expect: If no close button exists, note this as the observed behavior

#### 1.16. TC-016: Login with Performance Glitch User

**File:** `tests/login-functionality/tc-016-performance-glitch-user.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter 'performance_glitch_user' in the Username field
    - expect: Username field displays 'performance_glitch_user'
  3. Enter 'secret_sauce' in the Password field
    - expect: Password field is filled correctly
  4. Click the Login button
    - expect: User is redirected to the inventory page
    - expect: Login is successful (note: page may load slower due to artificial delays on this account type)

#### 1.17. TC-017: Login with Error User

**File:** `tests/login-functionality/tc-017-error-user.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter 'error_user' in the Username field
    - expect: Username field displays 'error_user'
  3. Enter 'secret_sauce' in the Password field
    - expect: Password field is filled correctly
  4. Click the Login button
    - expect: User is redirected to the inventory page
    - expect: Login is successful (this user encounters errors during product page operations)

#### 1.18. TC-018: Login with Visual User

**File:** `tests/login-functionality/tc-018-visual-user.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter 'visual_user' in the Username field
    - expect: Username field displays 'visual_user'
  3. Enter 'secret_sauce' in the Password field
    - expect: Password field is filled correctly
  4. Click the Login button
    - expect: User is redirected to the inventory page
    - expect: Login is successful (this user experiences visual/UI glitches on product pages)

#### 1.19. TC-019: Field Clearing - Clear Filled Username Field

**File:** `tests/login-functionality/tc-019-field-clearing.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter 'standard_user' in the Username field
    - expect: Username field displays 'standard_user'
  3. Triple-click on the Username field to select all text
    - expect: All text in the Username field is selected (highlighted)
  4. Press Delete or Backspace to clear the field
    - expect: Username field is now empty
  5. Try to click the Login button
    - expect: An error message 'Epic sadface: Username is required' is displayed
    - expect: The system properly validates that the field cannot be empty when submitting the form

#### 1.20. TC-020: Rapid Reset - Clear Both Fields After Failed Login and Retry with Valid Credentials

**File:** `tests/login-functionality/tc-020-rapid-reset.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter 'standard_user' in the Username field and 'wrong_password' in the Password field
    - expect: Both fields are filled as specified
  3. Click the Login button
    - expect: An error message is displayed
  4. Clear the Username field by selecting all text and pressing Delete
    - expect: Username field is empty
  5. Clear the Password field by selecting all text and pressing Delete
    - expect: Password field is empty
  6. Enter 'standard_user' in the Username field and 'secret_sauce' in the Password field
    - expect: Both fields are filled with correct credentials
  7. Click the Login button
    - expect: User is redirected to the inventory page
    - expect: Login is successful after clearing the error state and entering correct credentials

#### 1.21. TC-021: Tab Navigation Between Fields

**File:** `tests/login-functionality/tc-021-tab-navigation.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Click on the Username field to focus it
    - expect: Username field is focused (shows focus indicator like border highlight or cursor)
  3. Enter 'standard_user' in the Username field
    - expect: Text 'standard_user' is entered
  4. Press the Tab key
    - expect: Focus moves from Username field to the Password field
    - expect: Password field shows focus indicator
  5. Type 'secret_sauce'
    - expect: Password field now contains the password
  6. Press Tab again
    - expect: Focus moves to the Login button or next focusable element
  7. Press Enter to submit (if focus is on Login button)
    - expect: Login attempt is submitted
    - expect: User is redirected to the inventory page on successful login

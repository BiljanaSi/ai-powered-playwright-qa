class LoginPage {
  constructor(page) {
    this.page = page;

    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    // Use getByText with regex for resilience - locates error message by its semantic content
    // More robust than data-test attribute which can change during UI refactors
    this.errorMessage = page.getByText(/Epic sadface:/);
  }

  async open() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };
import { expect, type Page, type Locator } from "@playwright/test";
let configData: ConfigData = require('../configData/configData.json');
import { ConfigData } from '../configData/ConfigData';
import BasePage from "./basePage";

export default class LoginPage {
    
    private base: BasePage;

    constructor(private page: Page) {
        this.base = new BasePage(page);
    }

    private PageElements = {
        usernameTxb: "//div[contains(@class, 'field-loginform-username')]//input[@id='loginform-username']",
        passwordTxb: "//div[contains(@class, 'field-loginform-password')]//input[@id='loginform-password']",
        loginBtn: "//button[@type='submit']"
    }
    async navigateToTheApp() {
        await this.page.goto(configData.baseUrl);
    }

    async loginBaseUser() {
        await this.enterUserNameAndPassword(configData.username, configData.password);
        await this.clickLoginBtn();
    }
    async enterUserNameAndPassword(username: string, password: string) {
        await this.page.locator(this.PageElements.usernameTxb).waitFor({state: "visible"});
        await this.page.locator(this.PageElements.usernameTxb).click({ modifiers: ['Shift'] });
        await this.page.mouse.down();
        await this.page.mouse.up();
        await this.page.keyboard.insertText(username);
        await this.page.keyboard.press('Shift');
        await this.page.locator(this.PageElements.passwordTxb).waitFor({state: "visible"});
        await this.page.locator(this.PageElements.passwordTxb).click({ modifiers: ['Shift'] });
        await this.page.mouse.down();
        await this.page.mouse.up();
        await this.page.keyboard.press('Shift');
        await this.page.keyboard.type(password);
    }
    async clickLoginBtn() {
        await this.base.waitAndClick(this.PageElements.loginBtn);
    }
}
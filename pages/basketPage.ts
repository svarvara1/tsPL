import { expect, type Page, type Locator } from "@playwright/test";
let configData: ConfigData = require('../configData/configData.json');
import { ConfigData } from '../configData/ConfigData';
import BasePage from "./basePage";

export default class BasketPage {
    
    private base: BasePage;

    constructor(private page: Page) {
        this.base = new BasePage(page);
    }

    private PageElements = {
        errorLbl: "//div[contains(@class, 'site-error')]"
    }
    async assertNoError() {
        await expect(this.page.locator(this.PageElements.errorLbl)).toHaveCount(0);
    }
}
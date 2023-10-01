import { expect, Page } from "@playwright/test";
let configData: ConfigData = require('../configData/configData.json');
import { ConfigData } from '../configData/ConfigData';
import assert from "assert";
import BasePage from "./basePage";

export default class MenuPage {
    private base: BasePage;

    constructor(private page: Page) {
        this.base = new BasePage(page);
    }

    private PageElements = {
        basketBtn: "//li[@id='basketContainer']//a[@id='dropdownBasket']",
        basketGoodTitleLbl: "(//span[contains(@class, 'basket-item-title')])[1]",
        basketGoodPriceLbl: "(//span[contains(@class, 'basket-item-price')])[1]",
        basketPriceLbl: "//span[contains(@class, 'basket_price')]",
        basketCountLbl: "//li[@id='basketContainer']//span[contains(@class, 'basket-count-items')]",
        userBtn: "//a[@id='dropdownUser']//div[contains(@class, 'text-uppercase')]",
        userAvatarBtn: "//a[@id='dropdownUser']//div[contains(@class, 'user-avatar')]",
        goToBasketBtn: "//li[@id='basketContainer']//div[@aria-labelledby='dropdownBasket']//a[contains(@href, 'basket')]",
        loginBtn: "//a[contains(@href, 'login')]",
        clearBasketBtn: "//li[@id='basketContainer']//div[@aria-labelledby='dropdownBasket']//div[contains(@class, 'actionClearBasket')]//a[@role='button']"
    }

    async getBasketSize() {
        let countString = (await this.page.locator(this.PageElements.basketCountLbl).innerText()).valueOf();
        let count = parseInt(countString);
        console.log(`There are ${count} goods in basket`);
        return count;
    }

    async assertItemPrice() {
        let sampleRegEx = new RegExp('[+ 0-9]{3}');
        let sumString = (await this.page.locator(this.PageElements.basketGoodPriceLbl).innerText()).valueOf();
        assert.equal(sampleRegEx.test(sumString!), true);
    }
    async assertTitle() {
        let sampleRegEx = new RegExp('[^\u0000-\u007f]');
        let sumString = (await this.page.locator(this.PageElements.basketGoodTitleLbl).innerText()).valueOf();
        assert.equal(sampleRegEx.test(sumString!), true);
    }
    async assertTotalAmount(quantityDigits: number) {
        let sampleRegEx = new RegExp(`[+ 0-9]{${quantityDigits}}`);
        let sumString = (await this.page.locator(this.PageElements.basketGoodPriceLbl).innerText()).valueOf();
        assert.equal(sampleRegEx.test(sumString!), true);
    }
    async assertBasketSize(expectedSize: string) {
        await expect(this.page.locator(this.PageElements.basketCountLbl)).toContainText(expectedSize, {timeout: 20000});
    }
    async clearBasketIfItIsNotEmpty() {
        let count = await this.getBasketSize();
        console.log(`${count} item in the basket before clearing`);
        if (count!= 0) {
            await this.page.locator(this.PageElements.basketBtn).click();
            await this.page.locator(this.PageElements.clearBasketBtn).click();
        }
    }
    async waitForMenuIsVisible() {
        await this.page.locator(this.PageElements.basketCountLbl).waitFor();
    }
    async goToBasket() {
        await this.page.locator(this.PageElements.basketBtn).click();
        await this.page.locator(this.PageElements.goToBasketBtn).click();
    }
    async clickTheBasketSymbol() {
        //await this.page.locator(this.PageElements.basketBtn).waitFor({state: "visible", timeout: 5000});;
        await this.page.getByTitle('Корзина').click();
    }
    async clickLogin() {
        await this.page.locator(this.PageElements.loginBtn).click();
    }
}
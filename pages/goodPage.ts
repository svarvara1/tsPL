import { expect, Page } from "@playwright/test";
let configData: ConfigData = require('../configData/configData.json');
import { ConfigData } from '../configData/ConfigData';
import BasePage from "./basePage";

export default class GoodsPage {
    private base: BasePage;

    constructor(private page: Page) {
        this.base = new BasePage(page);
    }

    private PageElements = {
        buyGoodWithDiscountBtn: "//div[contains(@class, 'note-list')]//span[contains(@class, 'product_discount')]//ancestor::div[contains(@class, 'hasDiscount')]//div[contains(@class, 'card-body')]//button",
        buyGoodWithoutDiscountBtn: "//div[contains(@class, 'note-list')]//div[(contains(@class, 'note-item')) and not (contains(@class, 'hasDiscount'))]//div[contains(@class, 'card-body')]//button", 
        buyGoodBtn: "//div[contains(@class, 'note-list')]//div[(contains(@class, 'note-item card'))]//div[contains(@class, 'card-body')]//button",
        secondPageBtn: "//a[@data-page-number=2]",
        quantityForGoodWithDiscountTxb: "//div[contains(@class, 'note-list')]//span[contains(@class, 'product_discount')]//ancestor::div[contains(@class, 'hasDiscount')]//div[contains(@class, 'card-body')]//input",
        quantityForGoodWithoutDiscountTxb: "//div[contains(@class, 'note-list')]//div[(contains(@class, 'note-item')) and not (contains(@class, 'hasDiscount'))]//div[contains(@class, 'card-body')]//input"
    }

    async putOneGoodWithoutDiscountIntoBasket() {
        await this.page.locator(`(${this.PageElements.buyGoodWithoutDiscountBtn})[1]`).click();
    }
    async putOneGoodWithDiscountIntoBasket() {
        await this.page.locator(`(${this.PageElements.buyGoodWithDiscountBtn})[1]`).click();
    }
    async countGoodWithDiscount() {
        await this.page.locator(`${this.PageElements.buyGoodWithDiscountBtn}`).count();
    }
    async countGoodWithoutDiscount() {
        await this.page.locator(`${this.PageElements.buyGoodWithoutDiscountBtn}`).count();
    }
    async putSeveralGoodsWithDiscountOneTypeIntoBasket(quantity: number) {
        await this.page.locator(`(${this.PageElements.quantityForGoodWithDiscountTxb})[1]`).fill(quantity.toString());
        await this.base.waitAndClick(`(${this.PageElements.buyGoodWithDiscountBtn})[1]`);
    }
    async putSeveralGoodsWithoutDiscountOneTypeIntoBasket(quantity: number) {
        await this.page.locator(`(${this.PageElements.quantityForGoodWithoutDiscountTxb})[1]`).fill(quantity.toString());
        await this.base.waitAndClick(`(${this.PageElements.buyGoodWithoutDiscountBtn})[1]`);
    }
    async putAnySeveralGoodsIntoBasket(quantity: number) {
        let quantityOnThePage = await this.page.locator(`${this.PageElements.buyGoodBtn}`).count();
        if(quantity> quantityOnThePage) {
            for(let i=1; i<= quantityOnThePage; i++) {
                await this.base.waitAndClick(`(${this.PageElements.buyGoodBtn})[${i}]`);
            }
            await this.base.waitAndClick(this.PageElements.secondPageBtn);
            let numbersToAdd = quantity-quantityOnThePage;
            for (let i=1; i<= numbersToAdd; i++) {
                await this.base.waitAndClick(`(${this.PageElements.buyGoodBtn})[${i}]`);
            }
        }
        else {
            for(let i=1; i<= quantity; i++) {
                await this.base.waitAndClick(`(${this.PageElements.buyGoodBtn})[${i}]`);
            }
        }
        
    }
}
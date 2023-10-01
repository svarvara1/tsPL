import { test, expect, Browser, chromium } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import MenuPage from '../pages/menuPage';
let configData: ConfigData = require('../configData/configData.json');
import { ConfigData } from '../configData/ConfigData';
import GoodsPage from '../pages/goodPage';
import {createLogger} from "winston";
import BasketPage from '../pages/basketPage';


test("Go to the empty basket", async ({page}) => {
    await page.goto(configData.baseUrl);
    const loginPage = new LoginPage(page);
    const menuPage = new MenuPage(page);
    await menuPage.clickLogin();
    await loginPage.loginBaseUser();
    await menuPage.waitForMenuIsVisible();
    await menuPage.clearBasketIfItIsNotEmpty();
    await menuPage.goToBasket();
    await page.close();
})

test("Go to basket with 1 good without discount", async () => {
    let browser: Browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(configData.baseUrl);
    const loginPage = new LoginPage(page);
    const menuPage = new MenuPage(page);
    await menuPage.clickLogin();
    await loginPage.loginBaseUser();
    await menuPage.waitForMenuIsVisible();
    await menuPage.clearBasketIfItIsNotEmpty();
    const goodsPage = new GoodsPage(page);

    await goodsPage.putOneGoodWithoutDiscountIntoBasket();
    await menuPage.assertBasketSize('1');
    await menuPage.clickTheBasketSymbol();
    await menuPage.assertItemPrice();
    await menuPage.assertTotalAmount(3);

    await menuPage.goToBasket();
    console.log(page.url());
    expect(page.url()).toContain('basket');
    const basketPage = new BasketPage(page);
    basketPage.assertNoError();
    await page.close();
})

test("Go to basket with 1 good with discount", async () => {
    let browser: Browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(configData.baseUrl);
    const loginPage = new LoginPage(page);
    const menuPage = new MenuPage(page);
    await menuPage.clickLogin();
    await loginPage.loginBaseUser();
    await menuPage.waitForMenuIsVisible();
    await menuPage.clearBasketIfItIsNotEmpty();
    const goodsPage = new GoodsPage(page);

    await goodsPage.putOneGoodWithDiscountIntoBasket();
    await menuPage.assertBasketSize('1');
    await menuPage.clickTheBasketSymbol();
    await menuPage.assertItemPrice();
    await menuPage.assertTotalAmount(3);

    await menuPage.goToBasket();
    console.log(page.url());
    expect(page.url()).toContain('basket');
    const basketPage = new BasketPage(page);
    basketPage.assertNoError();
    await page.close();
})

test("Go to basket with 9 goods", async () => {
    let browser: Browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(configData.baseUrl);
    const loginPage = new LoginPage(page);
    const menuPage = new MenuPage(page);
    await menuPage.clickLogin();
    await loginPage.loginBaseUser();
    await menuPage.waitForMenuIsVisible();
    await menuPage.clearBasketIfItIsNotEmpty();
    const goodsPage = new GoodsPage(page);

    await goodsPage.putOneGoodWithDiscountIntoBasket();
    await menuPage.assertBasketSize('1');

    await goodsPage.putAnySeveralGoodsIntoBasket(8);    
    await menuPage.assertBasketSize('9');
    await menuPage.clickTheBasketSymbol();
    await menuPage.assertItemPrice();
    await menuPage.assertTotalAmount(3);

    await menuPage.goToBasket();
    console.log(page.url());
    expect(page.url()).toContain('basket');
    const basketPage = new BasketPage(page);
    basketPage.assertNoError();
    await page.close();
})

test("Go to basket with 9 goods 1 type", async () => {
    let browser: Browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(configData.baseUrl);
    const loginPage = new LoginPage(page);
    const menuPage = new MenuPage(page);
    await menuPage.clickLogin();
    await loginPage.loginBaseUser();
    await menuPage.waitForMenuIsVisible();
    await menuPage.clearBasketIfItIsNotEmpty();
    const goodsPage = new GoodsPage(page);

    await goodsPage.putSeveralGoodsWithDiscountOneTypeIntoBasket(9);    
    await menuPage.assertBasketSize('9');
    await menuPage.clickTheBasketSymbol();
    await menuPage.assertItemPrice();
    await menuPage.assertTotalAmount(3);

    await menuPage.goToBasket();
    console.log(page.url());
    expect(page.url()).toContain('basket');
    const basketPage = new BasketPage(page);
    basketPage.assertNoError();
    await page.close();
})
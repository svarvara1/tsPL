import { Page } from "@playwright/test";

export default class BasePage {

    constructor(private page: Page) { }

    async waitAndClick(locator: string) {
        const element = this.page.locator(locator);
        await element.waitFor({
            state: "visible"
        });
        await element.click();
    }

    async navigateTo(link: string) {
        await Promise.all([
            this.page.click(link)
        ])
    }

}
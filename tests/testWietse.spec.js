import { test, expect } from '@playwright/test';

test('test', async ({ page}) => {
    test.setTimeout(3000);
    //New pages
    const context = page.context();
    const pagePromise = context.waitForEvent('page');
    const pagePromise2 = context.waitForEvent('page');

    //Handle popup
    const popupPromise = page.waitForEvent('popup');
    await page.goto('https://portfolio-wietsev.vercel.app/');

    await page.getByRole('heading', { name: 'R_P_S' }).hover();
    await page.getByRole('link', { name: 'Live site' }).click();
    const page1 = await pagePromise;
    await page1.waitForLoadState();
    await page1.getByRole('button', { name: 'R P S', exact: true }).click();

    const page2 = await pagePromise2;
    await page2.waitForLoadState();
    await page2.getByRole('button', { name: 'Rules' }).click();

    const popup = await popupPromise;
    await popup.waitForLoadState();
    await expect(popup.getByRole('heading', {name:'Rock, Paper, Scissors'})).toHaveText('Rock, Paper, Scissors');
});
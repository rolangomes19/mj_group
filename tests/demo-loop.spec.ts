import { expect, test } from '@playwright/test'

test.use({ viewport: { width: 1440, height: 900 } })

const bar = (page: import('@playwright/test').Page) => page.getByRole('toolbar', { name: 'Presenter' })

test('Received from Details, 3 times', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await page.keyboard.press('p')
  await bar(page).getByRole('button', { name: 'Fill basket' }).click()
  for (let i = 0; i < 3; i++) {
    await bar(page).getByRole('button', { name: 'Details', exact: true }).click()
    await expect(page).toHaveURL(/\/quote\/details/)
    await bar(page).getByRole('button', { name: 'Received', exact: true }).click()
    await expect(page).toHaveURL(/\/quote\/received/)
    await page.waitForTimeout(300)
    await expect(page).toHaveURL(/\/quote\/received/)
    await bar(page).getByRole('button', { name: 'Fill basket' }).click()
  }
})

test('demo loop x3 with Shift+R', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await page.keyboard.press('p')
  for (let i = 0; i < 3; i++) {
    await expect(page).toHaveURL('http://localhost:4173/')
    await bar(page).getByRole('button', { name: 'Fill basket' }).click()
    await page.goto('/')
    const search = page.locator('main').getByRole('combobox').first()
    await search.fill('IPE 200')
    await search.press('Enter')
    await expect(page).toHaveURL(/\/catalogue\/structural\/ipe/)
    for (const name of ['Details', 'Received', 'Founder', 'Timeline']) {
      await bar(page).getByRole('button', { name, exact: true }).click()
      await page.waitForTimeout(250)
    }
    await expect(page).toHaveURL(/\/since-1942/)
    await page.keyboard.press('Shift+R')
    await expect(page).toHaveURL('http://localhost:4173/')
  }
  expect(errors).toEqual([])
})

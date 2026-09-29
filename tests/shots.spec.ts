import { expect, test } from '@playwright/test'

const routes = ['/', '/catalogue', '/catalogue/pipes-tubes', '/catalogue/pipes-tubes/shs', '/catalogue/structural/ipe', '/catalogue/plate-sheet/plate', '/quote', '/founder', '/since-1942', '/standards', '/resources']
const sizes = [
  [1440, 900],
  [1920, 1080],
  [1280, 800],
] as const

for (const [w, h] of sizes) {
  test(`screens ${w}x${h}`, async ({ page }) => {
    const errors: string[] = []
    const external: string[] = []
    page.on('pageerror', (e) => errors.push(e.message))
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
    page.on('request', (r) => !r.url().startsWith('http://localhost') && !r.url().startsWith('data:') && external.push(r.url()))
    await page.setViewportSize({ width: w, height: h })
    for (const r of routes) {
      await page.goto(r)
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(800)
      const name = r === '/' ? 'home' : r.slice(1).replaceAll('/', '_')
      await page.screenshot({ path: `shots/${w}x${h}/${name}.png`, fullPage: r === '/' || r.includes('founder') })
      // No horizontal scroll, no sample/pending marks with the presenter toggle off.
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `h-scroll on ${r}`).toBe(true)
      expect(await page.locator('body').innerText()).not.toMatch(/SAMPLE|to confirm|pending/i)
    }
    expect(errors).toEqual([])
    expect(external).toEqual([])
  })
}

test('demo path: search, add, notes-only continue, submit', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  const search = page.locator('main').getByRole('combobox').first()
  await search.fill('IPE 200')
  await search.press('Enter')
  await expect(page).toHaveURL(/\/catalogue\/structural\/ipe\?row=ipe-200/)
  await expect(page.locator('#row-ipe-200')).toHaveClass(/row-target/)

  await page.locator('#row-ipe-200').getByRole('button', { name: /Add to quote/ }).click()
  await expect(page.locator('#row-ipe-200').getByRole('button', { name: /Added \(1\)/ })).toBeVisible()
  await page.locator('#row-ipe-200').getByRole('button', { name: /Added/ }).click()
  await expect(page.locator('#row-ipe-200').getByRole('button', { name: /Added \(2\)/ })).toBeVisible()

  // Notes alone unlock Continue.
  await page.goto('/quote')
  await page.getByRole('button', { name: 'Remove IPE 200' }).click()
  await expect(page.getByRole('button', { name: 'Continue' })).toBeDisabled()
  await page.getByLabel('Notes').fill('20 lengths of 100 x 100 box, not sure of the grade')
  await page.getByRole('button', { name: 'Continue' }).click()
  await expect(page).toHaveURL(/\/quote\/details/)

  await page.getByRole('button', { name: 'Send quote request' }).click()
  await expect(page.getByText('Choose a delivery emirate or pick up.')).toBeVisible()
  await page.getByLabel(/Delivery emirate/).selectOption('Dubai')
  await page.getByLabel(/Your name/).fill('Test Buyer')
  await page.getByLabel(/Email/).fill('buyer@example.ae')
  await page.getByRole('button', { name: 'Send quote request' }).click()
  await expect(page).toHaveURL(/\/quote\/received/, { timeout: 5000 })
  await expect(page.getByText(/MJ-Q-2026-\d{4}/)).toBeVisible()

  // Received survives a reload; hotkeys ignore typing.
  await page.reload()
  await expect(page.getByText(/MJ-Q-2026-\d{4}/)).toBeVisible()
  await page.keyboard.press('p')
  await expect(page.getByRole('toolbar', { name: 'Presenter' })).toBeVisible()
  await page.getByRole('toolbar').getByRole('button', { name: 'Fill basket' }).click()
  await expect(page.getByRole('button', { name: 'Quote, 4 lines' })).toBeVisible()
  await page.keyboard.press('Shift+R')
  await expect(page).toHaveURL('http://localhost:4173/')
  await expect(page.getByRole('button', { name: 'Quote, 0 lines' })).toBeVisible()
})

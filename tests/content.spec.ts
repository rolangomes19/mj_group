import { expect, test } from '@playwright/test'

test.use({ viewport: { width: 1440, height: 900 } })

const text = async (page: import('@playwright/test').Page, path: string) => {
  await page.goto(path)
  await page.waitForLoadState('networkidle')
  return page.locator('main').innerText()
}

test('founder page has no sales', async ({ page }) => {
  const body = await text(page, '/founder')
  expect(body).not.toMatch(/Start a quote|WhatsApp|04 351 0500|What it means for your order/i)
  await page.screenshot({ path: 'shots/tasks/02-founder.png', fullPage: true })
})

test('since 1942 ends on the story', async ({ page }) => {
  const body = await text(page, '/since-1942')
  expect(body).not.toMatch(/Send us your list/i)
})

test('data patches', async ({ page }) => {
  const tl = await text(page, '/since-1942')
  expect(tl).not.toMatch(/2006|2012|2018|Jebel Ali yard|Sharjah yard/)
  await expect(page.getByRole('button', { name: 'Steel' })).toHaveCount(0)
  expect(tl).toMatch(/ISO 9001:2015/)
  const rec = await text(page, '/founder')
  expect(rec).toMatch(/Chairman/)
  await expect(page.getByRole('img', { name: 'Dr Lalchand M Pancholia' })).toBeVisible()
  await page.goto('/quote/received')
  await expect(page.locator('main')).not.toContainText('Coming soon')
  await expect(page.getByRole('banner').getByRole('link', { name: 'Resources' })).toHaveCount(0)
  await page.goto('/')
  await page.screenshot({ path: 'shots/tasks/03-home.png' })
})

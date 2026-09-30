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

test('home hero and order', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('84 years of trust. Now orderable by the row.')
  const heads = await page.locator('main h2').allInnerTexts()
  expect(heads.join('|')).not.toMatch(/Grades, side by side/)
  await page.waitForTimeout(800)
  await page.screenshot({ path: 'shots/tasks/05-hero.png' })
})

test('certificate badges', async ({ page }) => {
  for (const path of ['/', '/standards']) {
    const body = await text(page, path)
    expect(body).not.toMatch(/May 2027/)
    const badges = page.locator('main article').filter({ hasText: /ISO 9001|In-Country|EN 10204/ })
    await expect(badges.locator('img[alt*="seal"], img[alt*="logo"], svg[aria-label="EN 10204 3.1 label"]')).toHaveCount(3)
    for (const b of await badges.locator('img, svg[role="img"]').all()) expect((await b.boundingBox())!.height).toBeLessThanOrEqual(96)
  }
  await page.goto('/standards')
  await page.locator('main article').filter({ hasText: 'In-Country' }).first().scrollIntoViewIfNeeded()
  await page.screenshot({ path: 'shots/tasks/06-certs.png' })
})

test('no letter chips in steps and industries', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await expect(page.locator('main [title^="step-"], main [title^="ind-"]')).toHaveCount(0)
})

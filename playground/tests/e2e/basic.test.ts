import { expect, test } from '@nuxt/test-utils/playwright'

test('webpage basic content loading', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  // Check title
  await expect(page).toHaveTitle('')
})

import { expect, test } from '@nuxt/test-utils/playwright'

test('title null field has no label', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page.getByLabel('Title null field')).not.toBeVisible()
})

test('test very basic form', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page.getByRole('button', { name: 'My custom send button' })).toHaveAttribute('aria-disabled', 'true')
  await page.getByRole('textbox', { name: 'Text Input' }).click()
  await page.getByRole('textbox', { name: 'Text Input' }).fill('asdasd')

  // Test optional number field - type, delete, verify it stays undefined
  await page.getByRole('spinbutton', { name: 'Optional Number Input' }).click()
  await page.getByRole('spinbutton', { name: 'Optional Number Input' }).fill('123')
  await page.getByRole('spinbutton', { name: 'Optional Number Input' }).clear()

  await page.getByRole('textbox').nth(2).click()
  await page.getByRole('textbox').nth(2).fill('me@norbiros.dev')
  await expect(page.locator('.iconify').first()).toBeVisible()
  await page.getByRole('combobox', { name: 'Enum Input', exact: true }).click()
  await page.getByRole('option', { name: '2' }).click()
  await page.getByRole('textbox', { name: 'Text description' }).click()
  await expect(page.getByText('with description')).toBeVisible()
  await expect(page.getByText('with hint')).toBeVisible()
  await page.locator('form div').filter({ hasText: 'Input with custom slot' }).getByRole('combobox').click()
  await page.getByLabel('True').getByText('True').click()
  await expect(page.locator('#v-6-error')).toContainText('Invalid input')
  await page.getByRole('textbox', { name: 'Text description' }).click()
  await page.getByRole('textbox', { name: 'Text description' }).fill('asdasd')
  await page.getByRole('combobox', { name: 'Multiple Enum Input' }).click()
  await page.getByRole('option', { name: 'E' }).click()
  await page.getByRole('option', { name: 'A' }).click()
  await page.mouse.click(50, 50)
  await page.getByRole('button', { name: 'My custom send button' }).click()
  await expect(page.getByRole('button', { name: 'My custom send button' })).not.toHaveAttribute('aria-disabled', 'true')
})

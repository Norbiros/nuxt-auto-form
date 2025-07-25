import { expect, test } from '@nuxt/test-utils/playwright'

test('test very basic form', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page.getByRole('button', { name: 'Send' })).toBeDisabled()
  await page.getByRole('textbox', { name: 'Text Input' }).click()
  await page.getByRole('textbox', { name: 'Text Input' }).fill('asdasd')
  await page.getByRole('combobox', { name: 'Enum Input', exact: true }).click()
  await page.getByRole('option', { name: '2' }).click()
  await page.getByRole('textbox', { name: 'Text description' }).click()
  await page.locator('form div').filter({ hasText: 'Input with custom slot' }).getByRole('combobox').click()
  await page.getByLabel('True').getByText('True').click()
  await expect(page.locator('#v-4-error')).toContainText('Invalid input')
  await page.getByRole('textbox', { name: 'Text description' }).click()
  await page.getByRole('textbox', { name: 'Text description' }).fill('asdasd')
  await page.getByRole('combobox', { name: 'Multiple Enum Input' }).click()
  await page.getByRole('option', { name: 'E' }).click()
  await page.getByRole('option', { name: 'A' }).click()
  await page.locator('html').click()
  await page.getByRole('button', { name: 'Send' }).click()
  await expect(page.getByRole('button', { name: 'Send' })).toBeEnabled()
})

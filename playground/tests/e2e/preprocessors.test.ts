import { expect, test } from '@nuxt/test-utils/playwright'

test.describe('Preprocessors', () => {
  test('renders labels translated via $i18n: preprocessor', async ({ page }) => {
    await page.goto('/preprocessor-test', { waitUntil: 'networkidle' })

    // $i18n:form.username -> "Username" (from translation dictionary)
    await expect(page.getByText('Username')).toBeVisible()

    // $i18n:form.code_description -> "Enter your access code"
    await expect(page.getByText('Enter your access code')).toBeVisible()
  })

  test('renders placeholder translated via $i18n: preprocessor', async ({ page }) => {
    await page.goto('/preprocessor-test', { waitUntil: 'networkidle' })

    // $i18n:form.username_placeholder -> "Enter your username"
    const usernameInput = page.getByRole('textbox', { name: 'Username' })
    await expect(usernameInput).toHaveAttribute('placeholder', 'Enter your username')
  })

  test('renders meta strings processed with $upper: preprocessor', async ({ page }) => {
    await page.goto('/preprocessor-test', { waitUntil: 'networkidle' })

    // $upper:access code -> "ACCESS CODE"
    await expect(page.getByText('ACCESS CODE', { exact: true })).toBeVisible()
  })
})

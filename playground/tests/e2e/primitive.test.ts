import { expect, test } from '@nuxt/test-utils/playwright'

test.describe('AutoFormPrimitive', () => {
  test('renders form fields from schema', async ({ page }) => {
    await page.goto('/primitive', { waitUntil: 'networkidle' })

    await expect(page.getByLabel('Username')).toBeVisible()
    await expect(page.getByLabel('Email')).toBeVisible()
    await expect(page.getByTestId('submit-btn')).toBeVisible()
  })

  test('validates required fields', async ({ page }) => {
    await page.goto('/primitive', { waitUntil: 'networkidle' })

    await page.getByTestId('submit-btn').click()

    await expect(page.getByText('Username must be at least 3 characters')).toBeVisible()
  })

  test('validates email format', async ({ page }) => {
    await page.goto('/primitive', { waitUntil: 'networkidle' })

    await page.getByLabel('Username').fill('testuser')
    await page.getByLabel('Email').fill('invalid-email')
    await page.getByTestId('submit-btn').click()

    await expect(page.getByText('Invalid email')).toBeVisible()
  })

  test('submits valid form', async ({ page }) => {
    await page.goto('/primitive', { waitUntil: 'networkidle' })

    await page.getByLabel('Username').fill('testuser')
    await page.getByLabel('Email').fill('test@example.com')
    await page.getByTestId('submit-btn').click()

    await expect(page.getByTestId('success-message')).toBeVisible()
    await expect(page.getByTestId('success-message')).toContainText('testuser')
    await expect(page.getByTestId('success-message')).toContainText('test@example.com')
  })

  test('programmatic submit via exposed form method', async ({ page }) => {
    await page.goto('/primitive', { waitUntil: 'networkidle' })

    await page.getByLabel('Username').fill('proguser')
    await page.getByLabel('Email').fill('prog@example.com')
    await page.getByTestId('trigger-submit').click()

    await expect(page.getByTestId('success-message')).toBeVisible()
    await expect(page.getByTestId('success-message')).toContainText('proguser')
  })

  test('error event fires on validation failure', async ({ page }) => {
    await page.goto('/primitive', { waitUntil: 'networkidle' })

    await page.getByTestId('submit-btn').click()

    await expect(page.getByTestId('error-message')).toBeVisible()
    await expect(page.getByTestId('error-message')).toContainText('Validation failed')
  })

  test('reset clears form and messages', async ({ page }) => {
    await page.goto('/primitive', { waitUntil: 'networkidle' })

    await page.getByLabel('Username').fill('testuser')
    await page.getByLabel('Email').fill('test@example.com')
    await page.getByTestId('submit-btn').click()

    await expect(page.getByTestId('success-message')).toBeVisible()

    await page.getByTestId('reset-btn').click()

    await expect(page.getByTestId('success-message')).not.toBeVisible()
    await expect(page.getByLabel('Username')).toHaveValue('')
    await expect(page.getByLabel('Email')).toHaveValue('')
  })
})

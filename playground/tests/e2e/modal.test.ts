import { expect, test } from '@nuxt/test-utils/playwright'

test.describe('AutoFormModal', () => {
  test('opens modal when button clicked', async ({ page }) => {
    await page.goto('/modal', { waitUntil: 'networkidle' })

    await page.getByTestId('open-modal-btn').click()

    await expect(page.getByRole('heading', { name: 'Test Form Modal' })).toBeVisible()
    await expect(page.getByText('Fill in the form below')).toBeVisible()
  })

  test('renders form fields in modal', async ({ page }) => {
    await page.goto('/modal', { waitUntil: 'networkidle' })

    await page.getByTestId('open-modal-btn').click()

    await expect(page.getByLabel('Name')).toBeVisible()
    await expect(page.getByLabel('Email')).toBeVisible()
  })

  test('cancel button closes modal', async ({ page }) => {
    await page.goto('/modal', { waitUntil: 'networkidle' })

    await page.getByTestId('open-modal-btn').click()
    await expect(page.getByRole('heading', { name: 'Test Form Modal' })).toBeVisible()

    await page.getByRole('button', { name: 'Cancel' }).click()

    await expect(page.getByRole('heading', { name: 'Test Form Modal' })).not.toBeVisible()
  })

  test('submit button is disabled when form invalid', async ({ page }) => {
    await page.goto('/modal', { waitUntil: 'networkidle' })

    await page.getByTestId('open-modal-btn').click()

    await expect(page.getByRole('button', { name: 'Save' })).toBeDisabled()
  })

  test('submit button enables when form valid', async ({ page }) => {
    await page.goto('/modal', { waitUntil: 'networkidle' })

    await page.getByTestId('open-modal-btn').click()

    await page.getByLabel('Name').fill('John Doe')
    await page.getByLabel('Email').fill('john@example.com')

    await expect(page.getByRole('button', { name: 'Save' })).not.toBeDisabled()
  })

  test('submit closes modal and shows success', async ({ page }) => {
    await page.goto('/modal', { waitUntil: 'networkidle' })

    await page.getByTestId('open-modal-btn').click()

    await page.getByLabel('Name').fill('John Doe')
    await page.getByLabel('Email').fill('john@example.com')
    await page.getByRole('button', { name: 'Save' }).click()

    await expect(page.getByRole('heading', { name: 'Test Form Modal' })).not.toBeVisible()
    await expect(page.getByTestId('success-message')).toBeVisible()
    await expect(page.getByTestId('success-message')).toContainText('John Doe')
  })

  test('validation errors shown in modal', async ({ page }) => {
    await page.goto('/modal', { waitUntil: 'networkidle' })

    await page.getByTestId('open-modal-btn').click()

    await page.getByLabel('Name').fill('test')
    await page.getByLabel('Name').clear()
    await page.getByLabel('Email').click()

    await expect(page.getByText('Name is required')).toBeVisible()
  })

  test('modal with initial state pre-fills form', async ({ page }) => {
    await page.goto('/modal', { waitUntil: 'networkidle' })

    await page.getByTestId('open-initial-btn').click()

    await expect(page.getByRole('heading', { name: 'Edit Form' })).toBeVisible()
    await expect(page.getByLabel('Title')).toHaveValue('Initial Title')
    await expect(page.getByLabel('Content')).toHaveValue('Initial content here')
  })

  test('modal with initial state can be edited and submitted', async ({ page }) => {
    await page.goto('/modal', { waitUntil: 'networkidle' })

    await page.getByTestId('open-initial-btn').click()

    await page.getByLabel('Title').fill('Updated Title')
    await page.getByRole('button', { name: 'Update' }).click()

    await expect(page.getByTestId('success-message')).toBeVisible()
    await expect(page.getByTestId('success-message')).toContainText('Updated Title')
  })

  test('custom footer slot renders without cancel button', async ({ page }) => {
    await page.goto('/modal', { waitUntil: 'networkidle' })

    await page.getByTestId('open-no-cancel-btn').click()

    await expect(page.getByRole('heading', { name: 'Confirm Action' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Cancel' })).not.toBeVisible()
    await expect(page.getByTestId('confirm-only-btn')).toBeVisible()
  })

  test('multiple modals can be opened sequentially', async ({ page }) => {
    await page.goto('/modal', { waitUntil: 'networkidle' })

    await page.getByTestId('open-modal-btn').click()
    await expect(page.getByRole('heading', { name: 'Test Form Modal' })).toBeVisible()
    await page.getByRole('button', { name: 'Cancel' }).click()

    await page.getByTestId('open-initial-btn').click()
    await expect(page.getByRole('heading', { name: 'Edit Form' })).toBeVisible()
    await page.getByRole('button', { name: 'Cancel' }).click()

    await page.getByTestId('open-no-cancel-btn').click()
    await expect(page.getByRole('heading', { name: 'Confirm Action' })).toBeVisible()
  })
})

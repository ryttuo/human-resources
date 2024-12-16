import { test, expect } from '@playwright/test';

test('New Employee modal should display correctly when "New employee" button is clicked', async ({ page }) => {
  // Navigate to the employees page
  await page.goto('http://localhost:3000/employees');
  
  // Click the "New employee" button
  await page.click('text=New employee');
  
  // Check if the modal displays the correct content
  await expect(page.locator('text=Add New Employee')).toBeVisible();
  await expect(page.locator('input[name="first_name"]')).toBeVisible();
  await expect(page.locator('input[name="last_name"]')).toBeVisible();
  await expect(page.locator('select[name="department_id"]')).toBeVisible();
  await expect(page.locator('input[name="hire_date"]')).toBeVisible();
  await expect(page.locator('input[name="phone"]')).toBeVisible();
  await expect(page.locator('textarea[name="address"]')).toBeVisible();
  await expect(page.locator('button:has-text("Save")')).toBeVisible();
});

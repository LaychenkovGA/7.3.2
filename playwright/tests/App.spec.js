import { test, expect } from "@playwright/test";
import { email, password } from "../user";

test("Authorization successful", async ({ page }) => {
  await page.goto('https://netology.ru/');
  await page.getByRole('link', { name: 'Войти' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('input[type="email"]', email);
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill('input[type="password"]', password);
  await page.getByTestId('login-submit-btn').click();
  await page.goto('https://netology.ru/profile/9071537');
  await page.close();
});

test("Authorization failed", async ({ page }) => {
  await page.goto('https://netology.ru/');
  await page.getByRole('link', { name: 'Войти' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('racers2no95@mail.ru');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Пароль').fill('123123123');
  await page.getByTestId('login-submit-btn').click();
  await page.getByTestId('login-error-hint').click();
  await expect(page.getByTestId('login-error-hint')).toBeVisible("Вы ввели неправильно логин или пароль");
  await page.close();
});
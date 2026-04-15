import { test, expect } from '@playwright/test'; 

// SIT simulation: banking flow pattern using public API
const API = 'https://api.restful-api.dev/objects';

test.describe('SIT: Banking Integration Flow', () => {
  let accountId;

  test('Create account', async ({ request }) => {
    const res = await request.post(API, {
      data: {
        name: 'Jefry Kurniawan',
        data: { type: 'Savings', balance: 0, status: 'Active' }
      }
    });
    expect(res.status()).toBe(200);
    accountId = (await res.json()).id;
  });

  test('Verify account data (KYC check)', async ({ request }) => {
    const res = await request.get(`${API}/${accountId}`);
    const json = await res.json();
    expect(json.data.type).toBe('Savings');
    expect(json.data.status).toBe('Active');
  });

  test('Update balance (deposit simulation)', async ({ request }) => {
    const res = await request.put(`${API}/${accountId}`, {
      data: {
        name: 'Jefry Kurniawan',
        data: { type: 'Savings', balance: 7500000, status: 'Active' }
      }
    });
    expect(res.status()).toBe(200);
  });

  test('Verify update & close account', async ({ request }) => {
    const getRes = await request.get(`${API}/${accountId}`);
    expect((await getRes.json()).data.balance).toBe(7500000);
    
    const delRes = await request.delete(`${API}/${accountId}`);
    expect(delRes.status()).toBe(200);
  });

  test('Confirm cleanup (consistency check)', async ({ request }) => {
    const res = await request.get(`${API}/${accountId}`);
    expect(res.status()).toBe(404);
  });
});
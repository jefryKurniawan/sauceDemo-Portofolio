import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  // Stages: pola load test (naik → stabil → turun)
  stages: [
    { duration: '15s', target: 3 },  
    { duration: '30s', target: 5 },
    { duration: '15s', target: 0 },   
  ],
  
  // Thresholds: batas toleransi biar test dianggap "pass"
  thresholds: {
    http_req_failed: ['rate<0.50'],  
    http_req_duration: ['p(95)<5000'],
  },
};

// Fungsi utama yang bakal dijalanin sama setiap virtual user (VU)
export default function () {
  const baseUrl = 'https://www.saucedemo.com';
  
  // Kirim GET request
  const res = http.get(baseUrl);
  
  // Check / assert: pastikan response status OK (200, 301, atau 302)
  check(res, { 
    'Home page accessible': (r) => r.status === 200 || r.status === 301 || r.status === 302
  });
  
  // Tidur 2 detik biar nggak spam server
  sleep(2);
}
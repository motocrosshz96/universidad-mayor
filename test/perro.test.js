const request = require('supertest');
const express = require('express');
const perroRoute = require('../router/perro');

const app = express();
app.use('/', perroRoute);

describe('GET /perro-aleatorio', () => {
    it('debería responder con un HTML que contiene una imagen', async () => {
    const res = await request(app).get('/perro-aleatorio');
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/<img src=".*" alt="Un perro aleatorio"/);
    });
});

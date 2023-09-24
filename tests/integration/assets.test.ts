require('dotenv').config({ path: '.env.test' });
import request from 'supertest';
import { knex } from '../../src/models/db';
import app from '../../app';


describe('Assets', () => {
    beforeEach(async () => {
        // Run migrations to set up in-memory db schema before each test
        await knex.migrate.latest();
        await knex.seed.run();
    });
    
    afterEach(async () => {
        // Rollback migrations after each test to ensure a clean slate
        await knex.migrate.rollback();
    });
    
    afterAll(async () => {
        // Destroy the connection after all tests have run
        await knex.destroy();
    });
    it('Get all assets: GET /', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', 'success');
        expect(res.body.data).toHaveLength(4);
    });
    it('Get an asset: GET /:uuid', async () => {
        const res = await request(app).get('/57bd4af8-3401-40da-99e9-86c6bc3db996');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', 'success');
        expect(res.body.data).toHaveProperty('name', 'asset 1');
    });
    it('Get an asset: GET /:uuid with inexistant id', async () => {
        const res = await request(app).get('/0ebdf537-84fc-4303-8a4d-27f9c2f95b8c');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('status', 'error');
        expect(res.body).toHaveProperty('message', 'Asset not found');
    });
    it('Get an asset: GET /:uuid with poor formatted id', async () => {
        const res = await request(app).get('/mal-formatted-id');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('status', 'error');
        expect(res.body).toHaveProperty('message', '"id" must be a valid GUID');
    });
    it('Create an asset: POST /', async () => {
        const data = {
            name: 'asset test',
            type: 'image',
            content: 'my_content'
        }
        const res = await request(app).post('/').send(data);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('status', 'success');
        expect(res.body).toHaveProperty('message', 'Asset created with success');
    });
    it('Create an asset: POST / with empty name', async () => {
        const data = {
            name: '',
            type: 'image',
            content: 'my_content'
        }
        const res = await request(app).post('/').send(data);
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('status', 'error');
        expect(res.body).toHaveProperty('message', '"name" is not allowed to be empty');
    });
    it('Create an asset: POST / with invalid type', async () => {
        const data = {
            name: 'asset test',
            type: 'my_type',
            content: 'my_content'
        }
        const res = await request(app).post('/').send(data);
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('status', 'error');
        expect(res.body).toHaveProperty('message', '"type" must be one of [image, video, document]');
    });
    it('Create an asset: POST / with no content', async () => {
        const data = {
            name: 'asset test',
            type: 'image'
        }
        const res = await request(app).post('/').send(data);
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('status', 'error');
        expect(res.body).toHaveProperty('message', '"content" is required');
    });
    it('Delete an asset: DELETE /:uuid', async () => {
        const res = await request(app).delete('/57bd4af8-3401-40da-99e9-86c6bc3db996');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', 'success');
        expect(res.body).toHaveProperty('message', 'Asset deleted with success');
    });
    it('Delete an asset: DELETE /:uuid with inexistant id', async () => {
        const res = await request(app).delete('/0ebdf537-84fc-4303-8a4d-27f9c2f95b8c');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('status', 'error');
        expect(res.body).toHaveProperty('message', 'Asset not found');
    });
    it('Delete an asset: DELETE /:uuid with poor formatted id', async () => {
        const res = await request(app).delete('/mal-formatted-id');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('status', 'error');
        expect(res.body).toHaveProperty('message', '"id" must be a valid GUID');
    });
})
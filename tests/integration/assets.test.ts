require('dotenv').config({ path: '.env.test' });
import axios from 'axios';
import request from 'supertest';
import { knex } from '../../src/models/db';
import app from '../../app';
import { MOCKED_DATA } from '../constants';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Assets', () => {
    beforeEach(async () => {
        // Run migrations to set up in-memory db schema before each test
        await knex.migrate.latest();
        await knex.seed.run();
        // Mocking the axios response.
        mockedAxios.get.mockResolvedValueOnce({
            status: 200,
            data: {
                status: 'success',
                data: [...MOCKED_DATA]
            }
        });
        
    });
    
    afterEach(async () => {
        // Rollback migrations after each test to ensure a clean slate
        await knex.migrate.rollback();
        jest.clearAllMocks();
    });
    
    afterAll(async () => {
        // Destroy the connection after all tests have run
        await knex.destroy();
        jest.clearAllMocks();
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
        expect(res.body.data.categories).toStrictEqual([
            {
                uuid: '27b74e98-9e40-4118-8263-804f54f25292',
                name: 'Tech'
            },
            {
                uuid: '399397e4-998e-4f81-955a-17a4b1399782',
                name: 'Phones'
            }
        ]);
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
            content: 'my_content',
            categories: ['27b74e98-9e40-4118-8263-804f54f25292', '399397e4-998e-4f81-955a-17a4b1399782']
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
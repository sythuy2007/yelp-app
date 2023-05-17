const { Pool } = require('pg');


describe('testing postgres', () => {

    let pgPool ;

    beforeAll(() => {
        const  connectionString = 'postgresql://' + process.env.PGUSER + ':' + process.env.PGPASSWORD + '@' + process.env.PGHOST + ':' + process.env.PGPORT + '/' + process.env.PGDATABASE
        pgPool = new Pool({
           connectionString,
        });
    });

    afterAll(async () => {
        await pgPool.end();
    });

    it('should test', async () => {
        const client = await pgPool.connect();
        try {
            await client.query('BEGIN');

            const { rows } = await client.query('SELECT 1 AS "result"');
            expect(rows[0]["result"]).toBe(1);

            await client.query('ROLLBACK');
        } catch(err) {
          throw err;
        } finally {
            client.release();
        }

    })

});
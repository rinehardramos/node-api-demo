import { genDatetime } from '../../../src/utils/datetime.util';

describe('Project Details Test Suite', () => {
    
    it('Convert UTC Date Time to PHT Test Case', async () => {
        const datetime_created = "2023-10-20T09:48:15.000Z"
        const utc = new Date(datetime_created);
        const converted = await genDatetime(datetime_created);
        const blank = await genDatetime();
        expect(utc instanceof Date).toEqual(true);
        expect(typeof blank).toBe("string");
        expect(converted).toEqual("2023-10-20 17:48:15");

    });
});
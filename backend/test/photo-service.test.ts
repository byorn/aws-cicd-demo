import { handler } from "../src/services/photo-service"


describe('Hello describe test suite', ()=>{

    test('handler should return 200',async ()=>{
        const result = await handler({}, {})
        expect(result.statusCode).toBe(200);
    })
})
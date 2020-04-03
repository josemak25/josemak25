import Response from '../../src/helpers/response';

describe('TEST APP RESPONSE SENDER METHOD', () => {
  test('should send response to client when called', () => {
    const user = { name: 'john doe' };
    const response = Response(200, 'success', user, null, null);
    expect(response).toBeTruthy();
  });
});

import { EmailJSResponseStatus } from './emailjs_response_status';

it('should handle the success response', () => {
  const error = new EmailJSResponseStatus(200, 'OK');

  expect(error).toEqual({
    status: 200,
    text: 'OK',
  });
});

it('should handle the fail response', () => {
  const error = new EmailJSResponseStatus(404, 'No Found');

  expect(error).toEqual({
    status: 404,
    text: 'No Found',
  });
});

it('should handle the null response', () => {
  const error = new EmailJSResponseStatus();

  expect(error).toEqual({
    status: 0,
    text: 'Network Error',
  });
});
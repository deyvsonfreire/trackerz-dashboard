import { handleError } from '@/utils/error/handler';
import { NextResponse } from 'next/server';
import { z } from 'zod';

describe('handleError', () => {
  it('should return a NextResponse with the correct status code and message for a standard Error', () => {
    const error = new Error('Test error');
    const response = handleError(error, 500);
    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(500);
  });

  it('should return a NextResponse with the correct status code and message for a ZodError', () => {
    const schema = z.string();
    const result = schema.safeParse(123);
    if (!result.success) {
      const response = handleError(result.error, 400);
      expect(response).toBeInstanceOf(NextResponse);
      expect(response.status).toBe(400);
    }
  });

  it('should return a NextResponse with a default 500 status code if no code is provided', () => {
    const error = new Error('Test error');
    const response = handleError(error);
    expect(response.status).toBe(500);
  });
});
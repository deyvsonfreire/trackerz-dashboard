import { NextResponse } from 'next/server';

/**
 * Handles errors and returns a standardized NextResponse object.
 * @param error - The error to handle.
 * @param status - The HTTP status code.
 * @returns A NextResponse object with the error message and status code.
 */
export function handleError(error: unknown, status: number) {
  const message = error instanceof Error ? error.message : 'An unknown error occurred';
  return NextResponse.json({ error: message }, { status });
}
import React from 'react';
import { render } from '@testing-library/react';
import Page from '../src/app/page';
import { useRouter, redirect } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  redirect: jest.fn(),
}));

describe('Page', () => {
  it('should redirect to /employees', () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<Page />);

    expect(redirect).toHaveBeenCalledWith('/employees');
  });
});

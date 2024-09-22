import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '../app/components/login'; 
import { GoogleSignin } from '@react-native-google-signin/google-signin';

jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn(),
    signIn: jest.fn(),
  },
  GoogleSigninButton: {
    Size: {
      Standard: 0,
    },
    Color: {
      Dark: 0,
    },
  },
}));

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<Login />);
    expect(getByTestId('google-signin-button')).toBeTruthy();
  });

  it('configures GoogleSignin on mount', () => {
    render(<Login />);
    expect(GoogleSignin.configure).toHaveBeenCalledWith({
      OAuthClientID: '741500148269-d9s0m2p927vdh22oa9cks9o1btga5v0v.apps.googleusercontent.com',
    });
  });

  it('handles successful sign-in', async () => {
    const mockUserInfo = { user: { name: 'Test User' } };
    GoogleSignin.hasPlayServices.mockResolvedValue(true);
    GoogleSignin.signIn.mockResolvedValue(mockUserInfo);

    const mockOnLoginSuccess = jest.fn();
    const { getByTestId, getByText } = render(<Login onLoginSuccess={mockOnLoginSuccess} />);

    fireEvent.press(getByTestId('google-signin-button'));

    await waitFor(() => {
      expect(getByText(JSON.stringify(mockUserInfo))).toBeTruthy();
      expect(mockOnLoginSuccess).toHaveBeenCalledWith(mockUserInfo);
    });
  });

  it('handles sign-in error', async () => {
    const mockError = new Error('Sign-in failed');
    GoogleSignin.hasPlayServices.mockResolvedValue(true);
    GoogleSignin.signIn.mockRejectedValue(mockError);

    const { getByTestId, getByText } = render(<Login />);

    fireEvent.press(getByTestId('google-signin-button'));

    await waitFor(() => {
      expect(getByText(JSON.stringify(mockError))).toBeTruthy();
    });
  });

  it('logs error to console on sign-in failure', async () => {
    const mockError = new Error('Sign-in failed');
    GoogleSignin.hasPlayServices.mockResolvedValue(true);
    GoogleSignin.signIn.mockRejectedValue(mockError);

    // const consoleSpy = jest.spyOn(console, 'log');
    const { getByTestId } = render(<Login />);

    fireEvent.press(getByTestId('google-signin-button'));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(mockError);
    });

    consoleSpy.mockRestore();
  });
});
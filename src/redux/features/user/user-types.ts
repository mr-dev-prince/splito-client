export interface User {
  id: number;
  clerk_user_id: string;

  email: string;
  name: string;
  avatar_url: string | null;

  is_active: boolean;
  deleted_at: string | null; // ISO Date string

  // Security
  security_pin: string | null; // The hashed PIN
  security_pin_active: boolean;

  // Timestamps
  created_at: string; // ISO Date string
  updated_at: string; // ISO Date string
  last_login_at: string | null; // ISO Date string
}

export interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  // pin related states can be added here if needed
  securityPinSet: boolean;
  securityPinLoading: boolean;
  securityPinError: string | null;
  // verifyPin
  verifyPinLoading: boolean;
  verifyPinError: string | null;
  // deactivatePin
  deactivatePinLoading: boolean;
  deactivatePinError: string | null;
}

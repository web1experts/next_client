
import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';

// Async thunk to handle user login API
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Invalid credentials');
      }

      // Save the token in localStorage (optional)
      localStorage.setItem('token', data.token); // Assuming the API returns a token

      return data; // Return the whole response data
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to handle user signup API
export const signupUser = createAsyncThunk(
  'auth/signup',
  async (userData: { username: string; email: string; password: string }, { rejectWithValue }) => {
    console.log("userDate" , userData)
    try {
      const response = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || 'Signup failed');
      }

      return data; // Return the whole response data
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface AuthState {
  loading: boolean;
  user: any;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  loading: false,
  user: null,
  error: null,
  isAuthenticated: false,
};

// Create auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token'); // Clear token on logout
    },
  },
  extraReducers: (builder) => {
    // Handle login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Assuming action.payload is the user object or token
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Handle signup
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Assuming action.payload is the user object or token
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions; // Export logout action
export default authSlice.reducer; // Export the reducer




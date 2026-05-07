
import './App.css';
import { useEffect, useState } from 'react';
import {
  SignInButton,
  SignedOut,
  SignedIn,
  SignOutButton,
  UserButton,
  useUser,
} from '@clerk/clerk-react';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

function App() {
  const { isSignedIn, user } = useUser();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function fetchUsers() {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/api/users`);
      if (!response.ok) {
        throw new Error('Could not load users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSyncUser() {
    if (!user) return;
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch(`${API_URL}/api/users/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clerkId: user.id,
          name: user.fullName || user.firstName || 'Unknown User',
          email: user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || '',
          profileImage: user.profileImageUrl || '',
        }),
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.error || 'Unable to sync user');
      }

      setMessage('User synced to backend successfully.');
      await fetchUsers();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isSignedIn) {
      fetchUsers();
    }
  }, [isSignedIn]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Second Project</h1>
        <p>Full-stack example with Clerk auth and a user backend.</p>
      </header>

      <main className="app-content">
        <SignedOut>
          <div className="auth-card">
            <h2>Welcome</h2>
            <p>Sign in to sync your profile with the backend.</p>
            <SignInButton mode="modal">
              <button className="primary-button">Sign In / Sign Up</button>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
          <section className="dashboard-card">
            <div className="top-row">
              <div>
                <h2>Welcome, {user?.fullName || user?.firstName || 'Clerk user'}</h2>
                <p>{user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress}</p>
              </div>
              <div className="user-actions">
                <button className="secondary-button" onClick={handleSyncUser} disabled={loading}>
                  Sync profile
                </button>
                <SignOutButton>
                  <button className="secondary-button">Sign Out</button>
                </SignOutButton>
                <UserButton />
              </div>
            </div>

            <div className="status-row">
              {loading && <div className="status-badge">Loading...</div>}
              {message && <div className="status-success">{message}</div>}
              {error && <div className="status-error">{error}</div>}
            </div>

            <div className="list-header">
              <h3>Backend users</h3>
              <button className="small-button" onClick={fetchUsers} disabled={loading}>
                Refresh
              </button>
            </div>

            <div className="users-grid">
              {users.length === 0 && !loading ? (
                <p>No users found yet. Click Sync profile to add your account.</p>
              ) : (
                users.map((backendUser) => (
                  <article key={backendUser._id} className="user-card">
                    <div className="user-avatar">
                      {backendUser.profileImage ? (
                        <img src={backendUser.profileImage} alt={backendUser.name} />
                      ) : (
                        <span>{backendUser.name?.[0] || 'U'}</span>
                      )}
                    </div>
                    <div>
                      <strong>{backendUser.name}</strong>
                      <p>{backendUser.email}</p>
                      <small>Created: {new Date(backendUser.createdAt).toLocaleDateString()}</small>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </SignedIn>
      </main>
    </div>
  );
}

export default App;


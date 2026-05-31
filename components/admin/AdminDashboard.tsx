'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { ProjectForm, type AdminProject } from '@/components/admin/ProjectForm';

type Tab = 'dashboard' | 'projects' | 'inquiries' | 'newsletter';

type Project = AdminProject;

interface Inquiry {
  _id?: string;
  name?: string;
  FullName?: string;
  email?: string;
  Email?: string;
  phone?: string;
  PhoneNumber?: string;
  subject?: string;
  ProjectInterest?: string;
  message?: string;
  Message?: string;
  date?: string;
  SubmittedDate?: string;
  status?: string;
}

interface Subscriber {
  _id?: string;
  email?: string;
  Email?: string;
  date?: string;
  SubscribedDate?: string;
  status?: string;
  Status?: string;
}

function inquiryName(i: Inquiry) {
  return i.name || i.FullName || 'N/A';
}

function inquiryEmail(i: Inquiry) {
  return i.email || i.Email || '';
}

function inquiryPhone(i: Inquiry) {
  return i.phone || i.PhoneNumber || 'N/A';
}

function inquirySubject(i: Inquiry) {
  return i.subject || i.ProjectInterest || 'N/A';
}

function inquiryMessage(i: Inquiry) {
  return i.message || i.Message || '';
}

function inquiryDate(i: Inquiry) {
  const d = i.date || i.SubmittedDate;
  return d ? new Date(d).toLocaleDateString() : 'N/A';
}

export function AdminDashboard({ initialAuthenticated }: { initialAuthenticated: boolean }) {
  const [authed, setAuthed] = useState(initialAuthenticated);
  const [adminToken, setAdminToken] = useState('');
  const [tab, setTab] = useState<Tab>('dashboard');
  const [projects, setProjects] = useState<Project[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [tabLoading, setTabLoading] = useState<Partial<Record<Tab, boolean>>>({});
  const [loginError, setLoginError] = useState('');
  const loadedTabsRef = useRef<Set<Tab>>(new Set());
  const [notification, setNotification] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [dbHealthy, setDbHealthy] = useState<boolean | null>(null);

  const authHeaders = useCallback((): HeadersInit => {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (adminToken) {
      headers.Authorization = adminToken.startsWith('Bearer ') ? adminToken : `Bearer ${adminToken}`;
    }
    return headers;
  }, [adminToken]);

  const fetchAuth = useCallback(
    async (endpoint: string, options: RequestInit = {}) => {
      const res = await fetch(endpoint, {
        ...options,
        credentials: 'include',
        headers: { ...authHeaders(), ...(options.headers || {}) },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Request failed');
      return json;
    },
    [authHeaders]
  );

  const showNotify = (text: string, type: 'success' | 'error' = 'success') => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const loadTab = useCallback(
    async (target: Tab, force = false) => {
      if (!authed) return;
      if (!force && loadedTabsRef.current.has(target)) return;

      setTabLoading((s) => ({ ...s, [target]: true }));
      const errors: string[] = [];

      try {
        const healthRes = await fetch('/api/health');
        const healthJson = await healthRes.json().catch(() => ({}));
        setDbHealthy(healthRes.ok && healthJson.status === 'ok');

        if (target === 'dashboard') {
          const [p, i, n] = await Promise.allSettled([
            fetchAuth('/api/projects'),
            fetchAuth('/api/inquiries'),
            fetchAuth('/api/newsletter/subscribers'),
          ]);

          if (p.status === 'fulfilled') setProjects(p.value.data || []);
          else errors.push(p.reason instanceof Error ? p.reason.message : 'Failed to load projects');

          if (i.status === 'fulfilled') setInquiries(i.value.data || []);
          else errors.push(i.reason instanceof Error ? i.reason.message : 'Failed to load inquiries');

          if (n.status === 'fulfilled') setSubscribers(n.value.data || []);
          else errors.push(n.reason instanceof Error ? n.reason.message : 'Failed to load subscribers');
        } else if (target === 'projects') {
          const p = await fetchAuth('/api/projects');
          setProjects(p.data || []);
        } else if (target === 'inquiries') {
          const i = await fetchAuth('/api/inquiries');
          setInquiries(i.data || []);
        } else if (target === 'newsletter') {
          const n = await fetchAuth('/api/newsletter/subscribers');
          setSubscribers(n.data || []);
        }

        if (errors.length > 0) {
          showNotify(errors[0], 'error');
        }

        loadedTabsRef.current.add(target);
      } catch (e) {
        showNotify(e instanceof Error ? e.message : 'Failed to load', 'error');
      } finally {
        setTabLoading((s) => ({ ...s, [target]: false }));
      }
    },
    [authed, fetchAuth]
  );

  useEffect(() => {
    if (authed) loadTab(tab);
  }, [authed, tab, loadTab]);

  const refreshCurrentTab = () => {
    loadedTabsRef.current.delete(tab);
    loadTab(tab, true);
  };

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoginError('');
    const fd = new FormData(e.currentTarget);
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        username: fd.get('username'),
        password: fd.get('password'),
      }),
    });
    const json = await res.json();
    if (!res.ok) {
      setLoginError(json.error || 'Invalid credentials');
      return;
    }
    setAdminToken(json.token || '');
    setAuthed(true);
    showNotify('Login successful! Loading dashboard...');
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
    setAdminToken('');
    setAuthed(false);
    showNotify('Logged out successfully');
  }

  async function deleteProject(id: string) {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await fetchAuth(`/api/projects/${id}`, { method: 'DELETE' });
      showNotify('Project deleted');
      loadedTabsRef.current.clear();
      loadTab(tab, true);
    } catch (err) {
      showNotify(err instanceof Error ? err.message : 'Delete failed', 'error');
    }
  }

  async function updateInquiryStatus(id: string, status: string) {
    try {
      await fetchAuth(`/api/inquiries/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      showNotify('Inquiry status updated');
      refreshCurrentTab();
    } catch (err) {
      showNotify(err instanceof Error ? err.message : 'Update failed', 'error');
    }
  }

  async function deleteInquiry(id: string) {
    if (!confirm('Delete this inquiry?')) return;
    try {
      await fetchAuth(`/api/inquiries/${id}`, { method: 'DELETE' });
      showNotify('Inquiry deleted');
      refreshCurrentTab();
    } catch (err) {
      showNotify(err instanceof Error ? err.message : 'Delete failed', 'error');
    }
  }

  function projectCover(p: Project) {
    return p.gallery?.[0] || p.image || 'https://via.placeholder.com/400x300?text=Project';
  }

  function projectMediaCount(p: Project) {
    const images = p.gallery?.length || (p.image ? 1 : 0);
    const videos = (p.videos?.length || 0) + (p.videoFiles?.length || 0);
    return { images, videos };
  }

  const newInquiryCount = inquiries.filter(
    (i) => (i.status || 'new').toLowerCase() === 'new'
  ).length;

  if (!authed) {
    return (
      <div className="min-h-screen bg-surface-container-low pt-24 pb-20">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-surface-container-lowest shadow-xl rounded-3xl p-8 border border-outline-variant/30">
            <div className="flex items-center gap-3 mb-2">
              <Image src="/images/logo.jpg" alt="Logo" width={40} height={40} className="rounded-lg" />
              <h1 className="font-headline text-xl font-bold text-primary">Admin Sign In</h1>
            </div>
            <p className="text-on-surface-variant text-sm mb-8">
              Sign in to manage projects, inquiries, and newsletter subscribers.
            </p>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
                  Admin Username
                </label>
                <Input name="username" required placeholder="Enter your username" />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
                  Admin Password
                </label>
                <div className="relative">
                  <Input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your password"
                    className="pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-0 px-4 text-on-surface-variant hover:text-primary"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
              {loginError && <p className="text-error text-sm">{loginError}</p>}
              <button type="submit" className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold hover:opacity-90">
                Sign In
              </button>
            </form>
            <Link href="/" className="block text-center mt-6 text-sm text-primary hover:underline">
              ← Back to website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'projects', label: 'Projects' },
    { id: 'inquiries', label: 'Inquiries', badge: newInquiryCount },
    { id: 'newsletter', label: 'Subscribers' },
  ];

  return (
    <div className="min-h-screen bg-surface-container-low">
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium ${
            notification.type === 'success'
              ? 'bg-primary-container text-on-primary'
              : 'bg-error-container text-error'
          }`}
        >
          {notification.text}
        </div>
      )}

      <nav className="fixed top-0 w-full z-40 bg-surface-container-lowest/90 backdrop-blur border-b border-outline-variant/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.jpg" alt="Logo" width={32} height={32} className="rounded" />
            <div>
              <p className="font-headline font-bold text-primary text-sm">PVS Promoters</p>
              <p className="text-xs text-on-surface-variant">Admin Center</p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <Link href="/" className="text-sm text-primary hover:underline">
              Back to Website
            </Link>
            <button type="button" onClick={handleLogout} className="text-sm bg-error-container text-error px-4 py-1.5 rounded-full font-bold">
              Logout
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 flex gap-6 overflow-x-auto border-t border-outline-variant/20">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`py-3 text-sm font-bold uppercase tracking-wider border-b-2 whitespace-nowrap flex items-center gap-2 ${
                tab === t.id ? 'border-primary text-primary' : 'border-transparent text-outline'
              }`}
            >
              {t.label}
              {t.badge ? (
                <span className="bg-error text-on-error text-[10px] px-2 py-0.5 rounded-full">{t.badge}</span>
              ) : null}
            </button>
          ))}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8 pt-36">
        {dbHealthy === false && (
          <div className="mb-6 rounded-2xl border border-error/30 bg-error-container/40 px-4 py-3 text-sm text-error space-y-2">
            <p className="font-semibold">MongoDB Atlas is unavailable.</p>
            <p>
              Verify <code className="font-mono text-xs">MONGO_URI</code> in your deployment environment points to
              Atlas with database name <code className="font-mono text-xs">pvs_promoters</code>, then restart the app.
            </p>
            <p>
              Seed projects after first connect:{' '}
              <code className="font-mono text-xs">npm run seed</code>
            </p>
          </div>
        )}

        {tabLoading[tab] && <p className="text-sm text-on-surface-variant mb-4">Loading...</p>}

        {tab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="admin-card bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30">
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Total Projects</p>
                <p className="text-3xl font-extrabold text-primary">{projects.length}</p>
              </div>
              <div className="admin-card bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30">
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Active Inquiries</p>
                <p className="text-3xl font-extrabold text-primary-container">{newInquiryCount}</p>
              </div>
              <div className="admin-card bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30">
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Subscribers</p>
                <p className="text-3xl font-extrabold text-tertiary">{subscribers.length}</p>
              </div>
              <div className="admin-card bg-primary-fixed/30 p-6 rounded-2xl border border-primary/20">
                <p className="text-xs font-bold text-primary/60 uppercase tracking-widest mb-2">System Status</p>
                <p className="text-lg font-bold text-primary flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${dbHealthy ? 'bg-green-500 animate-pulse' : 'bg-error'}`}
                  />
                  {dbHealthy === null ? 'Checking…' : dbHealthy ? 'Operational' : 'Database offline'}
                </p>
              </div>
            </div>

            <div className="admin-card bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-headline font-bold text-primary">Recent Inquiries</h2>
                <button type="button" onClick={() => setTab('inquiries')} className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead className="bg-surface-container-low">
                    <tr>
                      <th className="border border-outline-variant/30 p-3 text-left">Name</th>
                      <th className="border border-outline-variant/30 p-3 text-left">Email</th>
                      <th className="border border-outline-variant/30 p-3 text-left">Project</th>
                      <th className="border border-outline-variant/30 p-3 text-left">Date</th>
                      <th className="border border-outline-variant/30 p-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.slice(0, 5).map((inq) => (
                      <tr key={String(inq._id)} className="hover:bg-surface-container-low/50">
                        <td className="border border-outline-variant/30 p-3">{inquiryName(inq)}</td>
                        <td className="border border-outline-variant/30 p-3">{inquiryEmail(inq)}</td>
                        <td className="border border-outline-variant/30 p-3">{inquirySubject(inq)}</td>
                        <td className="border border-outline-variant/30 p-3">{inquiryDate(inq)}</td>
                        <td className="border border-outline-variant/30 p-3 capitalize">{inq.status || 'new'}</td>
                      </tr>
                    ))}
                    {inquiries.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center p-4 text-on-surface-variant">
                          No inquiries yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="admin-card bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30">
                <h2 className="font-headline font-bold text-primary mb-4">Recent Subscribers</h2>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {subscribers.slice(0, 5).map((s) => (
                    <div key={String(s._id)} className="bg-surface-container-low p-3 rounded-lg flex justify-between">
                      <span className="font-medium text-primary">{s.email || s.Email}</span>
                      <span className="text-xs text-on-surface-variant capitalize">{s.status || s.Status || 'active'}</span>
                    </div>
                  ))}
                  {subscribers.length === 0 && (
                    <p className="text-on-surface-variant text-center py-4 text-sm">No subscribers yet</p>
                  )}
                </div>
              </div>
              <div className="admin-card bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30">
                <h2 className="font-headline font-bold text-primary mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-3">
                  {(['projects', 'inquiries', 'newsletter'] as Tab[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTab(t)}
                      className="p-4 bg-primary-fixed/40 rounded-xl text-primary font-bold text-sm hover:bg-primary-fixed/60 text-left capitalize"
                    >
                      {t === 'newsletter' ? 'Newsletter' : t}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={refreshCurrentTab}
                    className="p-4 bg-surface-container-low rounded-xl font-bold text-sm hover:bg-surface-container text-left"
                  >
                    Refresh Dashboard
                  </button>
                  <Link
                    href="/"
                    className="p-4 bg-surface-container-low rounded-xl font-bold text-sm hover:bg-surface-container text-left flex items-center"
                  >
                    View Site
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'projects' && (
          <div className="space-y-8">
            {!editingProject && (
              <ProjectForm
                mode="create"
                getAuthHeaders={authHeaders}
                onNotify={showNotify}
                onSuccess={refreshCurrentTab}
              />
            )}
            {editingProject && (
              <ProjectForm
                mode="edit"
                initial={editingProject}
                getAuthHeaders={authHeaders}
                onNotify={showNotify}
                onSuccess={() => {
                  setEditingProject(null);
                  refreshCurrentTab();
                }}
                onCancel={() => setEditingProject(null)}
              />
            )}

            <div>
              <h2 className="font-headline font-bold text-primary text-xl mb-4">All Projects</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((p) => {
                  const { images, videos } = projectMediaCount(p);
                  const imgSrc = projectCover(p);
                  return (
                    <div
                      key={p._id || p.id}
                      className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imgSrc} alt={p.title} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h3 className="font-headline font-bold text-primary">{p.title}</h3>
                        <p className="text-sm text-on-surface-variant mb-2">{p.location}</p>
                        <ul className="text-sm space-y-1 mb-3">
                          <li><strong>Price:</strong> {p.price || 'N/A'}</li>
                          <li><strong>Area:</strong> {p.details?.area || p.details?.totalArea || 'N/A'}</li>
                          <li><strong>Status:</strong> {p.status || 'N/A'}</li>
                          <li><strong>Media:</strong> {images} image{images !== 1 ? 's' : ''}, {videos} video{videos !== 1 ? 's' : ''}</li>
                        </ul>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProject(p);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="flex-1 bg-primary text-on-primary py-2 rounded-lg text-sm font-bold hover:opacity-90"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteProject(String(p._id || p.id))}
                            className="flex-1 bg-error text-on-error py-2 rounded-lg text-sm font-bold hover:opacity-90"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {projects.length === 0 && (
                  <p className="text-on-surface-variant col-span-full text-center py-8">
                    No projects found. Add your first project above!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {tab === 'inquiries' && (
          <div className="overflow-x-auto bg-surface-container-lowest rounded-2xl border border-outline-variant/30">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-surface-container-low">
                <tr>
                  <th className="border border-outline-variant/30 p-3 text-left">Name</th>
                  <th className="border border-outline-variant/30 p-3 text-left">Email</th>
                  <th className="border border-outline-variant/30 p-3 text-left">Phone</th>
                  <th className="border border-outline-variant/30 p-3 text-left">Project</th>
                  <th className="border border-outline-variant/30 p-3 text-left">Message</th>
                  <th className="border border-outline-variant/30 p-3 text-left">Date</th>
                  <th className="border border-outline-variant/30 p-3 text-left">Status</th>
                  <th className="border border-outline-variant/30 p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq) => {
                  const id = String(inq._id);
                  const status = inq.status || 'new';
                  return (
                    <tr key={id} className="hover:bg-surface-container-low/50">
                      <td className="border border-outline-variant/30 p-3">{inquiryName(inq)}</td>
                      <td className="border border-outline-variant/30 p-3">{inquiryEmail(inq)}</td>
                      <td className="border border-outline-variant/30 p-3">{inquiryPhone(inq)}</td>
                      <td className="border border-outline-variant/30 p-3">{inquirySubject(inq)}</td>
                      <td className="border border-outline-variant/30 p-3 max-w-xs truncate" title={inquiryMessage(inq)}>
                        {inquiryMessage(inq) || 'N/A'}
                      </td>
                      <td className="border border-outline-variant/30 p-3">{inquiryDate(inq)}</td>
                      <td className="border border-outline-variant/30 p-3">
                        <select
                          value={status}
                          onChange={(e) => updateInquiryStatus(id, e.target.value)}
                          className="text-sm border rounded px-2 py-1"
                        >
                          <option value="new">New</option>
                          <option value="viewed">Viewed</option>
                          <option value="in-progress">In Progress</option>
                          <option value="contacted">Contacted</option>
                          <option value="resolved">Resolved</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td className="border border-outline-variant/30 p-3 space-x-2 whitespace-nowrap">
                        <a
                          href={`mailto:${inquiryEmail(inq)}`}
                          className="inline-block bg-tertiary text-on-tertiary px-3 py-1 rounded text-xs font-bold"
                        >
                          Reply
                        </a>
                        <button
                          type="button"
                          onClick={() => deleteInquiry(id)}
                          className="inline-block bg-error-container text-error px-3 py-1 rounded text-xs font-bold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {inquiries.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center p-8 text-on-surface-variant">
                      No inquiries yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'newsletter' && (
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-surface-container-low">
                <tr>
                  <th className="border border-outline-variant/30 p-3 text-left">Email</th>
                  <th className="border border-outline-variant/30 p-3 text-left">Date</th>
                  <th className="border border-outline-variant/30 p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((s) => (
                  <tr key={String(s._id)}>
                    <td className="border border-outline-variant/30 p-3">{s.email || s.Email}</td>
                    <td className="border border-outline-variant/30 p-3">
                      {s.date || s.SubscribedDate
                        ? new Date(s.date || s.SubscribedDate!).toLocaleDateString()
                        : 'N/A'}
                    </td>
                    <td className="border border-outline-variant/30 p-3 capitalize">{s.status || s.Status || 'active'}</td>
                  </tr>
                ))}
                {subscribers.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center p-8 text-on-surface-variant">
                      No subscribers yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

import React from 'react';
import Layout from '@/Layouts/Layout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const submit = e => {
    e.preventDefault();
    post(route('password.email'));
  };

  return (
    <Layout>
      <Head title="Forgot Password" />

      <div className="min-h-screen bg-gradient-to-tr from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-10">
          <h1 className="text-4xl font-extrabold text-[#8B0000] text-center mb-6 tracking-wide">
            Forgot Password
          </h1>

          <p className="text-center text-gray-600 mb-8">
            Enter your email address and we will send you a password reset link.
          </p>

          {status && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6" role="alert">
              {status}
            </div>
          )}

          <form onSubmit={submit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-800 font-semibold mb-2 text-lg">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                value={data.email}
                onChange={e => setData('email', e.target.value)}
                placeholder="you@example.com"
                className={`w-full rounded-xl border px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && <p className="text-red-600 mt-2 text-sm">{errors.email}</p>}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full text-[#8B0000] font-bold text-xl underline py-3 rounded-xl border border-[#8B0000] hover:bg-[#8B0000] hover:text-white transition"
            >
              {processing ? 'Sending...' : 'Send Password Reset Link'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

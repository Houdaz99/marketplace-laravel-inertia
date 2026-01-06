import React, { useEffect } from 'react';
import Layout from '@/Layouts/Layout.jsx';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const submit = e => {
    e.preventDefault();
    post(route('login'));
  };

  return (
    <Layout>
      <Head title="Log in" />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-['Roboto']">
        <div className="flex w-[90%] max-w-4xl h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-white transition duration-300">
          {/* FORMULAIRE */}
          <div className="w-1/2 p-10 flex flex-col justify-center items-center border-r-2 border-[#d4af37] shadow-md">
            <div className="mb-8 flex justify-center">
              <img
                src="/images/DALL·E 2025-01-12 14.30.10 - A creative and elegant logo design for an online marketplace named 'Élégance,' specializing in traditional Arab clothing. The logo should include Arab.webp"
                alt="Logo Élégance"
                className="w-24 h-24 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h2 className="text-3xl font-medium text-[#800000] mb-6 text-center">Connexion</h2>

            {status && <div className="text-green-600 text-sm mb-4">{status}</div>}

            <form onSubmit={submit} className="w-full">
              <input
                type="email"
                placeholder="Email"
                value={data.email}
                onChange={e => setData('email', e.target.value)}
                autoComplete="username"
                className="w-full p-4 mb-4 border-2 border-[#d4af37] rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#800000]"
              />
              {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

              <input
                type="password"
                placeholder="Mot de passe"
                value={data.password}
                onChange={e => setData('password', e.target.value)}
                autoComplete="current-password"
                className="w-full p-4 mb-4 border-2 border-[#d4af37] rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#800000]"
              />
              {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}

              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={data.remember}
                  onChange={e => setData('remember', e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="remember" className="text-sm text-gray-700">Se souvenir de moi</label>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full p-4 bg-[#800000] text-white font-bold rounded-xl hover:bg-[#b22222] transition duration-300"
              >
                {processing ? 'Connexion...' : 'Se connecter'}
              </button>

              {canResetPassword && (
                <div className="mt-4 text-center">
                  <Link
                    href={route('password.request')}
                    className="text-sm text-[#800000] hover:text-[#d4af37] hover:underline"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
              )}

              <div className="mt-2 text-center">
                <Link href={route('register')} className="text-sm text-[#800000] hover:text-[#d4af37] hover:underline">
                  S'inscrire
                </Link>
              </div>
            </form>
          </div>

          {/* IMAGE */}
          <div
            className="w-1/2 bg-cover bg-center relative border-l-2 border-[#d4af37]"
            style={{
    backgroundImage: "url('/images/login_image.png')",
  }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-r-2xl"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

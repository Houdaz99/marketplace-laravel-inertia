import React, { useEffect } from 'react';
import Layout from '@/Layouts/Layout.jsx';
import { Head, useForm } from '@inertiajs/react';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'client',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const submit = e => {
    e.preventDefault();
    post(route('register'));
  };

  return (
    <Layout>
      <Head title="Register" />

      <div className="flex justify-center items-center min-h-screen bg-gray-100 font-['Roboto']">
        <div className="flex w-11/12 max-w-4xl h-[600px] bg-white rounded-[18px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.15)] transition duration-300">
          
          {/* Form section */}
          <div className="w-1/2 p-12 flex flex-col justify-center items-center border-r-2 border-[#d4af37] shadow-inner bg-white">
            <div className="mb-8">
              <img
                src="/chemin/vers/ton/logo.webp"
                alt="Logo"
                className="w-[90px] h-[90px] rounded-full shadow-lg hover:scale-110 transition-transform"
              />
            </div>
            <h2 className="text-3xl font-medium text-[#800000] mb-8 text-center tracking-wide">Inscription</h2>
            <form onSubmit={submit} className="w-full">
              <input
                type="text"
                placeholder="Nom"
                value={data.name}
                autoComplete="name"
                onChange={e => setData('name', e.target.value)}
                className="w-full p-4 mb-4 border-2 border-[#d4af37] rounded-lg bg-gray-100 focus:outline-none focus:border-[#800000] focus:shadow-md"
              />
              {errors.name && <div className="text-red-600 text-sm mb-2">{errors.name}</div>}

              <input
                type="email"
                placeholder="Email"
                value={data.email}
                autoComplete="username"
                onChange={e => setData('email', e.target.value)}
                className="w-full p-4 mb-4 border-2 border-[#d4af37] rounded-lg bg-gray-100 focus:outline-none focus:border-[#800000] focus:shadow-md"
              />
              {errors.email && <div className="text-red-600 text-sm mb-2">{errors.email}</div>}

              <input
                type="password"
                placeholder="Mot de passe"
                value={data.password}
                autoComplete="new-password"
                onChange={e => setData('password', e.target.value)}
                className="w-full p-4 mb-4 border-2 border-[#d4af37] rounded-lg bg-gray-100 focus:outline-none focus:border-[#800000] focus:shadow-md"
              />
              {errors.password && <div className="text-red-600 text-sm mb-2">{errors.password}</div>}

              <input
                type="password"
                placeholder="Confirmation du mot de passe"
                value={data.password_confirmation}
                autoComplete="new-password"
                onChange={e => setData('password_confirmation', e.target.value)}
                className="w-full p-4 mb-4 border-2 border-[#d4af37] rounded-lg bg-gray-100 focus:outline-none focus:border-[#800000] focus:shadow-md"
              />
              {errors.password_confirmation && (
                <div className="text-red-600 text-sm mb-2">{errors.password_confirmation}</div>
              )}
              <div className="mb-4">
  <label className="block text-gray-700 mb-2">Vous êtes :</label>
  <div className="flex gap-4">
    <label className="flex items-center">
      <input
        type="radio"
        name="role"
        value="client"
        checked={data.role === 'client'}
        onChange={e => setData('role', e.target.value)}
        className="mr-2"
      />
      Client
    </label>
    <label className="flex items-center">
      <input
        type="radio"
        name="role"
        value="vendeur"
        checked={data.role === 'vendeur'}
        onChange={e => setData('role', e.target.value)}
        className="mr-2"
      />
      Vendeur
    </label>
  </div>
  {errors.role && <div className="text-red-600 text-sm mt-2">{errors.role}</div>}
</div>
              <button
                type="submit"
                disabled={processing}
                className="w-full p-4 bg-[#800000] text-white font-bold text-lg rounded-lg hover:bg-[#b22222] transition duration-300"
              >
                {processing ? 'Inscription...' : 'S’inscrire'}
              </button>

              <div className="text-center mt-5">
                <a href={route('login')} className="text-[#800000] text-sm hover:text-[#d4af37] underline">
                  Déjà inscrit ? Se connecter
                </a>
              </div>
            </form>
          </div>

          {/* Image section */}
          <div className="w-1/2 relative bg-cover bg-center bg-no-repeat border-l-2 border-[#d4af37] rounded-r-[18px]"
               style={{ backgroundImage: "url('/images/login_image.png')" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-r-[18px]"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

import React from 'react';
import { Link, useForm } from '@inertiajs/react';

export default function Navbar({ user }) {
  const { post } = useForm({});

  function logout() {
    post(route('logout'));
  }

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-gradient-to-r from-[#7e0000] via-[#7e0000] to-[#B22222] shadow-md">
      {/* (optionnel) logo à gauche */}
      <div />

      {/* bloc droits utilisateur */}
      {user && (
        <div className="flex gap-6 items-center">
          <Link
            href={route('profile.show', user.id)}
            className="text-[#d4af37] font-semibold hover:text-white transition"
          >
            Profile
          </Link>

          <button
            onClick={logout}
            className="text-[#d4af37] font-semibold hover:text-white transition"
          >
            Log Out
          </button>
        </div>
      )}
    </nav>
  );
}

import React from 'react';
import Layout from '@/Layouts/Layout.jsx';
import ItemCard from '@/Pages/Items/Partials/ItemCard.jsx';
import UserCard from '@/Pages/Profile/Partials/UserCard.jsx';
import { Head } from '@inertiajs/react';

export default function Profile({ auth, user }) {
  return (
    <Layout user={auth.user} hideFooter>
      <Head title={user.name} />

      {/* Section qui remplit tout l'espace vertical */}
      <section className="bg-white py-10 px-6 flex-grow-1 d-flex flex-column justify-between">
        <div className="max-w-5xl mx-auto space-y-10 flex-grow-1">

          {/* Carte utilisateur */}
          <div className="p-6 border-2 border-black rounded-xl bg-gray-50 shadow-md">
            <UserCard user={user} auth={auth} />
          </div>

          {/* Section des articles */}
          {user.items.length > 0 && (
            <div className="p-6 border-2 border-[#d4af37] rounded-xl bg-white shadow-md">
              <h2 className="text-center text-2xl text-[#8B0000] font-bold mb-6 uppercase tracking-wide">
                Articles de {user.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {user.items.map(item => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </Layout>
  );
}

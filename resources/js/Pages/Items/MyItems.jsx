import React from 'react';
import Layout from '@/Layouts/Layout';
import { Head, Link, router } from '@inertiajs/react';

export default function MyItems({ auth, items }) {
  const handleDelete = (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      router.delete(route('items.destroy', id));
    }
  };

  return (
    <Layout user={auth.user}>
      <Head title="Mes Articles" />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-[#8B0000] text-center mb-8">Mes Articles</h1>

        {items.length === 0 ? (
          <p className="text-center text-gray-600">Aucun article trouvé.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white border rounded-lg shadow p-4 flex flex-col justify-between"
              >
                <img
                  src={`/storage/${item.image}`}
                  alt={item.title}
                  className="h-48 w-full object-contain rounded mb-4"
                />
                <h2 className="text-lg font-bold text-[#8B0000] truncate">{item.title}</h2>
                <p className="text-[#d4af37] font-semibold text-xl">{item.price} DH</p>
                <div className="flex justify-between mt-4">
                  <Link
                    href={route('items.edit', item.id)}
                    className="bg-[#d4af37] text-white px-4 py-2 rounded hover:bg-[#b89b29]"
                  >
                    Modifier
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

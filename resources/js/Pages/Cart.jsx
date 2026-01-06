import React from 'react';
import { router, useForm, usePage } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Cart() {
  const { props } = usePage();
  const cart = props.cartItems || {};
  const user = props.auth?.user;
  const isSeller = user?.role === 'vendeur';

  const total = Object.values(cart).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const remove = id => router.delete(route('cart.remove', id));
  const addOne = id => router.post(route('cart.add', id));

  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    price: '',
    description: '',
    category_id: '',
    image: null,
  });

  const handleSubmit = e => {
    e.preventDefault();
    post(route('items.store'), {
      forceFormData: true,
      onSuccess: () => reset(),
    });
  };

  return (
    <Layout user={user}>
      <div className="max-w-5xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-extrabold text-center text-[#8B0000] mb-10 tracking-tight">
          {isSeller ? 'Ajouter un article à vendre' : 'Mon panier'}
        </h1>

        {isSeller ? (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-10 rounded-2xl shadow-2xl space-y-6 border border-gray-100"
            encType="multipart/form-data"
          >
            {[{ label: 'Titre', type: 'text', name: 'title' }, { label: 'Prix', type: 'number', name: 'price' }].map(({ label, type, name }) => (
              <div key={name}>
                <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
                <input
                  type={type}
                  value={data[name]}
                  onChange={e => setData(name, e.target.value)}
                  className="w-full border px-4 py-3 rounded-md shadow-sm focus:ring-2 focus:ring-[#8B0000] outline-none"
                />
                {errors[name] && <p className="text-sm text-red-600">{errors[name]}</p>}
              </div>
            ))}

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={data.description}
                onChange={e => setData('description', e.target.value)}
                rows={4}
                className="w-full border px-4 py-3 rounded-md shadow-sm focus:ring-2 focus:ring-[#8B0000] outline-none"
              />
              {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Catégorie</label>
              <select
                value={data.category_id}
                onChange={e => setData('category_id', parseInt(e.target.value))}
                className="w-full border px-4 py-3 rounded-md shadow-sm focus:ring-2 focus:ring-[#8B0000] outline-none"
              >
                <option value="">-- Sélectionner --</option>
                <option value="1">Homme</option>
                <option value="2">Femme</option>
                <option value="3">Tous</option>
                <option value="4">Soldes</option>
                <option value="5">Meilleures ventes</option>
                <option value="6">Vendre sur Élégence</option>
                <option value="7">Nouveautés</option>
              </select>
              {errors.category_id && <p className="text-sm text-red-600">{errors.category_id}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Image</label>
              <input
                type="file"
                onChange={e => setData('image', e.target.files[0])}
                className="w-full text-base"
              />
              {errors.image && <p className="text-sm text-red-600">{errors.image}</p>}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full py-3 bg-[#8B0000] hover:bg-[#B22222] text-white font-semibold rounded-md transition duration-200"
            >
              {processing ? 'Ajout en cours...' : 'Ajouter l’article'}
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            {Object.keys(cart).length === 0 ? (
              <p className="text-center text-gray-600">Votre panier est vide.</p>
            ) : (
              Object.entries(cart).map(([id, item]) => (
                <div
                  key={id}
                  className="flex justify-between items-center p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <div>
                    <h2 className="font-bold text-[#8B0000]">{item.title}</h2>
                    <p className="text-gray-600 text-sm">
                      {item.price} DH × {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => addOne(id)}
                      className="px-3 py-1 bg-[#8B0000] text-white rounded hover:bg-[#A40000] transition"
                    >
                      +1
                    </button>
                    <button
                      onClick={() => remove(id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700 transition"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))
            )}

            {Object.keys(cart).length > 0 && (
              <>
                <div className="text-right text-xl font-bold text-gray-800">
                  Total : <span className="text-[#d4af37]">{total.toFixed(2)} DH</span>
                </div>

                <button
                  onClick={() => router.get(route('checkout'))}
                  className="block ml-auto px-6 py-3 bg-[#d4af37] hover:bg-[#c39c28] text-white font-semibold rounded-lg transition"
                >
                  Passer la commande
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

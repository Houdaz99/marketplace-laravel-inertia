import React from 'react';
import { useForm, router } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Checkout({ auth, total }) {
  const { data, setData, post, processing, errors } = useForm({
    first_name: '',
    last_name: '',
    card_number: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('orders.store'));
  };

  return (
    <Layout user={auth?.user}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-xl bg-white p-10 rounded-2xl shadow-2xl border border-gray-100">
          <h1 className="text-3xl font-bold text-center text-[#8B0000] mb-8 tracking-tight">
            Paiement sécurisé
          </h1>
          <p className="text-center text-lg text-gray-600 mb-8">
            Total à payer : <span className="text-[#d4af37] font-bold">{total} DH</span>
          </p>

          <form onSubmit={submit} className="space-y-6">
            {[
              { name: 'first_name', placeholder: 'Prénom' },
              { name: 'last_name', placeholder: 'Nom' },
              { name: 'card_number', placeholder: 'Numéro de carte bancaire (fictif)' },
            ].map((field) => (
              <div key={field.name}>
                <input
                  type="text"
                  placeholder={field.placeholder}
                  value={data[field.name]}
                  onChange={(e) => setData(field.name, e.target.value)}
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8B0000] text-base"
                />
                {errors[field.name] && (
                  <p className="text-sm text-red-600 mt-1">{errors[field.name]}</p>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={processing}
              className="w-full py-3 bg-[#8B0000] hover:bg-[#A40000] text-white font-semibold rounded-lg transition duration-200 shadow-md"
            >
              {processing ? 'Traitement...' : 'Confirmer la commande'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

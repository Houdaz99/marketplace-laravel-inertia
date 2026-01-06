import React from 'react';
import { Link } from '@inertiajs/react';

export default function Footer() {
  return (
    <footer className="bg-[#7e0000] text-white py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-16">
        <div className="text-center">
          <h2 className="text-xl text-[#d4af37] mb-3">Besoins d'aide ?</h2>
          <Link href="#" className="text-[#d4af37] hover:text-white transition">
            Contactez-nous
          </Link>
        </div>

        <div className="text-center">
          <h2 className="text-xl text-[#d4af37] mb-3">Moyens de paiement</h2>
          <Link href="#" className="text-[#d4af37] hover:text-white transition">
            Cartes de paiement
          </Link>
        </div>
      </div>
    </footer>
  );
}

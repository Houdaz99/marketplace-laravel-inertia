import React from 'react';
import { Link, Head, useForm, router } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

const Home = ({ auth, items }) => {
    const { data, setData, get } = useForm({ search: '' });

    const handleSearch = (e) => {
        e.preventDefault();
        get(route('items.items'), { preserveState: true });
    };

    const handleAddToCart = (itemId) => {
        if (!auth?.user) {
            router.visit(route('login'));
            return;
        }
        router.post(route('cart.add', itemId));
    };

    const handleDelete = (id) => {
        if (confirm('Voulez-vous vraiment supprimer cet article ?')) {
            router.delete(route('items.destroy', id));
        }
    };

    const getImageSrc = (image) => {
        if (!image) return '/images/default.jpg';
        if (image.startsWith('http://') || image.startsWith('https://')) return image;
        return `/storage/${image}`;
    };

    return (
        <Layout user={auth?.user}>
            <Head>
                <title>Élégence</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
            </Head>

            <nav className="flex flex-wrap justify-between items-center px-4 md:px-8 py-4 bg-white shadow-md sticky top-0 z-50 gap-4">
                <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-start">
                    <img
                        src="/images/DALL·E 2025-01-12 14.30.10 - A creative and elegant logo design for an online marketplace named 'Élégance,' specializing in traditional Arab clothing. The logo should include Arab.webp"
                        alt="Logo Élégence"
                        className="h-12 w-12 object-cover rounded-full shadow"
                    />
                    <span className="text-2xl font-bold text-[#8B0000] tracking-tight">Élégence</span>
                </div>
                <form onSubmit={handleSearch} className="flex items-center w-full md:w-1/2">
                    <input
                        type="text"
                        placeholder="Rechercher des articles..."
                        value={data.search}
                        onChange={(e) => setData('search', e.target.value)}
                        className="w-full px-4 py-2 rounded-l-md bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                    />
                    <button
                        type="submit"
                        className="bg-[#d4af37] hover:bg-[#b89b29] text-white px-4 py-2 rounded-r-md transition"
                    >
                        🔍
                    </button>
                </form>
                <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end">
                    <select className="px-3 py-1 border border-[#d4af37] bg-transparent text-sm rounded-md text-[#8B0000] focus:outline-none">
                        <option value="fr">Français</option>
                        <option value="en">Anglais</option>
                    </select>
                    {auth?.user ? (
                        <>
                            {auth.user.role === 'vendeur' ? (
                                <Link href={route('cart.show')} className="text-sm hover:underline text-[#8B0000]">
                                    Ajouter un article
                                </Link>
                            ) : (
                                <Link href={route('cart.show')} className="text-sm hover:underline text-[#8B0000]">
                                    Panier
                                </Link>
                            )}
                            <Link href={route('profile.edit')} className="text-sm hover:underline text-[#8B0000]">Mon compte</Link>
                        </>
                    ) : (
                        <>
                            <Link href={route('register')} className="text-sm hover:underline text-[#8B0000]">Inscription</Link>
                            <Link href={route('login')} className="text-sm hover:underline text-[#8B0000]">Connexion</Link>
                        </>
                    )}
                </div>
            </nav>

            <nav className="bg-[#8B0000] py-2 border-y-2 border-[#d4af37] text-sm">
                <ul className="flex flex-wrap justify-center gap-4 md:gap-6 px-4">
                    {['Toutes', 'Meilleures ventes', 'Soldes', 'Femme', 'Homme', 'Vendre sur Élégence', 'Nouveautés'].map((cat) => (
                        <li key={cat} className="relative group">
                            <Link href="#" className="text-white font-semibold hover:text-[#d4af37]">
                                {cat}
                                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#d4af37] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <main className="bg-gray-100 px-4 sm:px-6 py-10 min-h-screen font-[Poppins]">
                <section className="container mx-auto mb-12">
                    <h2 className="text-center text-3xl font-semibold text-[#8B0000] mb-10 uppercase tracking-wide">Nos Articles</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {items?.data && items.data.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                            >
                                <Link href={route('items.show', item.id)}>
                                    <img
                                        src={getImageSrc(item.image)}
                                        alt={item.name}
                                        className="w-full h-72 object-contain hover:brightness-110 transition duration-300"
                                    />
                                </Link>
                                <div className="p-4">
                                    <Link href={route('items.show', item.id)}>
                                        <h3 className="text-lg font-semibold text-[#8B0000] hover:text-[#B22222] mb-1 truncate">{item.name}</h3>
                                    </Link>
                                    <p className="text-sm text-gray-500 line-through">{item.old_price} DH</p>
                                    <p className="text-xl text-[#d4af37] font-bold">{item.price} DH</p>

                                    {auth?.user?.role === 'vendeur' ? (
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
                                    ) : (
                                        <button
                                            onClick={() => handleAddToCart(item.id)}
                                            className="mt-3 w-full bg-[#8B0000] hover:bg-[#B22222] text-white font-semibold py-2 rounded-md transition"
                                        >
                                            Ajouter au panier
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {items?.links && (
                        <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
                            {items.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || ''}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-4 py-2 rounded-md border text-sm ${link.active ? 'bg-[#d4af37] text-white' : 'bg-white text-[#8B0000] hover:bg-[#f0f0f0]'} ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                                ></Link>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </Layout>
    );
};

export default Home;

import React from 'react';
import CardContainer from '@/Components/CardContainer.jsx';
import TextareaInput from '@/Components/Inputs/TextareaInput.jsx';
import TextInput from '@/Components/Inputs/TextInput.jsx';
import { useForm } from '@inertiajs/react';
import { Button, Col, Form, Row } from 'react-bootstrap';

export default function EditUserCard({ user, mustVerifyEmail, status }) {
  const { data, setData, patch, errors, processing } = useForm(user);

  const submit = (e) => {
    e.preventDefault();
    patch(route('profile.update'));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg border-2 border-[#d4af37] rounded-2xl p-8 mt-10">
      <header className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#7e0000] uppercase tracking-wider">Modifier le profil</h2>
      </header>

      <Form onSubmit={submit}>
        <Row>
          <Col md="6">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">Nom complet</label>
              <TextInput
                className="mt-1 block w-full border-2 border-black p-2 rounded-md"
                name="name"
                value={data.name}
                onChange={(v) => setData('name', v)}
                error={errors.name}
                formControlProps={{ autoComplete: 'name', required: true }}
              />
              {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
            </div>
          </Col>
          <Col md="6">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Adresse e-mail</label>
              <TextInput
                className="mt-1 block w-full border-2 border-black p-2 rounded-md"
                name="email"
                type="email"
                value={data.email}
                onChange={(v) => setData('email', v)}
                error={errors.email}
                formControlProps={{ autoComplete: 'email', required: true }}
              />
              {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
            </div>
          </Col>
          <Col md="6">
            <div className="mb-4">
              <label htmlFor="location" className="block text-gray-700">Localisation</label>
              <TextInput
                className="mt-1 block w-full border-2 border-black p-2 rounded-md"
                name="location"
                value={data.location}
                onChange={(v) => setData('location', v)}
                error={errors.location}
                formControlProps={{ autoComplete: 'address-level1' }}
              />
              {errors.location && <div className="text-red-500 text-sm mt-1">{errors.location}</div>}
            </div>
          </Col>
          <Col md="6">
            <div className="mb-4">
              <label htmlFor="phone_number" className="block text-gray-700">Téléphone</label>
              <TextInput
                className="mt-1 block w-full border-2 border-black p-2 rounded-md"
                name="phone_number"
                type="tel"
                value={data.phone_number}
                onChange={(v) => setData('phone_number', v)}
                error={errors.phone_number}
                formControlProps={{ autoComplete: 'tel' }}
              />
              {errors.phone_number && <div className="text-red-500 text-sm mt-1">{errors.phone_number}</div>}
            </div>
          </Col>
        </Row>

        <div className="mb-4">
          <label htmlFor="bio" className="block text-gray-700">Biographie</label>
          <TextareaInput
            className="mt-1 block w-full border-2 border-black p-2 rounded-md"
            name="bio"
            value={data.bio}
            onChange={(v) => setData('bio', v)}
            error={errors.bio}
            rows={4}
          />
          {errors.bio && <div className="text-red-500 text-sm mt-1">{errors.bio}</div>}
        </div>

        <div className="flex justify-end">
          <Button
            variant="dark"
            type="submit"
            disabled={processing}
            className="bg-[#7e0000] border-[#d4af37] text-white font-bold px-5 py-2 rounded-full hover:bg-[#b22222] hover:shadow-md transition-all"
          >
            Sauvegarder
          </Button>
        </div>
      </Form>
    </div>
  );
}

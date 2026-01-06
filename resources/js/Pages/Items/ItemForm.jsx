export default function Item({ auth, item, categories }) {
  const { data, setData, errors, post } = useForm({
    ...item,
    image: null,  // ajout ici
  });

  function onFileChange(e) {
    setData('image', e.target.files[0]);
  }

  function submit(e) {
    e.preventDefault();

    if (item?.id) {
      post(route('items.update', item.id), {
        forceFormData: true,  // nécessaire pour upload fichier
      });
    } else {
      post(route('items.create'), {
        forceFormData: true,
      });
    }
  }

  // ... ton reste de code inchangé ...

  return (
    <Layout user={auth.user}>
      <Head title={item?.title ? `Edit ${item.title}` : 'New item'} />

      <CardContainer header={item?.title ? `Edit ${item.title}` : 'New item'}>
        <Form onSubmit={submit}>
          {/* ... tes autres inputs ... */}

          {/* Ajoute ce champ file ici */}
          <Form.Group className="mb-3" controlId="formFile">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={onFileChange} />
            {errors.image && <div className="text-danger">{errors.image}</div>}
          </Form.Group>

          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </CardContainer>
    </Layout>
  );
}

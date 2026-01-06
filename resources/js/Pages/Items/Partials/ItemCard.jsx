import React from 'react';
import { formatDate } from '@/utils.js';
import { Card } from 'react-bootstrap';

const ItemCard = ({ item }) => {
  return (
    <Card className="my-4 p-4">
      {/* ✅ Affichage de l'image */}
      {item.image && (
        <Card.Img
          variant="top"
          src={`/storage/${item.image}`} // ← chemin de l’image
          alt={item.title}
          style={{
    width: '100%',
    height: 'auto',
    display: 'block',
    objectFit: 'contain',
    backgroundColor: '#fff',
  }}
        />
      )}

      <Card.Body>
        <a href={route('items.show', item.id)} className="item-title">
          <Card.Title>{item.title}</Card.Title>
        </a>
        <Card.Text>
          <small className="text-muted">
            {formatDate(item.created_at)} · {item.category.name}
          </small>
        </Card.Text>
        <Card.Text>{item.teaser}</Card.Text>
      </Card.Body>

      <div className="clearfix pt-2 pr-4">
        <div className="float-end">
          <h5>{item.price} €</h5>
        </div>
      </div>
    </Card>
  );
};

export default ItemCard;

import React from "react";
import Card from "./Card";

export default function List({ list, onDrop, onDragOver, onDragStart, onEdit, onSave }) {
  return (
    <div
      id={list.id}
      className="list"
      onDragOver={onDragOver}
      onDrop={e => onDrop(e, list.id)}
    >
      <h2>{list.title}</h2>
      {list.cards.map(card => (
        <Card
          key={card.id}
          card={card}
          listId={list.id}
          onDragStart={onDragStart}
          onEdit={onEdit}
          onSave={onSave}
        />
      ))}
    </div>
  );
}

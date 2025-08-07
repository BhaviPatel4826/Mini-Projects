import React, { useState } from "react";

export default function Card({ card, listId, onDragStart, onEdit, onSave }) {
  const [editValue, setEditValue] = useState(card.content);

  return (
    <div
      draggable
      id={card.id}
      onDragStart={e => onDragStart(e, card.id, listId)}
      onClick={() => onEdit(listId, card.id)}
      className="card"
    >
      {card.isEditing ? (
        <input
          autoFocus
          type="text"
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          onBlur={() => onSave(listId, card.id, editValue)}
          onKeyDown={e => {
            if (e.key === "Enter") e.target.blur();
          }}
          className="edit-input"
        />
      ) : (
        card.content
      )}
    </div>
  );
}

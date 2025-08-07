import React, { useState, useRef } from "react";
import List from "./List";

const initialLists = {
  list1: { id: "list1", title: "To Do", cards: [] },
  list2: { id: "list2", title: "In Progress", cards: [] },
  list3: { id: "list3", title: "Done", cards: [] },
};

export default function TaskBoard() {
  const [lists, setLists] = useState(initialLists);
  const [cardCount, setCardCount] = useState(0);
  const dragItem = useRef(null);
  const dragSourceList = useRef(null);

  function addCard() {
    const newCard = {
      id: `card${cardCount}`,
      content: "Add a task to do...",
      isEditing: false,
    };
    setCardCount(cardCount + 1);

    setLists(prev => {
      const updated = { ...prev };
      updated.list1.cards = [...updated.list1.cards, newCard];
      return updated;
    });
  }

  function onDragStart(e, cardId, sourceListId) {
    dragItem.current = cardId;
    dragSourceList.current = sourceListId;
    e.dataTransfer.effectAllowed = "move";
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  function onDrop(e, targetListId) {
    e.preventDefault();

    const cardId = dragItem.current;
    const sourceListId = dragSourceList.current;
    if (!cardId || !sourceListId) return;
    if (sourceListId === targetListId) return;

    setLists(prev => {
      const updated = { ...prev };
      updated[sourceListId].cards = updated[sourceListId].cards.filter(card => card.id !== cardId);
      const draggedCard = prev[sourceListId].cards.find(card => card.id === cardId);
      if (draggedCard) {
        updated[targetListId].cards = [...updated[targetListId].cards, draggedCard];
      }
      return updated;
    });

    dragItem.current = null;
    dragSourceList.current = null;
  }

  function enableEditing(listId, cardId) {
    setLists(prev => {
      const updated = { ...prev };
      updated[listId].cards = updated[listId].cards.map(card =>
        card.id === cardId ? { ...card, isEditing: true } : card
      );
      return updated;
    });
  }

  function saveCard(listId, cardId, newContent) {
    setLists(prev => {
      const updated = { ...prev };
      updated[listId].cards = updated[listId].cards.map(card =>
        card.id === cardId
          ? { ...card, content: newContent.trim() || card.content, isEditing: false }
          : card
      );
      return updated;
    });
  }

  return (
    <>
      <h1>Task Board</h1>
      <div className="generate-container">
        <button id="generateBtn" onClick={addCard}>Add Task</button>
      </div>

      <div className="board">
        {Object.values(lists).map(list => (
          <List
            key={list.id}
            list={list}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragStart={onDragStart}
            onEdit={enableEditing}
            onSave={saveCard}
          />
        ))}
      </div>
    </>
  );
}

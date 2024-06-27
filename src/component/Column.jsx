import React, { useState } from 'react';
import Card from './Card';
import DropIndicator from './DropIndicator';
import AddCard from './AddCard';
import CustomScrollbar from './CustomScrollbar';

const Column = ({ title, headingColor, column, cards, setCards }) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData('cardID', card.id);
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  }

  const highlightIndicator = (e) => {
    const indicators = getIndicator();
    clearHighlights(indicators);
    console.log(getIndicator());
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = "100";
  }

  const clearHighlights = (els) => {
    const indicators = els || getIndicator();
    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  }

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;
    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );
    return el;
  };

  const getIndicator = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));

  }

  const handleDragLeave = (e) => {
    e.preventDefault();
    setActive(false);
    clearHighlights();
  }

  const handleDragEnd = (e) => {

    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights();
    const indicators = getIndicator();
    const { element } = getNearestIndicator(e, indicators);
    const before = element.dataset.before || '-1';

    if (before !== cardId) {
      let copy = [...cards];
      let cardToMove = copy.find(card => card.id === cardId);
      if (!cardToMove) return;
      cardToMove = { ...cardToMove, column };

      copy = copy.filter(card => card.id !== cardId);
      const moveToBack = before === '-1';

      if (moveToBack) {
        copy.push(cardToMove);
      } else {
        const insertAtIndex = copy.findIndex(card => card.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToMove);
      }

      setCards(copy);
    }
  }

  const filteredCards = cards.filter(card => card.column === column);

  return (
    <div className='w-56'>
      <div className="mb-3 flex items-center justify-between rounded-md bg-gray-900/80 px-3 py-1">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className='rounded text-sm text-neutral-400'> {filteredCards.length}</span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={`flex flex-col h-auto  max-h-[75vh] min-w-56 rounded-lg px-1 pb- 10 transition-colors ${active ? 'bg-gray-700/90' : 'bg-gray-900/20'}`}
      >
        <CustomScrollbar>

          {filteredCards.length === 0 ? (
            <div className="text-sm text-neutral-400 rounded-lg bg-gray-900/80 text-center py-4">
              No Task
            </div>
          ) : (
            filteredCards.map(card => (
              <Card
                key={card.id}
                {...card}
                handleDragStart={handleDragStart}
                setCards={setCards}
              />
            ))
          )}
          <DropIndicator beforeId='-1' column={column} />
        </CustomScrollbar>
        <AddCard column={column} setCards={setCards} />


      </div>
    </div>
  );
}

export default Column;

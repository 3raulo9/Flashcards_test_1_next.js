"use client";  // Add this line to mark the component as a Client Component
import { useState, useEffect } from 'react';
import Flashcard from '../components/Flashcard';
import questions from '../data/questions';

interface Question {
  id: number;
  question: string;
  answer: string;
  isCorrect?: boolean;
}

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards, setCards] = useState<Question[]>(questions);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [flipBack, setFlipBack] = useState(false);
  const [frontQuestion, setFrontQuestion] = useState(cards[0].question);
  const [backAnswer, setBackAnswer] = useState(cards[0].answer);

  const handleAnswer = (isCorrect: boolean) => {
    // Update the current card with the answer status
    const updatedCards = [...cards];
    updatedCards[currentIndex] = {
      ...updatedCards[currentIndex],
      isCorrect: isCorrect,
    };

    // Set the new state for cards and schedule the next index update
    setCards(updatedCards);
    setNextIndex((currentIndex + 1) % cards.length);
    setFrontQuestion(cards[(currentIndex + 1) % cards.length].question); // Update front question immediately
  };

  useEffect(() => {
    if (nextIndex !== null && !flipBack) {
      const timer = setTimeout(() => {
        setCurrentIndex(nextIndex);
        setNextIndex(null);
        setBackAnswer(cards[nextIndex].answer); // Update back answer after flipping back
      }, 700); // Match the duration of the flip animation

      return () => clearTimeout(timer);
    }
  }, [nextIndex, flipBack, cards]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {cards.length > 0 && (
        <Flashcard
          frontQuestion={frontQuestion}
          backAnswer={backAnswer}
          onAnswer={handleAnswer}
          flipBack={flipBack}
          setFlipBack={setFlipBack}
        />
      )}
    </div>
  );
}

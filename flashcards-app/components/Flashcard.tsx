import { useState, useEffect } from 'react';

interface FlashcardProps {
  frontQuestion: string;
  backAnswer: string;
  onAnswer: (isCorrect: boolean) => void;
  flipBack: boolean;
  setFlipBack: (value: boolean) => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ frontQuestion, backAnswer, onAnswer, flipBack, setFlipBack }) => {
  const [flipped, setFlipped] = useState(false);
  const [throwDirection, setThrowDirection] = useState<string | null>(null);

  const handleAnswer = (isCorrect: boolean) => {
    setThrowDirection(isCorrect ? 'right' : 'left');
    setFlipBack(true);
    onAnswer(isCorrect);
  };

  useEffect(() => {
    if (flipBack) {
      const timer = setTimeout(() => {
        setFlipped(false);
        setThrowDirection(null); // Reset the throw direction
        setFlipBack(false);
      }, 700); // Match the duration of the animation

      return () => clearTimeout(timer);
    }
  }, [flipBack]);

  return (
    <div className="flashcard-box"> {/* Parent container */}
      <div
        className={`absolute inset-0 w-full h-full bg-white border-2 border-gray-600 rounded-lg transition-transform duration-700 transform-style-preserve-3d ${flipped ? 'rotate-y-180' : ''
          } ${throwDirection === 'right' ? 'throw-right' : ''} ${throwDirection === 'left' ? 'throw-left' : ''}`}
        onClick={() => !flipBack && setFlipped(!flipped)}
      >
        <div className={`absolute inset-0 flex items-center justify-center h-full backface-hidden`}>
          <p>{frontQuestion}</p>
        </div>
        <div className={`absolute inset-0 flex items-center justify-center h-full backface-hidden transform rotate-y-180`}>
          <p>{backAnswer}</p>
          <div className="absolute bottom-4 flex space-x-4">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={(e) => {
                e.stopPropagation();
                handleAnswer(false);
              }}
            >
              Wrong
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={(e) => {
                e.stopPropagation();
                handleAnswer(true);
              }}
            >
              Correct
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;

import React, { useRef } from 'react';
import AudioPlayer from 'react-audio-player';
import './index.css';

const EmojiCard = (props) => {
  const { item,func,started } = props;
  const audioRef = useRef(null);

  const playAudio = () => {
    if (audioRef.current && started) {
      audioRef.current.audioEl.current.play();
    }
    func(item.id)
  };

  return (
    <li className="emoji">
      <img onClick={playAudio} src={item.emojiUrl} alt={item.emojiName} />
      <AudioPlayer
        ref={audioRef}
        autoPlay={false}
        src={item.audio}
        onPlay={(e) => console.log(e)}
      />

    </li>
  );
};

export default EmojiCard;

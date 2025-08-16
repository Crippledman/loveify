import { useState } from "react";
import { Pause, Play, Heart } from "lucide-react";

const sampleTracks = [
  { id: 1, title: "Summer Dreams", artist: "Lofi Beats", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: 2, title: "Chill Vibes", artist: "DJ Smooth", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: 3, title: "Late Night", artist: "Night Owl", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [audio, setAudio] = useState(null);

  const handlePlayPause = (track) => {
    if (currentTrack?.id === track.id && isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (audio) audio.pause();
      const newAudio = new Audio(track.url);
      newAudio.play();
      setAudio(newAudio);
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const toggleFavorite = (track) => {
    if (favorites.some((f) => f.id === track.id)) {
      setFavorites(favorites.filter((f) => f.id !== track.id));
    } else {
      setFavorites([...favorites, track]);
    }
  };

  const filteredTracks = sampleTracks.filter(
    (track) =>
      track.title.toLowerCase().includes(query.toLowerCase()) ||
      track.artist.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-pink-600">Loveify 🎧</h1>
      <input
        className="w-full p-2 border rounded-lg"
        placeholder="Search for songs or artists..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="grid gap-4">
        {filteredTracks.map((track) => (
          <div key={track.id} className="flex items-center justify-between bg-white shadow rounded-lg p-4">
            <div>
              <p className="font-semibold">{track.title}</p>
              <p className="text-sm text-gray-500">{track.artist}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => handlePlayPause(track)} className="p-2 hover:bg-gray-100 rounded-full">
                {currentTrack?.id === track.id && isPlaying ? <Pause size={20}/> : <Play size={20}/>}
              </button>
              <button onClick={() => toggleFavorite(track)} className="p-2 hover:bg-gray-100 rounded-full">
                <Heart
                  size={20}
                  fill={favorites.some((f) => f.id === track.id) ? "red" : "none"}
                  stroke={favorites.some((f) => f.id === track.id) ? "red" : "currentColor"}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

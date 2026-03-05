import { Hero } from "@/components/custom/Hero";
import { MovieRow } from "@/components/custom/MovieRow";

const mockMovies = [
  { id: 1, title: "The Detective", image: "/thumb-1.png" },
  { id: 2, title: "Future City", image: "/thumb-2.png" },
  { id: 3, title: "Dark Mansion", image: "/thumb-3.png" },
  { id: 4, title: "Action Hero", image: "/thumb-4.png" },
  { id: 5, title: "Lone Peak", image: "/thumb-5.png" },
  { id: 6, title: "Mystic Woods", image: "/thumb-1.png" }, // Reusing images as placeholders
  { id: 7, title: "Neon Nights", image: "/thumb-2.png" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <Hero />
      <div className="flex flex-col gap-12 -mt-20 relative z-10 transition-all duration-300">
        <MovieRow title="Trending Now" movies={mockMovies} />
        <MovieRow title="New Releases" movies={mockMovies.slice().reverse()} />
        <MovieRow title="Thriller Movies" movies={mockMovies.slice(0, 4)} />
        <MovieRow title="Based on your search" movies={mockMovies.slice(2, 6)} />
      </div>
    </div>
  );
}

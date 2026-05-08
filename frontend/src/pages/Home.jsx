import StoryCard from "../components/StoryCard";

const stories = [
  {
    id: 1,
    title: "OpenAI launches GPT",
    points: 120,
    author: "Humna",
    postedAt: "2 hours ago"
  },
  {
    id: 2,
    title: "React 19 Released",
    points: 95,
    author: "John",
    postedAt: "5 hours ago"
  }
];

const Home = () => {
  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-4">
        Top Stories
      </h2>

      <div className="grid gap-4">
        {stories.map((story) => (
          <StoryCard
            key={story.id}
            story={story}
          />
        ))}
      </div>

    </div>
  );
};

export default Home;
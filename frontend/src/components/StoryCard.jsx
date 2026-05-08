const StoryCard = ({ story }) => {
  return (
    <div className="bg-white p-4 rounded shadow">

      <h3 className="text-xl font-semibold">
        {story.title}
      </h3>

      <p className="mt-2">
        Points: {story.points}
      </p>

      <p>
        Author: {story.author}
      </p>

      <p>
        Posted: {story.postedAt}
      </p>

      <button className="mt-4 bg-black text-white px-4 py-2 rounded">
        Bookmark
      </button>

    </div>
  );
};

export default StoryCard;
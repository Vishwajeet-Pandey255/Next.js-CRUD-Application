import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

// Updated getTopics function to ensure consistent return value
const getTopics = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    const data = await res.json();
    // Ensure topics is always an array
    return { topics: data.topics || [] };
  } catch (error) {
    console.error("Error loading topics: ", error);
    // Return an empty array if there's an error
    return { topics: [] };
  }
};

export default async function TopicsList() {
  const { topics } = await getTopics();

  return (
    <>
      {topics.length > 0 ? (
        topics.map((t) => (
          <div
            key={t._id}
            className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
          >
            <div>
              <h2 className="font-bold text-2xl">{t.title}</h2>
              <div>{t.description}</div>
            </div>

            <div className="flex gap-2">
              <RemoveBtn id={t._id} />
              <Link href={`/editTopic/${t._id}`}>
                <a>
                  <HiPencilAlt size={24} />
                </a>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No topics available.</p>
      )}
    </>
  );
}

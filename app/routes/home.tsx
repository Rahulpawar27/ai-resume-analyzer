import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { MetaFunction } from "@remix-run/node";

import { resumes } from "../../constants";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";

export const meta: MetaFunction = () => [
  { title: "Resumind" },
  { name: "description", content: "Smart feedback for your dream job" },
];

export default function Home() {
  const { auth } = usePuterStore();

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Define `next` properly
  const next = location.search.split("next=")[1] || "/";

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate(`/auth?next=${next}`);
    }
  }, [auth.isAuthenticated, navigate, next]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
      <Navbar />
      <section className="main_section container mx-auto px-4 py-16">
        <div className="page-heading text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Track Your Application & Resume Rating
          </h1>
          <h2 className="text-xl text-gray-600">
            Review your submission and check AI-powered feedback
          </h2>
        </div>

        {resumes.length > 0 && (
          <div className="resumes-section grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

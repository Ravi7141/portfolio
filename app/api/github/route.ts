import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("https://api.github.com/users/Ravi7141/repos?sort=updated&per_page=100", {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error("Failed to fetch repos")
    }

    const repos = await response.json()

    // Transform and filter repos
    const projects = repos
      .filter((repo: any) => !repo.fork) // Only original repos
      .map((repo: any) => ({
        title: repo.name
          .replace(/-/g, " ")
          .replace(/_/g, " ")
          .replace(/\b\w/g, (l: string) => l.toUpperCase()),
        description: repo.description || "No description available",
        tags: [repo.language, ...(repo.topics || [])].filter(Boolean).slice(0, 4),
        link: repo.homepage || repo.html_url,
        github: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        updatedAt: repo.updated_at,
      }))

    return NextResponse.json(projects)
  } catch (error) {
    console.error("GitHub API error:", error)
    return NextResponse.json([], { status: 500 })
  }
}

import { env } from "$env/dynamic/public";
import type {
  EventDetail,
  EventsResponse,
  Match,
  MatchOverview,
  MatchStatus,
  MatchesResponse,
  PlayerDetail,
  RankingsResponse,
  TeamDetail,
} from "$lib/types";

const API_BASE_URL = (env.PUBLIC_API_BASE_URL || "http://localhost:3000").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, fetcher: typeof fetch = fetch): Promise<T> {
  let response: Response;
  try {
    response = await fetcher(`${API_BASE_URL}${path}`);
  } catch {
    throw new ApiError("The data service is unavailable. Please try again shortly.", 503);
  }

  if (!response.ok) {
    throw new ApiError(`The data service returned an error (${response.status}).`, response.status);
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new ApiError("The data service returned an invalid response.", 502);
  }
}

const query = (params: Record<string, string | number | undefined>) => {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) search.set(key, String(value));
  }
  return search.toString();
};

export function api2(path: string): string {
  return `${API_BASE_URL}${path}`;
}

export function getMatches(
  type: "schedule" | "results",
  page?: number,
  fetcher?: typeof fetch,
): Promise<MatchesResponse> {
  return request<MatchesResponse>(`/matches?${query({ type, page })}`, fetcher);
}

export async function getMatch(
  id: string,
  fetcher?: typeof fetch,
): Promise<{ match: Match; maps: Array<{ index: number | string; name: string }> | null }> {
  const detail = await request<Match & { maps?: Array<{ index: number | string; name: string }> }>(
    `/matches/${encodeURIComponent(id)}`,
    fetcher,
  );
  const { maps, ...match } = detail;
  return { match, maps: maps ?? null };
}

export function getMatchOverview(id: string, fetcher?: typeof fetch): Promise<MatchOverview> {
  return request<MatchOverview>(`/matches/${encodeURIComponent(id)}/overview`, fetcher);
}

export function getEvents(page?: number, fetcher?: typeof fetch): Promise<EventsResponse> {
  return request<EventsResponse>(`/events?${query({ page })}`, fetcher);
}

export function getEvent(id: string, fetcher?: typeof fetch): Promise<EventDetail> {
  return request<EventDetail>(`/events/${encodeURIComponent(id)}`, fetcher);
}

export function getEventMatches(
  id: string,
  options?: { stage?: string; status?: "upcoming" | "completed" },
  fetcher?: typeof fetch,
): Promise<MatchesResponse> {
  return request<MatchesResponse>(
    `/events/${encodeURIComponent(id)}/matches?${query({ stage: options?.stage, status: options?.status })}`,
    fetcher,
  );
}

export function getRankings(region: string, fetcher?: typeof fetch): Promise<RankingsResponse> {
  return request<RankingsResponse>(`/rankings?${query({ region })}`, fetcher);
}

export function getTeam(id: string, fetcher?: typeof fetch): Promise<TeamDetail> {
  return request<TeamDetail>(`/teams/${encodeURIComponent(id)}`, fetcher);
}

export function getPlayer(id: string, fetcher?: typeof fetch): Promise<PlayerDetail> {
  return request<PlayerDetail>(`/players/${encodeURIComponent(id)}`, fetcher);
}

export type { MatchStatus };

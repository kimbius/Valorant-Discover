export type MatchStatus = "upcoming" | "live" | "completed";

export interface PaginationMeta {
  page: number;
  pageCount: number;
  itemCount: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface MatchTeam {
  id: string;
  name: string;
  score: string | null;
  icon: string | null;
}

export interface MatchEvent {
  id: string;
  name: string;
  round: string;
  icon: string | null;
}

export interface Match {
  id: string;
  status: MatchStatus;
  timestamp: string | null;
  team_one: MatchTeam;
  team_two: MatchTeam;
  event: MatchEvent;
}

export interface MatchesResponse {
  meta: PaginationMeta;
  items: Match[];
}

export interface MatchStatSide {
  overall: number | null;
  attack: number | null;
  defend: number | null;
}

export interface MatchPlayerStat {
  player_name: string;
  player_id: string;
  team: { name: string; icon: string | null; code: string };
  agents: Array<{ name: string; icon: string | null }>;
  rating: MatchStatSide;
  acs: MatchStatSide;
  kills: MatchStatSide;
  deaths: MatchStatSide;
  assists: MatchStatSide;
  kast: MatchStatSide;
  adr: MatchStatSide;
  headshot: MatchStatSide;
  first_kills: MatchStatSide;
  first_deaths: MatchStatSide;
}

export interface RoundEvent {
  index: number;
  icon: string;
  type: string;
  winner: { name: string; icon: string | null } | null;
}

export interface MatchOverviewMap {
  index: number;
  info: { name: string; duration: string };
  stats: MatchPlayerStat[];
  timeline: RoundEvent[];
}

export type MatchOverview = MatchOverviewMap[];

export type MatchDetail = Match | MatchOverview;

export interface EventSummary {
  id: string;
  name: string;
  status: string;
  prizePool: string | null;
  dates: string | null;
  startDate: string | null;
  endDate: string | null;
  regionCode: string | null;
  icon: string | null;
}

export interface EventsResponse {
  meta: PaginationMeta;
  items: EventSummary[];
}

export interface EventParticipant {
  id: string;
  name: string;
  icon: string | null;
  note?: string | null;
  players?: Array<{ id: string; name: string; countryCode: string | null }>;
}

export interface EventStage {
  id: string;
  name: string;
  dates: string | null;
  isActive: boolean;
  groups: Array<{ name: string; standings: unknown[]; brackets: unknown[] }>;
  brackets: EventBracket[];
}

export interface EventBracketTeam {
  id: string;
  name: string;
  score: string | null;
  isWinner: boolean;
  isTBD: boolean;
}

export interface EventBracketMatch {
  id: string;
  round: string;
  teams: EventBracketTeam[];
  timestamp: string | null;
  hasVod: boolean;
}

export interface EventBracket {
  name: string | null;
  upper: EventBracketMatch[];
  lower: EventBracketMatch[];
}

export interface PrizeDistribution {
  place: string;
  prize: string | null;
  team: { id: string; name: string; icon: string | null; region: string | null } | null;
  points: string | null;
  note: string | null;
}

export interface EventDetail {
  id: string;
  name: string;
  description: string | null;
  dates: string | null;
  startDate: string | null;
  endDate: string | null;
  prizePool: string | null;
  prizePoolUsd: number | null;
  location: string | null;
  countryCode: string | null;
  icon: string | null;
  teams: EventParticipant[];
  stages: EventStage[];
  brackets: EventBracket[];
  prizeDistribution: PrizeDistribution[];
}

export interface RankingsTeam {
  id: string;
  name: string;
  icon: string | null;
  country: string | null;
}

export interface RankingItem {
  rank: number;
  team: RankingsTeam;
  rating: number | null;
  streak: { count: number | null; type: "W" | "L" | null } | null;
  lastMatch: {
    id: string;
    playedAt: string | null;
    opponent: { name: string; icon: string | null };
  } | null;
  record: { wins: number; losses: number } | null;
  recordAllTime: { wins: number; losses: number } | null;
  earnings: number | null;
}

export interface RankingsResponse {
  region: string;
  items: RankingItem[];
}

export interface TeamMember {
  id: string;
  alias: string;
  realName: string | null;
  countryCode: string | null;
  icon: string | null;
  isCaptain: boolean;
}

export interface TeamMatchSummary {
  id: string;
  eventName: string;
  eventRound: string | null;
  opponent: string | null;
  opponentIcon: string | null;
  result: string | null;
  date: string | null;
}

export interface TeamDetail {
  id: string;
  name: string;
  tag: string | null;
  icon: string | null;
  country: string | null;
  countryCode: string | null;
  website: string | null;
  twitter: string | null;
  ranking: { rank: number | null; region: string | null; rating: number | null; record: string | null } | null;
  roster: TeamMember[];
  staff: TeamMember[];
  upcomingMatches: TeamMatchSummary[];
  recentResults: TeamMatchSummary[];
}

export interface PlayerTeam {
  id: string;
  name: string;
  icon: string | null;
  period: string | null;
}

export interface PlayerAgent {
  agent: string;
  icon: string | null;
  maps: number | null;
  pickRate: number | null;
  rounds: number | null;
  rating: number | null;
  acs?: number | null;
  kd?: number | null;
  kast?: number | null;
  adr?: number | null;
  kpr?: number | null;
  apr?: number | null;
  fkFd?: number | null;
  kills?: number | null;
  deaths?: number | null;
  assists?: number | null;
  firstKills?: number | null;
  firstDeaths?: number | null;
}

export interface PlayerDetail {
  id: string;
  alias: string;
  realName: string | null;
  icon: string | null;
  country: string | null;
  countryCode: string | null;
  twitter: string | null;
  twitch: string | null;
  currentTeams: PlayerTeam[];
  pastTeams: PlayerTeam[];
  agents: PlayerAgent[];
}

export interface NewsSegment {
  title: string;
  description: string;
  author: string;
  url_path: string;
}

export interface Event {
  id: string;
  name: string;
  prizePool: string | null;
  icon: string | null;
}

export interface Player {
  player_link: string;
  player_name: string;
  player_team_initials: string;
  rating: string | number;
  headshot_percentage: string | number;
  clutch_success_percentage: string | number;
  kills_per_round: string | number;
  assists_per_round: string | number;
  kills: string | number;
  deaths: string | number;
  rounds_played: string | number;
}

export const roundWithScale = (value, scale) => {
  return Math.round(value * Math.pow(10, scale)) / Math.pow(10, scale);
};

export const grouthTypeDisplay = (type) => {
  const types = ["超早熟", "早熟", "普通", "晩成", "超晩成"];
  return types[type] || "不明";
};

export const currentGrouthTypeDisplay = (type) => {
  const types = ["成長期前", "成長期", "全盛期", "衰退期"];
  return types[type] || "不明";
};

export const directionTypeDisplay = (type) => {
  const types = ["↑", "→", "↘️", "↓", "↙️", "←"];
  return types[type] || "不明";
};

export const positionCode = (type) => {
  const types = ["1番手先発", "2番手先発", "3番手先発", "4番手先発","5番手先発","6番手先発",
    "1番手中継ぎ", "2番手中継ぎ", "3番手中継ぎ", "4番手中継ぎ","5番手中継ぎ","6番手中継ぎ","クローザー",
    "キャッチャー", "ファースト", "セカンド", "ショート","サード","レフト","センター","ライト",

  ];
  return types[type] || "その他";
};

const DRAFT_TYPE_LABEL: Record<string, string> = {
  high_school: '高卒',
  university: '大卒',
  independent_league: '独立',
  corporate: '社会人',
  other: 'その他'
}

export const draftType = (type?: string) => {
  return DRAFT_TYPE_LABEL[type ?? 'other'] ?? 'その他'
}

export const buildDraftText = (player: {
  draft_year?: number;
  draft_rank?: number;
  draft_type?: string;
}) => {
  if (!player.draft_year) return '-';

  return `${player.draft_year}年 ${player.draft_rank}位 ${draftType(player.draft_type)}`;
};

export const formatAverage = (num) => {
  if (num == null) return null;
  return num.toFixed(3).slice(1); // toFixed(3)で小数点以下3桁にし、slice(1)で最初の0を除く
};

export const formatIndicator = (num) => {
  if (num == null) return null;
  return num.toFixed(2); // toFixed(3)で小数点以下3桁にし、slice(1)で最初の0を除く
};

export const categorizePlayersByAgeAndPosition = (players) => {
  const categorizedPlayers = {};

  players.forEach((player) => {
    const age = player.player_season.age;
    const name = player.name;

    if (!categorizedPlayers[age]) {
      categorizedPlayers[age] = {
        pitcher: [],
        catcher: [],
        infielder: [],
        outfielder: [],
      };
    }

    const positions = categorizedPlayers[age];
    if (player.player_season.is_starter || player.player_season.is_relief || player.player_season.is_closer) {
      positions.pitcher.push(name);
    } else if (player.player_season.is_catcher) {
      positions.catcher.push(name);
    } else if (player.player_season.is_first || player.player_season.is_second || player.player_season.is_third || player.player_season.is_short) {
      positions.infielder.push(name);
    } else if (player.player_season.is_outfielder) {
      positions.outfielder.push(name);
    }
  });

  return categorizedPlayers;
};



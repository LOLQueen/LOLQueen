'use strict';

export default function transform(store, participant) {

    const RecentGamesInstance = this;

    var stats = participant.stats;
    var player = {
        championId: participant.championId,
        summonerSpells: [{ id: participant.spell1Id } , {id : participant.spell2Id} ],
        teamId: participant.teamId,
        role: participant.timeline.lane,
        kills: stats.kills,
        deaths: stats.deaths,
        assists: stats.assists,
        champLevel: stats.champLevel,
        creeps: {
            ownJungle: stats.neutralMinionsKilledTeamJungle,
            enemyJungle: stats.neutralMinionsKilledEnemyJungle,
            minions: stats.minionsKilled
        },
        goldEarned: stats.goldEarned,
        items: [
            stats.item0,
            stats.item1,
            stats.item2,
            stats.item3,
            stats.item4,
            stats.item5
        ],
        trinket: stats.item6,
        damageDealt: stats.totalDamageDealtToChampions,
        wardsPlaced: stats.wardsPlaced,
        wardsKilled: stats.wardsKilled,
        winner: stats.winner
    }

    return player;

};
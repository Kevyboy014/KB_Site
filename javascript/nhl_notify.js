/* This is a javascript file to notify the user whenever an NHL team scores
 * It should ask for permission to use Mac OS X's notification center, if
 * available, and otherwise simply display javascript alerts.
 * */


// We use a hash to keep track of all of the current games,
// using the game id as the key. This way, we can make sure
// don't get mixed up between games
var my_games = {};

// We use a hash to keep track of notifications, so we can
// ensure there is only one notification per game in the
// notification center
var notifications = {};

check_updates();

window.setInterval(function(){check_updates()}, 60000);

function notify(heading, message, url, id) {
    console.log("About to notify " + message);
    if ('webkitNotifications' in window) {
        if (webkitNotifications.checkPermission() == 0) {
            var notification = new Notification(heading, {
                'body':message,
            });
            notification.onclick = function() {
                window.location=url;
            }
            // Make sure we don't display more than one notification per game
            if (notifications[id]) {
                notifications[id].close();
            }
            notifications[id] = notification;
            notification.show();
        }
        else if (webkitNotifications.checkPermission() == 1) {
            webkitNotifications.requestPermission();
        }
        else {
            alert (heading + "\n" + message);
        }
    }
    else {
        alert (heading + "\n" + message);
    }
}

function needs_update (my_game, game) {
    if (game.ats > my_game.ats ||
        game.hts > my_game.hts) {
        return true;
    }
    return true;
}

function current_score (game) {
    return game.htn + ": " + game.hts + "\n" + game.atn + ": " + game.ats;
}

function check_updates () {
    $.get('http://live.nhle.com/GameData/RegularSeasonScoreboardv3.jsonp', function () {}, 'jsonp');
    // The return from this request automatically calls "loadScoreboard"
}

function loadScoreboard(data) {
    var url = 'http://www.nhl.com';
    
    var games = data.games;
    for (var i = 0; i < games.length; i++) {
        // If it's a game that's currently on
        var id = games[i].id;
        if (games[i].bs == 'LIVE') {
            // If we've already added this game to the array

            if (my_games[id]) {
                console.log("Already have game at key " + id +
                       " with id = " + my_games[id].id);

                if (needs_update(my_games[id], games[i])) {
                    // We need to update the game

                    if (games[i].hts > my_games[id].hts &&
                        games[i].ats > my_games[id].ats) {
                        // Both teams scored
                        notify ("Goals!", "Both teams have scored\n" + current_score(games[i]), url, id);
                    }
                    else if (games[i].hts > my_games[id].hts) {
                        // Home team has scored
                        notify ('Goal!', games[i].htn + " scored!\n" + current_score(games[i]), url, id);
                    }
                    else if (games[i].ats > my_games[id].ats) {
                        // Away team has scored
                        notify ('Goal!', games[i].atn + " scored!\n" + current_score(games[i]), url, id);
                    }
                    my_games[id] = games[i];

                }
            }
            else { // New game
                console.log("Adding new game to key " + id +
                            " with id = " + games[i].id);

                notify ('Current Score', current_score(games[i]), url, id);
                my_games[id] = games[i];
            }
        }
    }
}
cordova.define("cordova-plugin-music-controls.MediaSession", function (require, exports, module) {
  var mediaSession = {
    updateCallback: function () {},

    create: function (data, successCallback, errorCallback) {
      data.artist = !isUndefined(data.artist) ? data.artist : "";
      data.track = !isUndefined(data.track) ? data.track : "";
      data.album = !isUndefined(data.album) ? data.album : "";
      data.cover = !isUndefined(data.cover) ? data.cover : "";
      data.date = !isUndefined(data.date) ? data.date : "";
      data.trackid = !isUndefined(data.trackid) ? data.trackid : "";
      data.genre = !isUndefined(data.genre) ? data.genre : "";
      data.mediauri = !isUndefined(data.mediauri) ? data.mediauri : "";
      data.ticker = !isUndefined(data.ticker) ? data.ticker : "";
      data.duration = !isUndefined(data.duration) ? data.duration : 0;
      data.rating = !isUndefined(data.rating) ? data.rating : false;
      data.elapsed = !isUndefined(data.elapsed) ? data.elapsed : 0;
      data.isPlaying = !isUndefined(data.isPlaying) ? data.isPlaying : true;
      data.hasPrev = !isUndefined(data.hasPrev) ? data.hasPrev : true;
      data.hasNext = !isUndefined(data.hasNext) ? data.hasNext : true;
      data.hasSkipForward = !isUndefined(data.hasSkipForward) ? data.hasSkipForward : false;
      data.hasSkipBackward = !isUndefined(data.hasSkipBackward) ? data.hasSkipBackward : false;
      data.hasScrubbing = !isUndefined(data.hasScrubbing) ? data.hasScrubbing : false;
      data.skipForwardInterval = !isUndefined(data.skipForwardInterval) ? data.skipForwardInterval : 0;
      data.skipBackwardInterval = !isUndefined(data.skipBackwardInterval) ? data.skipBackwardInterval : 0;
      data.hasClose = !isUndefined(data.hasClose) ? data.hasClose : false;
      data.dismissable = !isUndefined(data.dismissable) ? data.dismissable : false;
      data.playIcon = !isUndefined(data.playIcon) ? data.playIcon : "";
      data.pauseIcon = !isUndefined(data.pauseIcon) ? data.pauseIcon : "";
      data.prevIcon = !isUndefined(data.prevIcon) ? data.prevIcon : "";
      data.nextIcon = !isUndefined(data.nextIcon) ? data.nextIcon : "";
      data.closeIcon = !isUndefined(data.closeIcon) ? data.closeIcon : "";
      data.notificationIcon = !isUndefined(data.notificationIcon) ? data.notificationIcon : "";

      cordova.exec(successCallback, errorCallback, "MediaSession", "create", [
        data
      ]);
    },

    updateIsPlaying: function (isPlaying, successCallback, errorCallback) {
      cordova.exec(
        successCallback,
        errorCallback,
        "MediaSession",
        "updateIsPlaying",
        [{
          isPlaying: isPlaying
        }]
      );
    },
    updateElapsed: function (args, successCallback, errorCallback) {
      cordova.exec(
        successCallback,
        errorCallback,
        "MediaSession",
        "updateElapsed",
        [{
          elapsed: args.elapsed,
          isPlaying: args.isPlaying === undefined ? "" : !!args.isPlaying
        }]
      );
    },
    updateDismissable: function (dismissable, successCallback, errorCallback) {
      cordova.exec(
        successCallback,
        errorCallback,
        "MediaSession",
        "updateDismissable",
        [{
          dismissable: dismissable
        }]
      );
    },

    destroy: function (successCallback, errorCallback) {
      cordova.exec(
        successCallback,
        errorCallback,
        "MediaSession",
        "destroy",
        []
      );
    },

    updatePosition: function (position, successCallback, errorCallback) {
      cordova.exec(
        successCallback,
        errorCallback,
        "MediaSession",
        "position",
        [{
          time: position
        }]
      );
    },

    // Register callback
    subscribe: function (onUpdate) {
      mediaSession.updateCallback = onUpdate;
    },
    // Start listening for events
    listen: function () {
      cordova.exec(
        mediaSession.receiveCallbackFromNative,
        function (res) {},
        "MediaSession",
        "watch",
        []
      );
    },
    receiveCallbackFromNative: function (messageFromNative) {
      mediaSession.updateCallback(messageFromNative);
      cordova.exec(
        mediaSession.receiveCallbackFromNative,
        function (res) {},
        "MediaSession",
        "watch",
        []
      );
    }
  };

  function isUndefined(val) {
    return val === undefined;
  }

  module.exports = mediaSession;
});

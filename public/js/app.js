var app = angular.module('app', []);

app.factory('socketio', ['$rootScope', function ($rootScope) {
  // From http://briantford.com/blog/angular-socket-io
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  };
}]);

app.controller('ChatController', function ($scope, socketio) {
  $scope.messages = [];

  socketio.on('message', function (data) {
    $scope.messages.push(data);
  });

  $scope.sendMessage = function (message) {
    socketio.emit('message', message);
    $scope.message = '';
  };

});

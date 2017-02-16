var app = angular.module('appModule', ['ui.bootstrap']);
app.controller('filterController', function ($scope, $http) {
    $http.get('data/music_singers.json').success(function (data) {
        $scope.singers = data;


        //сортировка по имени дате жанру и году
        $scope.sortType = 'Artist';
        $scope.sortReverse = false;

        // лимит вывода информации на пользователю
        $scope.limitValue = 4; //$scope.singers.length.toString()
        $scope.limitRange = [];

        $scope.limitFive = function () {
            $scope.limitValue = '5';
        };
        $scope.limitTen = function () {
            $scope.limitValue = '10';
        };

        $scope.limitFifteen = function () {
            $scope.limitValue = '15';
        };

        $scope.limitTwenty = function () {
            $scope.limitValue = '20';
        };


        for (var i = 0; i <= $scope.singers.length; i++) {
            $scope.limitRange.push(i.toString())
        }


        // формирование списка вывода в select artists

        $scope.artistRepeat = $scope.singers.map(function (elem) {
            return elem.Artist;
        });


        // behavior преобразование массива если elem повторяется
        $scope.noRepeatArtist = function () {
            $scope.artists = [];
            deleteDouble:
                for (var i = 0; i < $scope.artistRepeat.length; i++) {
                    var item = $scope.artistRepeat[i];
                    for (var j = 0; j < $scope.artists.length; j++) {
                        if ($scope.artists[j] == item) continue deleteDouble;
                    }
                    $scope.artists.push(item);
                }

            return $scope.artists
        };

        $scope.noRepeatArtist();
        $scope.artists.sort();
        $scope.selectArtist = '';


        //формирование списка genre select

        $scope.genreRepeat = $scope.singers.map(function (elem) {
            return elem.Genre;
        });


        $scope.noRepeatGenre = function () {
            $scope.genres = [];
            deleteDouble:
                for (var i = 0; i < $scope.genreRepeat.length; i++) {
                    var item = $scope.genreRepeat[i];
                    for (var j = 0; j < $scope.genres.length; j++) {
                        if ($scope.genres[j] == item) continue deleteDouble;
                    }
                    $scope.genres.push(item);
                }

            return $scope.genres
        };

        $scope.noRepeatGenre();
        $scope.genres.sort();
        $scope.selectGenre = '';

        //формирование списка genre year

        $scope.years = [];

        for (var i = 1980; i <= 2017; i++) {
            $scope.years.push(i);
        }

        $scope.selectYear = '';

        $scope.reset = function () {
            $scope.selectYear = '';
            $scope.selectGenre = '';
            $scope.selectArtist = '';
        };
        // create pagination

        $scope.aaa = [];
        $scope.currentPage = 1;
        $scope.maxSize = 4;

        $scope.makeTodos = function () {
            $scope.todos = [];
            for (i = 1; i <= 1000; i++) {
                $scope.todos.push({text: 'todo ' + i, done: false});
            }
        };
        $scope.makeTodos();

        $scope.numPages = function () {
            return Math.ceil($scope.singers.length / $scope.limitValue);
        };

        $scope.$watch('currentPage + limitValue', function () {
            var begin = (($scope.currentPage - 1) * $scope.limitValue)
                , end = begin + $scope.limitValue;

            $scope.aaa = $scope.singers.slice(begin, end);
        });

    });


});


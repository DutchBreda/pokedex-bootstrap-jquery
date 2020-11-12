var pokemonRepository = (function () {
    var t = [],
        e = "https://pokeapi.co/api/v2/pokemon/?limit=175";
    function n(e) {
        t.push(e);
    }
    const o = (t) => ("string" != typeof t ? "" : t.charAt(0).toUpperCase() + t.slice(1));
    function a(t) {
        var e = t.detailsUrl;
        return $.ajax(e)
            .then(function (e) {
                (t.imageUrl = e.sprites.front_default), (t.height = e.height), 2 === e.types.length ? ((t.type0 = e.types[1].type.name), (t.type1 = e.types[0].type.name)) : (t.type0 = e.types[0].type.name);
            })
            .catch(function (t) {
                console.error(t);
            });
    }
    function i(t) {
        a(t).then(function () {
            p(t);
        });
    }
    function p(t) {
        var e = $(".modal-body"),
            n = $(".modal-title");
        e.empty(), n.empty();
        var a = $("<h1>" + o(t.name) + "</h1>"),
            i = $("<p>Height: " + t.height / 10 + " m</p>"),
            p = $("<img class='modal-image' src='" + t.imageUrl + "'>");
        if (t.type0 && t.type1) var s = $("<p>Types: " + o(t.type0) + ", " + o(t.type1) + "</p>");
        else s = $("<p>Type: " + o(t.type0) + "</p>");
        n.append(a), e.append(p), e.append(s), e.append(i);
    }
    return {
        add: n,
        getAll: function () {
            return t;
        },
        addListItem: function (t) {
            if (t.name) {
                var e = $(".pokemon-list"),
                    n = $("<li></li>"),
                    a = $("<div class='col-1'></div><button type='button' class='btn btn-danger button-class col-10' data-toggle='modal' data-target='#sampleModal'>" + o(t.name) + "</button><div class='col-1'></div>");
                e.append(n),
                    n.append(a),
                    a.on("click", function () {
                        i(t);
                    });
            }
        },
        showDetails: i,
        loadList: function () {
            return $.ajax(e)
                .then(function (t) {
                    t.results.forEach(function (t) {
                        n({ name: t.name, detailsUrl: t.url });
                    });
                })
                .catch(function (t) {
                    console.error(t);
                });
        },
        loadDetails: a,
        showModal: p,
    };
})();


pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (t) {
        pokemonRepository.addListItem(t);
    });
}),
    $(document).ready(function () {
        $("#myInput").on("keyup", function () {
            var t = $(this).val().toLowerCase();
            $("#myDiv *").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(t) > -1);
            });
        });
    });

function cariMovie() {
    $('#list-movie').html('');
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '2a3127ea',
            's': $('#input-search').val()
        },
        success: function (hasil) {
            if (hasil.Response == "True") {
                let movies = hasil.Search;

                $.each(movies, function (i, data) {
                    $('#list-movie').append(`
                        <div class="col-md-4">
                            <div class="card mb-3">
                                <img src="`+ data.Poster + `" class="card-img-top">
                                <div class="card-body">
                                    <h5 class="card-title">`+ data.Title + `</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">`+ data.Year + `</h6>
                                    <a href="#" class="card-link see-detail" data-id="`+ data.imdbID + `" data-toggle="modal" data-target="#exampleModal">See Detail..</a>
                                </div>
                            </div>
                        </div>
                    `);
                });

                $('#input-search').val('');
            } else {
                $('#list-movie').html(`
                    <div class="col">
                        <h1 class="text-center">
                        `+ hasil.Error + `
                    </h1>
                </div>`);
            }
        }
    });
}

$('#button-search').on('click', function () {
    cariMovie();
});

$('#input-search').on('keyup', function (e) {
    if (e.keyCode === 13) {
        cariMovie();
    }
});

$('#list-movie').on('click', '.see-detail', function () {
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '2a3127ea',
            'i': $(this).data('id')
        },
        success: function (movie) {
            if (movie.Response === "True") {
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-4">
                                <img src="`+ movie.Poster + `" class="img-fluid">
                            </div>
                            <div class="col-8">
                            <div class="list-group">
                            <div class="list-group-item">
                                <h4>`+ movie.Title + `</h4>
                            </div>
                            <div class="list-group-item">
                                Released : `+ movie.Released + `
                            </div>
                            <div class="list-group-item">
                                Genre : `+ movie.Genre + `
                            </div>
                            <div class="list-group-item">
                                Actors : `+ movie.Actors + `
                            </div>
                            <div class="list-group-item">
                                Plot : `+ movie.Plot + `
                            </div>
                        </div>
                            </div>
                        </row>
                    </div>
                `);
            }
        }
    });
});
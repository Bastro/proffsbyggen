// Kör JavaScript när dom/htmlen är klar för att inte sätta events på något som inte finns redan.
$(document).ready(function () {

    popTable();

    // Lägger in alla värden i tablet.
    function popTable() {
        $.getJSON('/accountlistexceptuser', function (data) {

            var tableContent = '';

            $.each(data, function () {
                tableContent += '<tr>';
                tableContent += '<td class="text-center">' + this.username + '</td>';
                tableContent += '<td class="text-center">' + this.type + '</td>';
                // Bryter ner raden så den inte blir så lång
                tableContent += '<td>';
                tableContent += '<center>';
                tableContent += '<a href="#">';
                if (this.enable === false)
                    tableContent += '<label data-username="' + this.username + '" data-enable="' + this.enable + '" class="label success activateUser">Aktivera</label>';
                if (this.enable === true)
                    tableContent += '<label data-username="' + this.username + '" data-enable="' + this.enable + '" class="label orange activateUser">Pausa</label>';
                tableContent += '<label data-username="' + this.username + '" data-reveal-id="myModal" class="label alert deleteUser">Radera</label>';
                tableContent += '</a>';
                tableContent += '</center>';
                tableContent += '</td>';
                tableContent += '</tr>'
            });

            // Tar bort allt i table för att inte skapa dubbleter.
            $('#userList').empty();
            // Lägger till alla värden i table.
            $('#userList').append(tableContent);

            // Aktivera/Pausa användare
            $('.activateUser').on('click', function () {
                var username = $(this).attr('data-username');
                var enable = $(this).attr('data-enable');
                changeEable(username, enable);
            });

            // När man klickar på en knapp med classen deleteuser så skickar man användarnamnet till function createModel.
            $('.deleteuser').on('click', function () {
                var userName = $(this).attr('data-username');
                createModal(username);
            });
        });
    }

    // Skapar en model för att inte man ska råka klicka ta bort.
    function createModal(username) {
        var modalContent = '';

        modalContent += '<h2>Varning!</h2>'
        modalContent += '<p class="lead">Är du säker på att du vill ta bort ' + userName + '?</p>'
        modalContent += '<div>'
        modalContent += '<a id="modalCancel" class="button secondary">Avbryt</a>'
        modalContent += '<a id="modalConfirm" class="button alert">Bekräfta</a>'
        modalContent += '</div>'
        modalContent += '<a class="close-reveal-modal">&#215;</a>'

        $('#myModal').empty();
        $('#myModal').append(modalContent);

        // Så model försvinner när man clickar på avbryt.
        $('#modalCancel').on('click', function () {
            $('#myModal').foundation('reveal', 'close');
        })

        // Model försvinner och skickar användarnamnet till deleteUser.
        $('#modalConfirm').on('click', function () {
            $('#myModal').foundation('reveal', 'close');
            deleteUser(username);
        })
    }

    // Aktiverar/Pausar användaren
    function changeEable(username, enable) {
        // Bool värdet i string format, så blir tvungen och göra en if else istället för !enable
        if (enable === 'false') {
            enable = true;
        } else {
            enable = false;
        }

        var data = {
            username: username,
            enable: enable
        };
        $.ajax({
            url: '/userchangeenable',
            type: 'POST',
            data: data,
            success: function () {
                console.log('succes');
            },
            error: function () {
                console.log('fail');
            }
        });
        // Timeout så ingen crashar
        window.setTimeout(popTable, 500);
    }

    // Radera User
    function deleteUser(username) {
        // Använder ajax för att ta bort användaren
        $.ajax({
            type: 'DELETE',
            url: '/deleteuser/' + username
            // Får ett promis när ajax requesten är klar
        }).done(function (response) {
            // Kollar om det gick och ta bort användaren, annars skickar ett felmedelenade
            if (response.msg === '') {} else {
                alert('Error: ' + response.msg);
            }
            // Uppdaterar table
            popTable();
        });

    }

});

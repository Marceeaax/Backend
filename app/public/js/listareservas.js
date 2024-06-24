$(document).ready(function() {
    // Obtener restaurantes para el filtro
    $.get('/api/restaurante', function(data) {
        if (data.length === 0) {
            console.log("No se encontraron restaurantes.");
        } else {
            console.log("Restaurantes obtenidos:", data);
            data.forEach(restaurante => {
                $('#restaurante').append(`<option value="${restaurante.id}">${restaurante.nombre}</option>`);
            });
        }
    }).fail(function(err) {
        console.log("Error al obtener restaurantes:", err);
    });

    // Filtrar reservaciones
    $('#filterForm').on('submit', function(e) {
        e.preventDefault();
        const filtro = {
            RestauranteId: $('#restaurante').val(),
            fecha: $('#fecha').val(),
            ClienteId: $('#cliente').val().trim() ? $('#cliente').val().trim() : null
        };

        $.post('/api/reservacion/filter', filtro, function(data) {
            const tbody = $('#reservasTable tbody');
            tbody.empty();
            if (data.length === 0) {
                tbody.append('<tr><td colspan="8" class="text-center">No se encontraron reservaciones.</td></tr>');
            } else {
                data.forEach(reserva => {
                    tbody.append(`
                        <tr>
                            <td>${reserva.id}</td>
                            <td>${reserva.fecha}</td>
                            <td>${reserva.horaInicio}</td>
                            <td>${reserva.horaFin}</td>
                            <td>${reserva.nombreRestaurante}</td>
                            <td>${reserva.nombreMesa}</td>
                            <td>${reserva.capacidad}</td>
                            <td>${reserva.nombreCliente}</td>
                        </tr>
                    `);
                });
            }
        }).fail(function(err) {
            console.log("Error al filtrar reservaciones:", err);
        });
    });
});

$(document).ready(function() {
    let clienteId = null; // Variable para almacenar el ID del cliente

    // Obtener la fecha de hoy en formato yyyy-mm-dd
    const today = new Date().toISOString().split('T')[0];
    $('#fecha').attr('min', today);

    // Obtener restaurantes
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

    // Habilitar campos secuencialmente
    $('#restaurante').change(function() {
        if ($(this).val() !== "") {
            $('#fecha').prop('disabled', false);
        } else {
            $('#fecha').prop('disabled', true);
            $('#horas .form-check-input').prop('disabled', true);
            $('#mesas').prop('disabled', true);
            $('#cedula').prop('disabled', true);
            $('button[type="submit"]').prop('disabled', true);
        }
    });

    $('#fecha').change(function() {
        if ($(this).val() !== "") {
            $('#horas .form-check-input').prop('disabled', false);
        } else {
            $('#horas .form-check-input').prop('disabled', true);
            $('#mesas').prop('disabled', true);
            $('#cedula').prop('disabled', true);
            $('button[type="submit"]').prop('disabled', true);
        }
    });

    $('#horas .form-check-input').change(function() {
        const selectedHours = $('#horas .form-check-input:checked').map(function() {
            return this.value;
        }).get();
        if (selectedHours.length > 0) {
            $('#mesas').prop('disabled', false);
        } else {
            $('#mesas').prop('disabled', true);
            $('#cedula').prop('disabled', true);
            $('button[type="submit"]').prop('disabled', true);
        }
    });

    $('#mesas').change(function() {
        if ($(this).val() !== "") {
            $('#cedula').prop('disabled', false);
        } else {
            $('#cedula').prop('disabled', true);
            $('button[type="submit"]').prop('disabled', true);
        }
    });

    $('#cedula').on('input', function() {
        if ($(this).val().trim() !== "") {
            $('button[type="submit"]').prop('disabled', false);
        } else {
            $('button[type="submit"]').prop('disabled', true);
        }
    });

    // Verificar cédula del cliente
    $('#cedula').on('blur', function() {
        const cedula = $(this).val();
        if (cedula) {
            $.get(`/api/cliente/cedula/${cedula}`, function(data) {
                if (data) {
                    clienteId = data.id; // Guardar el ID del cliente
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Cliente No Encontrado',
                        text: 'Deberá registrarse'
                    }).then(() => {
                        // Mostrar el modal para registrar cliente
                        $('#registroClienteModal').modal('show');
                    });
                }
            }).fail(function(err) {
                console.log("Error al verificar cédula del cliente:", err);
            });
        }
    });

    // Manejar el registro del cliente
    $('#registroClienteForm').on('submit', function(e) {
        e.preventDefault();
        const cedula = $('#cedula').val();
        const nombre = $('#nombreCliente').val();
        const apellido = $('#apellidoCliente').val();

        $.post('/api/cliente', { cedula: cedula, nombre: nombre, apellido: apellido }, function(data) {
            clienteId = data.id; // Guardar el ID del cliente registrado
            Swal.fire({
                icon: 'success',
                title: 'Cliente Registrado',
                text: 'El cliente ha sido registrado con éxito.'
            });
            $('#registroClienteModal').modal('hide');
        }).fail(function(err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al registrar el cliente.'
            });
            console.log("Error al registrar el cliente:", err);
        });
    });

    // Enviar reserva
    $('#reservaForm').on('submit', function(e) {
        e.preventDefault();
        const selectedHours = $('#horas .form-check-input:checked').map(function() {
            return this.value;
        }).get();

        if (clienteId === null) {
            Swal.fire({
                icon: 'warning',
                title: 'Cliente no registrado',
                text: 'Por favor, verifique la cédula del cliente antes de proceder.'
            }).then(() => {
                $('#registroClienteModal').modal('show');
            });
            return;
        }

        if (selectedHours.length > 0) {
            const horaInicio = selectedHours[0].split('-')[0];
            const horaFin = selectedHours[selectedHours.length - 1].split('-')[1];
            const reserva = {
                RestauranteId: $('#restaurante').val(),
                MesaId: $('#mesas').val(),
                fecha: $('#fecha').val(),
                horaInicio: horaInicio,
                horaFin: horaFin,
                cedula: $('#cedula').val(),
                ClienteId: clienteId // Incluir el ID del cliente en la reserva
            };

            $.post('/api/reservacion', reserva, function(data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Reserva Exitosa',
                    text: 'Tu reserva ha sido realizada con éxito.'
                });
                $('#reservaForm')[0].reset();
                clienteId = null; // Resetear clienteId
                $('#fecha').prop('disabled', true);
                $('#horas .form-check-input').prop('disabled', true);
                $('#mesas').prop('disabled', true);
                $('#cedula').prop('disabled', true);
                $('button[type="submit"]').prop('disabled', true);
            }).fail(function(err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al realizar la reserva.'
                });
                console.log("Error al realizar la reserva:", err);
            });
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Hora Inválida',
                text: 'Por favor selecciona una o más horas.'
            });
        }
    });

    // Obtener mesas disponibles (nuevo método separado para debug)
    function obtenerMesasDisponibles(restauranteId, fecha, horaInicio, horaFin) {
        console.log("Obteniendo mesas disponibles...");
        console.log("Restaurante ID:", restauranteId);
        console.log("Fecha:", fecha);
        console.log("Hora Inicio:", horaInicio);
        console.log("Hora Fin:", horaFin);
        
        $.post('/api/reservacion/libres', { RestauranteId: restauranteId, fecha: fecha, horaInicio: horaInicio, horaFin: horaFin }, function(data) {
            console.log("Mesas disponibles:", data);
            $('#mesas').empty().append('<option value="">Selecciona una Mesa</option>');
            data.forEach(mesa => {
                $('#mesas').append(`<option value="${mesa.id}">${mesa.nombre} - Capacidad: ${mesa.capacidad}</option>`);
            });
        }).fail(function(err) {
            console.log("Error al obtener mesas disponibles:", err);
        });
    }

    // Llamar al método de obtener mesas disponibles cuando se cambian las horas
    $('#horas .form-check-input').change(function() {
        const restauranteId = $('#restaurante').val();
        const fecha = $('#fecha').val();
        const selectedHours = $('#horas .form-check-input:checked').map(function() {
            return this.value;
        }).get();

        if (selectedHours.length > 0) {
            const horaInicio = selectedHours[0].split('-')[0];
            const horaFin = selectedHours[selectedHours.length - 1].split('-')[1];
            obtenerMesasDisponibles(restauranteId, fecha, horaInicio, horaFin);
        }
    });
});

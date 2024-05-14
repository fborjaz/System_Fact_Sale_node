
    class Client {
      constructor(first_name = "Consumidor", last_name = "Final", dni = "9999999999") {
          this.first_name = first_name;
          this.last_name = last_name;
          this.dni = dni;
      }
    }

    class RegularClient extends Client {
      constructor(first_name = "Cliente", last_name = "Final", dni = "9999999999", card = false) {
          super(first_name, last_name, dni);
          this.card = card;
      }

      get discount() {
          return this.card ? 0.10 : 0;
      }
    }

    class VipClient extends Client {
      constructor(first_name = "Consumidor", last_name = "Final", dni = "9999999999", limit = 10000) {
          super(first_name, last_name, dni);
          this.limit = limit;
      }

      set limit(value) {
          if (value >= 10000 && value <= 20000) {
              this._limit = value;
          } else {
              this._limit = 10000;
          }
      }

      get limit() {
          return this._limit;
      }
    }

    function mostrarOpciones() {
      var tipoCliente = document.getElementById("tipo").value;
      if (tipoCliente === "regular") {
        document.getElementById("cardField").style.display = "block";
        document.getElementById("limitField").style.display = "none";
      } else if (tipoCliente === "vip") {
        document.getElementById("cardField").style.display = "none";
        document.getElementById("limitField").style.display = "block";
      }
    }

    function enviarDatos() {
      var tipoCliente = document.getElementById("tipo").value;
      var nombre = document.getElementById("nombre").value;
      var apellido = document.getElementById("apellido").value;
      var dni = document.getElementById("dni").value;

      var datos = {
        "dni": dni,
        "nombre": nombre,
        "apellido": apellido,
        "tipo": tipoCliente // Incluir el tipo de cliente en los datos
      };

      // Verificar si el tipo de cliente es Regular
      if (tipoCliente === "regular") {
        var card = document.getElementById("card").checked; // Verificar si tiene tarjeta
        var cliente = new RegularClient(nombre, apellido, dni, card);
        var valor = cliente.discount; // Obtener el descuento del cliente Regular

        // Incluir el descuento como parte de los datos para el cliente Regular
        datos["descuento"] = valor;

        // Incluir el estado de la tarjeta en los datos para el cliente Regular
        datos["card"] = card;

      // Verificar si el tipo de cliente es VIP
      } else if (tipoCliente === "vip") {
        var limit = document.getElementById("limit").value; // Obtener el límite de crédito
        var cliente = new VipClient(nombre, apellido, dni, limit);

        // Incluir el límite de crédito como parte de los datos para el cliente VIP
        datos["limit"] = limit;
      }

      // Convertir los datos a JSON
      var jsonData = JSON.stringify(datos);

      // Hacer una solicitud HTTP POST al servidor
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/regclientes", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log(xhr.responseText); // Mostrar la respuesta del servidor en la consola
        }
      };
      xhr.send(jsonData);
    }

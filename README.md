# SistemaCobranza

## Rutas

### Usuario

	GET:
		/usuario/                         Obtiene todos los usuarios

		/usuario/id                       Obtiene el usuario con ese id


	POST:
		/usuario/                         Crea un nuevo usuario (Body: nombre, ape_pat,ape_mat, dni, pssw, telefono, dir, id_perfil)


	PUT:
		/usuario/id                       Modifica el usuario(Body: nombre, ape_pat, ape_mat, telefono, dir)

		/usuario/id/changePSSW            Modifica el password(Body: pssw, new_pssw, re_new_pssw)


	DELETE:
		/usuario/id                       Elimina el usuario con ese id
	
### Producto

	GET:
		/producto/
		/producto/id

	POST
		/producto/												Crea un nuevo producto(Body: nombre, precio)

	PUT
		/producto/id											Modifica un producto (Body: nombre, precio)

	DELETE
		/producto/id
	
### Pago

	GET
		/pago/
		/pago/id

	POST
		/pago															Crea un nuevo pago(Body: monto, id_deuda, id_cobrador)
	
### Deuda

	GET
		/deuda/
		/deuda/id

	POST
		/deuda														Crea una nueva deuda(Body: monto, id_deudor, id_producto)

	PUT
		/deuda/id													Modifica el estado de una deuda(Body: estado) //Deprecado :v

	DELETE
		/deuda/id													Elimina una deuda //Deprecado :v
	
### Area
	
	GET

		/area/
		/area/id

	POST

		/area/														Crea una area (Body: nombre)

	PUT

		/area/id													Modifica una area (Body: nombre)

	DELETE

		/area/id													Elimina una area


### Deudor

	GET
		/deudor/
		/deudor/id
		/deudor/id/deudas/
		/deudor/id_deudor/deudas/id_deuda
		/deudor/id_deudor/deudas/id_deuda/pagos
		/deudor/id_deudor/pagos
		/deudor/id_deudor/pagos/id_pago
		/deudor/id/productos
		/deudor/id_deudor/productos/id_producto
		/deudor/id_deudor/productos/id_producto/pagos
### Util
	
	GET
		/search?search=...	(params separados por "-")
	
	POST
		/login/			(body: 	dni,pssw)

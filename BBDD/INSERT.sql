-- INSERT direcciones
INSERT INTO direccion (linea1, linea2, ciudad, comunidad, pais)
VALUES ('urb. ochoa 23', null, 'A Coruña', 'A Coruña', 'España');

INSERT INTO direccion (linea1, linea2, ciudad, comunidad, pais)
VALUES ('calle san pablo 23', null, 'Santiago de Compostela', 'A Coruña', 'España');

INSERT INTO direccion (linea1, linea2, ciudad, comunidad, pais)
VALUES ('avd. san pedro 23', null, 'Madrid', 'Madrid', 'España');

INSERT INTO direccion (linea1, linea2, ciudad, comunidad, pais)
VALUES ('calle las flores 23', null, 'Barcelona', 'Cataluña', 'España');

-- INSERT metodos pago
INSERT INTO metodo_pago (nombre, nombre_titular, numb_tarjeta, codigo_seguridad) 
VALUES ('tarjeta ABANCA', 'Pedro Fernandez', 6549832145698754, 111);

INSERT INTO metodo_pago (nombre, nombre_titular, numb_tarjeta, codigo_seguridad) 
VALUES ('tarjeta 1', 'Jose Gonzalez', 6549832145698754, 222);

INSERT INTO metodo_pago (nombre, nombre_titular, numb_tarjeta, codigo_seguridad) 
VALUES ('tarjeta por defecto', 'Ramiro Fernandez', 6549832145698754, 342);

INSERT INTO metodo_pago (nombre, nombre_titular, numb_tarjeta, codigo_seguridad) 
VALUES ('tarjeta fav', 'Pedro Garcia', 6549832145698754, 234);

-- INSERT usuarios
INSERT INTO usuarios (nick, pass_hash, nombre, apellidos, email, tlf, avatar, fecha_nacimiento, IPv4_ultima_modificacion, IPv6_ultima_modificacion, id_direccion, id_metodo_pago)
VALUES ('pedro89', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'Pedro', 'Fernandez', 'pedro89@example.com', 666666666, null, '1992/11/11', '77.77.77.77', 'fd33:92f2:d632:1fbb', 1, 1);

INSERT INTO usuarios (nick, pass_hash, nombre, apellidos, email, tlf, avatar, fecha_nacimiento, IPv4_ultima_modificacion, IPv6_ultima_modificacion, id_direccion, id_metodo_pago)
VALUES ('pedro89', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'Jose', 'Gonzalez', 'jose98@example.com', 666666666, null, '1992/11/11', '77.77.88.77', 'fd33:92f2:d632:1fbb', 2, 2);

INSERT INTO usuarios (nick, pass_hash, nombre, apellidos, email, tlf, avatar, fecha_nacimiento, IPv4_ultima_modificacion, IPv6_ultima_modificacion, id_direccion, id_metodo_pago)
VALUES ('pedro89', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'Ramiro', 'Fernandez', 'empanada@example.com', 666666666, null, '1992/11/11', '77.77.77.77', 'fd33:92f2:d632:1fbb', 3, 3);

INSERT INTO usuarios (nick, pass_hash, nombre, apellidos, email, tlf, avatar, fecha_nacimiento, IPv4_ultima_modificacion, IPv6_ultima_modificacion, id_direccion, id_metodo_pago)
VALUES ('pedro89', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'Pedro', 'Garcia', 'pedrogarcia@example.com', 666666666, null, '1992/11/11', '77.11.77.77', 'fd33:92f2:d632:1fbb', 4, 4);

-- INSERT carrito
INSERT INTO carrito (checkout, pagado, IPv4_ultima_modificacion, IPv6_ultima_modificacion, precio_total, user_id, id_metodo_pago)
VALUES (TRUE, TRUE,'77.77.77.77' ,'fd33:92f2:d632:1fbb', 54.00, 1, 1);

-- INSERT vendedor
INSERT INTO vendedor (nick, nombre, pass_hash, IPv4_ultima_modificacion, IPv6_ultima_modificacion)
VALUES ('casapaco', 'casa paco', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', '12.14.15.12', 'fd33:92f2:d632:1fbb');

-- INSERT local
INSERT INTO `local` (nombre, descripcion, rating_medio, email, tlf, id_direccion, id_vendedor)
VALUES ('casa paco', 'Pequeño local perfecto para familias ', 10, 'casapaco@example.com', 66666666, 3, 1);

-- INSERT usuario_local 
INSERT INTO usuario_local (id_usuario , id_local, rating, comentario)
VALUES (1, 1, 10, 'Muy buena experiencia');
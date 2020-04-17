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
INSERT INTO usuarios (nick, pass_hash, nombre, apellidos, email, tlf, avatar, fecha_nacimiento, fecha_creacion, fecha_ultima_modificacion, IPv4_ultima_modificacion, IPv6_ultima_modificacion, id_direccion, id_metodo_pago)
VALUES ('pedro89', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'Pedro', 'Fernandez', 'pedro89@example.com', 666666666, null, '1992/11/11', '2008/10/10', '2020/01/01', '77.77.77.77', 'fd33:92f2:d632:1fbb', 1, 1);

INSERT INTO usuarios (nick, pass_hash, nombre, apellidos, email, tlf, avatar, fecha_nacimiento, fecha_creacion, fecha_ultima_modificacion, IPv4_ultima_modificacion, IPv6_ultima_modificacion, id_direccion, id_metodo_pago)
VALUES ('pedro89', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'Jose', 'Gonzalez', 'jose98@example.com', 666666666, null, '1992/11/11', '2008/10/10', '2020/01/01', '77.77.88.77', 'fd33:92f2:d632:1fbb', 2, 2);

INSERT INTO usuarios (nick, pass_hash, nombre, apellidos, email, tlf, avatar, fecha_nacimiento, fecha_creacion, fecha_ultima_modificacion, IPv4_ultima_modificacion, IPv6_ultima_modificacion, id_direccion, id_metodo_pago)
VALUES ('pedro89', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'Ramiro', 'Fernandez', 'empanada@example.com', 666666666, null, '1992/11/11', '2008/10/10', '2020/01/01', '77.77.77.77', 'fd33:92f2:d632:1fbb', 3, 3);

INSERT INTO usuarios (nick, pass_hash, nombre, apellidos, email, tlf, avatar, fecha_nacimiento, fecha_creacion, fecha_ultima_modificacion, IPv4_ultima_modificacion, IPv6_ultima_modificacion, id_direccion, id_metodo_pago)
VALUES ('pedro89', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'Pedro', 'Garcia', 'pedrogarcia@example.com', 666666666, null, '1992/11/11', '2008/10/10', '2020/01/01', '77.11.77.77', 'fd33:92f2:d632:1fbb', 4, 4);


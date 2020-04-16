DROP DATABASE IF EXISTS proyecto;
CREATE DATABASE IF NOT EXISTS proyecto;
USE proyecto;

CREATE TABLE vendedor (
	id int PRIMARY KEY,
	nick varchar(255),
	nombre varchar(255),
	pass_hash varchar(255),
	fecha_creacion date,
	fecha_ultima_modificacion datetime,
	IPv4_ultima_modificacion int,
	IPv6_ultima_modificacion varchar(39)
);

CREATE TABLE direccion (
	id int PRIMARY KEY,
	linea1 varchar(255),
	linea2 varchar(255),
	ciudad varchar(255),
	comunidad varchar(255),
	pais varchar(255)
);

CREATE TABLE local (
	id int PRIMARY KEY,
	nombre varchar(255),
	descripcion varchar(255),
	foto varchar(255), -- REVISAR PARA MULTIPLES FOTOS
	rating_medio int,
	
	id_direccion int,
	CONSTRAINT fk_direccion_local FOREIGN KEY (id_direccion)
	REFERENCES direccion(id),
	
	id_vendedor int,
	CONSTRAINT fk_vendedor_local FOREIGN KEY (id_vendedor)
	REFERENCES vendedor(id)
);

CREATE TABLE usuario (
	id int PRIMARY KEY,
	nick varchar(255),
	pass_hash varchar(255),
	nombre varchar(255),
	apellidos varchar(255),
	email varchar(255),
	tlf int,
	tarjeta_credito int, -- revisar
	avatar varchar(255), -- dirección imagen
	fecha_nacimiento date,
	fecha_creacion date,
	fecha_ultima_modificacion datetime,
	IPv4_ultima_modificacion int,
	IPv6_ultima_modificacion varchar(39),
	
	id_direccion int,
	CONSTRAINT fk_direccion_usuario FOREIGN KEY (id_direccion)
	REFERENCES direccion(id)
);

CREATE TABLE usuario_local (
	id_usuario int,
	id_local int,
	rating int,
	comentario varchar(255),
	
	CONSTRAINT fk_usuario_local FOREIGN KEY (id_usuario)
	REFERENCES usuario(id),
	CONSTRAINT fk_local_usuario FOREIGN KEY (id_local)
	REFERENCES local(id)
);

CREATE TABLE carrito (
	id int PRIMARY KEY,
	checkout bool,
	fecha_checkout timestamp,
	pagado bool,
	fecha_pago timestamp,

	IPv4_ultima_modificacion int, 
	IPv6_ultima_modificacion varchar(39),
	precio_total float,
	
	user_id int,
	CONSTRAINT fk_user_carrito FOREIGN KEY (user_id)
	REFERENCES usuario(id)
);

CREATE TABLE plato (
	id int PRIMARY KEY,
	nombre varchar(255),
	foto varchar(255), -- REVISAR PARA MULTIPLES FOTOS
	descripcion varchar(255),
	precio float,
	rating_medio int,
	
	id_vendedor int,
	CONSTRAINT fk_vendedor_plato FOREIGN KEY (id_vendedor)
	REFERENCES vendedor(id)
);

CREATE TABLE carrito_platos (
	id_carrito int,
	id_plato int,
	precio float,
	cantidad int,
	rating int,
	comentario varchar(255),
	
	CONSTRAINT fk_carrito_platos FOREIGN KEY (id_carrito)
	REFERENCES carrito(id),
	CONSTRAINT fk_plato_carrito FOREIGN KEY (id_plato)
	REFERENCES plato(id)
);

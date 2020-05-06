DROP DATABASE IF EXISTS proyecto;
CREATE DATABASE IF NOT EXISTS proyecto;
USE proyecto;

CREATE TABLE direccion (
	id int unsigned PRIMARY KEY auto_increment,
	linea1 varchar(255),
	linea2 varchar(255),
	ciudad varchar(255),
	comunidad varchar(255),
	pais varchar(255)
);

CREATE TABLE usuarios (
	id int unsigned PRIMARY KEY auto_increment,
	nick varchar(255),
	pass_hash varchar(255),
	es_vendedor bool,
	nombre varchar(255),
	apellidos varchar(255),
	email varchar(255),
	tlf varchar(255),
	avatar varchar(255),
	fecha_nacimiento date,
	fecha_creacion timestamp DEFAULT CURRENT_TIMESTAMP,
	fecha_ultima_modificacion timestamp DEFAULT CURRENT_TIMESTAMP,
	IPv4_ultima_modificacion varchar(255),
	IPv6_ultima_modificacion varchar(39),
	
	id_direccion int unsigned,
	CONSTRAINT fk_direccion_usuarios FOREIGN KEY (id_direccion)
	REFERENCES direccion(id)
);

CREATE TABLE `local` (
	id int unsigned PRIMARY KEY auto_increment,
	nombre varchar(255),
	descripcion varchar(255),
	rating_medio int,
	email varchar(255),
	tlf varchar(255),
	
	id_direccion int unsigned,
	CONSTRAINT fk_direccion_local FOREIGN KEY (id_direccion)
	REFERENCES direccion(id),
	
	id_vendedor int unsigned,
	CONSTRAINT fk_vendedor_local FOREIGN KEY (id_vendedor)
	REFERENCES usuarios(id)
);


CREATE TABLE usuario_local (
	id_usuario int unsigned,
	id_local int unsigned,
	rating int,
	comentario varchar(255),
	fecha timestamp DEFAULT CURRENT_TIMESTAMP,
	
	CONSTRAINT fk_usuarios_local FOREIGN KEY (id_usuario)
	REFERENCES usuarios(id),
	CONSTRAINT fk_local_usuarios FOREIGN KEY (id_local)
	REFERENCES local(id)
);

CREATE TABLE carrito (
	id int unsigned PRIMARY KEY auto_increment,
	checkout bool,
	fecha_checkout timestamp DEFAULT CURRENT_TIMESTAMP,
	pagado bool,
	fecha_pago timestamp DEFAULT CURRENT_TIMESTAMP,

	IPv4_ultima_modificacion varchar(255), 
	IPv6_ultima_modificacion varchar(39),
	precio_total float,
	
	id_usuario int unsigned,
	CONSTRAINT fk_user_carrito FOREIGN KEY (id_usuario )
	REFERENCES usuarios(id)
);

CREATE TABLE plato (
	id int unsigned PRIMARY KEY auto_increment,
	nombre varchar(255),
	descripcion varchar(255),
	precio float,
	rating_medio int,
	
	id_local int unsigned,
	CONSTRAINT fk_local_plato FOREIGN KEY (id_local)
	REFERENCES `local`(id)
);

CREATE TABLE carrito_platos (
	id_carrito int unsigned,
	id_plato int unsigned,
	precio float,
	cantidad int,
	rating int,
	comentario varchar(255),
	
	CONSTRAINT fk_carrito_platos FOREIGN KEY (id_carrito)
	REFERENCES carrito(id),
	CONSTRAINT fk_plato_carrito FOREIGN KEY (id_plato)
	REFERENCES plato(id)
);

CREATE TABLE fotos(
	id_local int unsigned,
	id_plato int unsigned,
	nombre varchar(255),
	fecha_subida timestamp DEFAULT CURRENT_TIMESTAMP,
	
	CONSTRAINT fk_local_foto FOREIGN KEY (id_local)
	REFERENCES `local`(id),
	CONSTRAINT fk_plato_foto FOREIGN KEY (id_plato)
	REFERENCES plato(id)
);

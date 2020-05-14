SET foreign_key_checks = 0;

DROP TABLE IF EXISTS address;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS shop;
DROP TABLE IF EXISTS user_shop;
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS plates;
DROP TABLE IF EXISTS cart_plates;
DROP TABLE IF EXISTS photos;

SET foreign_key_checks = 1; 


CREATE TABLE address (
	id int unsigned PRIMARY KEY auto_increment,
	line1 varchar(255),
	line2 varchar(255),
	city varchar(255),
	state varchar(255),
	country varchar(255)
);

CREATE TABLE users (
	id int unsigned PRIMARY KEY auto_increment,
	nick varchar(255),
	pass_hash varchar(255),
	role enum('admin', 'client', 'seller'),
	first_name varchar(255),
	last_name varchar(255),
	email varchar(255),
	tlf varchar(255),
	avatar varchar(255),
	birthday date,
	active boolean DEFAULT 1,
	creation_date timestamp DEFAULT CURRENT_TIMESTAMP,
	last_modification_date timestamp DEFAULT CURRENT_TIMESTAMP,
	last_modification_IP varchar(39),
	confirmation_code varchar(255),
	last_critical_update timestamp DEFAULT CURRENT_TIMESTAMP,
	
	id_address int unsigned,
	CONSTRAINT fk_address_users FOREIGN KEY (id_address)
	REFERENCES address(id)
);

CREATE TABLE shop (
	id int unsigned PRIMARY KEY auto_increment,
	name varchar(255),
	description varchar(255),
	email varchar(255),
	tlf varchar(255),
	
	id_address int unsigned,
	CONSTRAINT fk_address_shop FOREIGN KEY (id_address)
	REFERENCES address(id),
	
	id_seller int unsigned,
	CONSTRAINT fk_seller_shop FOREIGN KEY (id_seller)
	REFERENCES users(id)
);


CREATE TABLE user_shop (

	id_user int unsigned,
	id_shop int unsigned,
	rating int,
	comment varchar(255),
	date timestamp DEFAULT CURRENT_TIMESTAMP,
	
	CONSTRAINT fk_users_shop FOREIGN KEY (id_user)
	REFERENCES users(id),
	CONSTRAINT fk_shop_users FOREIGN KEY (id_shop)
	REFERENCES shop(id)
);

CREATE TABLE cart (
	id int unsigned PRIMARY KEY auto_increment,
	checkout boolean,
	checkout_date timestamp DEFAULT CURRENT_TIMESTAMP,
	paid boolean,
	paid_date timestamp DEFAULT CURRENT_TIMESTAMP,

	last_modification_IP varchar(39),
	total_prize float,
	
	id_user int unsigned,
	CONSTRAINT fk_users_cart FOREIGN KEY (id_user)
	REFERENCES users(id)
);

CREATE TABLE plates (
	id int unsigned PRIMARY KEY auto_increment,
	name varchar(255),
	description varchar(255),
	prize float,
	
	id_shop int unsigned,
	CONSTRAINT fk_shop_palte FOREIGN KEY (id_shop)
	REFERENCES shop(id)
);

CREATE TABLE cart_plates (
	id_cart int unsigned,
	id_plate int unsigned,
	prize float,
	ammount int,
	rating int,
	comment varchar(255),
	
	CONSTRAINT fk_cart_plate FOREIGN KEY (id_cart)
	REFERENCES cart(id),
	CONSTRAINT fk_plate_cart FOREIGN KEY (id_plate)
	REFERENCES plates(id)
);

CREATE TABLE photos(
	id_shop int unsigned,
	id_plate int unsigned,
	name varchar(255),
	upload_date timestamp DEFAULT CURRENT_TIMESTAMP,
	
	CONSTRAINT fk_shop_photo FOREIGN KEY (id_shop)
	REFERENCES shop(id),
	CONSTRAINT fk_plate_photo FOREIGN KEY (id_plate)
	REFERENCES plates(id)
);

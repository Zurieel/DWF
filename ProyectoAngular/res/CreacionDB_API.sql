DROP TABLE IF EXISTS region;

CREATE TABLE region(
	region_id INT NOT NULL AUTO_INCREMENT,
    region VARCHAR(100) UNIQUE NOT NULL,
    code VARCHAR(100) UNIQUE NOT NULL,
    status TINYINT NOT NULL,
    PRIMARY KEY (region_id)
);

INSERT INTO region(region,code,status) VALUES("Norte","N",1);
INSERT INTO region(region,code,status) VALUES("Sur","S",1);
INSERT INTO region(region,code,status) VALUES("Noroeste","NE",0);

SELECT * FROM region;

DROP TABLE IF EXISTS category;

CREATE TABLE category(
	category_id INT NOT NULL AUTO_INCREMENT,
    category VARCHAR(100) UNIQUE NOT NULL,
    code VARCHAR(100) UNIQUE NOT NULL,
    status TINYINT NOT NULL,
    PRIMARY KEY (category_id)
);

INSERT INTO category(category,code,status) VALUES("Electrónica","Electr",1);
INSERT INTO category(category,code,status) VALUES("Farmacia","Farm",1);

SELECT * FROM category;

DROP TABLE IF EXISTS customer_image;

CREATE TABLE customer_image(
	customer_image_id INT NOT NULL AUTO_INCREMENT,
    image TEXT NOT NULL,
    status TINYINT NOT NULL,
    PRIMARY KEY (customer_image_id)
);

INSERT INTO customer_image(image, status) VALUES('img1', 1);
INSERT INTO customer_image(image, status) VALUES('img2', 1);

SELECT * FROM customer_image;

DROP TABLE IF EXISTS customer;

CREATE TABLE customer(
	customer_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    rfc VARCHAR(13) UNIQUE NOT NULL,
    mail VARCHAR(100) UNIQUE NOT NULL,
    address VARCHAR(255),
    region_id INT NOT NULL,
    customer_image_id INT NOT NULL,
    status TINYINT NOT NULL,
    PRIMARY KEY (customer_id),
    FOREIGN KEY (region_id) REFERENCES region(region_id),
    FOREIGN KEY (customer_image_id) REFERENCES customer_image(customer_image_id)
);

INSERT INTO customer(name, surname, rfc, mail, address, region_id, customer_image_id, status) VALUES('Iván', 'Saavedra', 'SAAI920101A01', 'ivan.saavedra@ciencias.unam.mx', 'Av. Universidad 3000', 1, 1, 1);
INSERT INTO customer(name, surname, rfc, mail, address, region_id, customer_image_id, status) VALUES('Carlos', 'López', 'LOPC920101A01', 'carlos.lopez@ciencias.unam.mx', 'Periférico Sur 1400', 2, 2, 1);

SELECT * FROM customer;

DROP TABLE IF EXISTS invoice;

CREATE TABLE invoice(
	invoice_id INT NOT NULL AUTO_INCREMENT,
    rfc VARCHAR(13) NOT NULL,
	subtotal FLOAT NOT NULL,
	taxes FLOAT NOT NULL,
	total FLOAT NOT NULL,
    created_at DATE NOT NULL,
    status TINYINT NOT NULL,
    PRIMARY KEY (invoice_id),
    FOREIGN KEY (rfc) REFERENCES customer(rfc)
);

SELECT * FROM invoice;

DROP TABLE IF EXISTS item;

CREATE TABLE item(
	item_id INT NOT NULL AUTO_INCREMENT,
    invoice_id INT NOT NULL,
    gtin CHAR(13) UNIQUE NOT NULL,
    quantity INT NOT NULL,
	unit_price FLOAT NOT NULL,
	subtotal FLOAT NOT NULL,
	taxes FLOAT NOT NULL,
	total FLOAT NOT NULL,
    status TINYINT NOT NULL,
    PRIMARY KEY (item_id),
    FOREIGN KEY (invoice_id) REFERENCES invoice(invoice_id)
);

SELECT * FROM item;

DROP TABLE IF EXISTS product;

CREATE TABLE product(
	product_id INT NOT NULL AUTO_INCREMENT,
    gtin CHAR(13) UNIQUE NOT NULL,
    product VARCHAR(100) NOT NULL,
    description VARCHAR(255),
	price FLOAT NOT NULL,
	stock INT NOT NULL,
	category_id INT NOT NULL,
    status TINYINT NOT NULL,
    PRIMARY KEY (product_id),
    FOREIGN KEY (category_id) REFERENCES category(category_id)
);

INSERT INTO product VALUES(1,'7503030923323','iPhone 14 128GB Negro','iPhone 14 128 GB Negro, marca Apple',2000.00,30,1,1);
INSERT INTO product VALUES(2,'7501055311453','Paracetamol 500mg','Paracetamol tabletas de 500mg, 20 tabletas',15.00,100,2,1);

SELECT * FROM product;

DROP TABLE IF EXISTS product_image;

CREATE TABLE product_image(
	product_image_id INT NOT NULL AUTO_INCREMENT,
    product_id INT NOT NULL,
    image TEXT NOT NULL,
    status TINYINT NOT NULL,
    PRIMARY KEY (product_image_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

SELECT * FROM product_image;

DROP TABLE IF EXISTS cart;

CREATE TABLE cart(
	cart_id INT NOT NULL AUTO_INCREMENT,
    rfc VARCHAR(13) NOT NULL,
    gtin CHAR(13) NOT NULL,
	quantity INT NOT NULL,
    status TINYINT NOT NULL,
    PRIMARY KEY (cart_id),
    FOREIGN KEY (rfc) REFERENCES customer(rfc),
    FOREIGN KEY (gtin) REFERENCES product(gtin)
);

SELECT * FROM cart;



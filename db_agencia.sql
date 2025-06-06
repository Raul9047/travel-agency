create database db_grafos;
use db_grafos;

-- Tabla de ciudades
CREATE TABLE ciudad (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla de rutas
CREATE TABLE ruta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    origen_id INT NOT NULL,
    destino_id INT NOT NULL,
    FOREIGN KEY (origen_id) REFERENCES ciudad(id),
    FOREIGN KEY (destino_id) REFERENCES ciudad(id)
);

-- Tabla de empresas
CREATE TABLE empresa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    /*can_rutas INT NOT NULL,*/
    descripcion char(200),
    id_ciudad int not null,
    foreign key (id_ciudad) references ciudad(id)
		on update cascade
);
/*alter table empresa add descripcion char(100);*/

-- Tabla intermedia para asociar empresas con rutas (relación muchos a muchos)
CREATE TABLE empresa_ruta (
    empresa_id INT NOT NULL,
    ruta_id INT NOT NULL,
    PRIMARY KEY (empresa_id, ruta_id),
    FOREIGN KEY (empresa_id) REFERENCES empresa(id)
		on update cascade,
    FOREIGN KEY (ruta_id) REFERENCES ruta(id)
		on update cascade
);

ALTER TABLE empresa_ruta ADD duracion time not null;
ALTER TABLE empresa_ruta ADD precio DECIMAL(12, 2) NOT NULL;

DELIMITER $$

CREATE TRIGGER upCantidadRutas
AFTER INSERT ON empresa_ruta
FOR EACH ROW
BEGIN
    DECLARE cantidad INT;
    SELECT COUNT(*) INTO cantidad FROM empresa_ruta WHERE empresa_id = NEW.empresa_id;
    UPDATE empresa SET can_rutas = cantidad WHERE id = NEW.empresa_id;
END$$
DELIMITER ;

delete from ciudad where id = 4;
delete from empresa where id = 6;
select * from empresa_ruta;
select * from ciudad;
select * from empresa;
select * from empresa_ruta;
select * from ruta;

update empresa set descripcion="Empresa Premium" where id = 2;
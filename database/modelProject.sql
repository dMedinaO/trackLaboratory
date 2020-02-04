-- MySQL Script generated by MySQL Workbench
-- mar 04 feb 2020 08:56:52 -03
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema trazabilidadDB
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `trazabilidadDB` ;

-- -----------------------------------------------------
-- Schema trazabilidadDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `trazabilidadDB` DEFAULT CHARACTER SET utf8 ;
USE `trazabilidadDB` ;

-- -----------------------------------------------------
-- Table `trazabilidadDB`.`proveedor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trazabilidadDB`.`proveedor` ;

CREATE TABLE IF NOT EXISTS `trazabilidadDB`.`proveedor` (
  `idproveedor` INT NOT NULL,
  `nombreProveedor` VARCHAR(45) NOT NULL,
  `rutProveedor` VARCHAR(45) NOT NULL,
  `creacion_proveedor` DATETIME NOT NULL,
  `modificacion_proveedor` DATETIME NOT NULL,
  PRIMARY KEY (`idproveedor`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trazabilidadDB`.`contactoProveedor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trazabilidadDB`.`contactoProveedor` ;

CREATE TABLE IF NOT EXISTS `trazabilidadDB`.`contactoProveedor` (
  `idcontactoProveedor` INT NOT NULL,
  `nombreContacto` VARCHAR(45) NOT NULL,
  `telefonoContacto` VARCHAR(45) NOT NULL,
  `emailContacto` VARCHAR(45) NOT NULL,
  `proveedor` INT NOT NULL,
  `creacion_proveedorContacto` DATETIME NOT NULL,
  `modificacion_proveedorContacto` DATETIME NOT NULL,
  PRIMARY KEY (`idcontactoProveedor`),
  INDEX `fk_contactoProveedor_proveedor_idx` (`proveedor` ASC),
  CONSTRAINT `fk_contactoProveedor_proveedor`
    FOREIGN KEY (`proveedor`)
    REFERENCES `trazabilidadDB`.`proveedor` (`idproveedor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trazabilidadDB`.`equipo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trazabilidadDB`.`equipo` ;

CREATE TABLE IF NOT EXISTS `trazabilidadDB`.`equipo` (
  `idequipo` INT NOT NULL,
  `serieEquipo` VARCHAR(45) NOT NULL,
  `nombreEquipo` VARCHAR(45) NOT NULL,
  `detalleEquipo` VARCHAR(45) NOT NULL,
  `numeroActivo` VARCHAR(45) NOT NULL,
  `fechaFabricacion` DATETIME NOT NULL,
  `estadoEquipo` VARCHAR(45) NOT NULL,
  `nombreGenerico` VARCHAR(45) NOT NULL,
  `fechaCreacionEquipo` DATETIME NOT NULL,
  `fechaModificacionEquipo` DATETIME NOT NULL,
  PRIMARY KEY (`idequipo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trazabilidadDB`.`QRCode`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trazabilidadDB`.`QRCode` ;

CREATE TABLE IF NOT EXISTS `trazabilidadDB`.`QRCode` (
  `idQRCode` INT NOT NULL,
  `descriptionCode` VARCHAR(45) NOT NULL,
  `urlPage` VARCHAR(45) NULL,
  `equipo` INT NOT NULL,
  `creacionQR` DATETIME NOT NULL,
  `modificacionQR` DATETIME NOT NULL,
  PRIMARY KEY (`idQRCode`),
  INDEX `fk_QRCode_equipo1_idx` (`equipo` ASC),
  CONSTRAINT `fk_QRCode_equipo1`
    FOREIGN KEY (`equipo`)
    REFERENCES `trazabilidadDB`.`equipo` (`idequipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trazabilidadDB`.`tipoPersonal`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trazabilidadDB`.`tipoPersonal` ;

CREATE TABLE IF NOT EXISTS `trazabilidadDB`.`tipoPersonal` (
  `idtipoPersonal` INT NOT NULL,
  `nombreTipo` VARCHAR(45) NOT NULL,
  `creacionTipoPersonal` DATETIME NOT NULL,
  `modificacionTipoPersonal` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idtipoPersonal`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trazabilidadDB`.`personalTecnico`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trazabilidadDB`.`personalTecnico` ;

CREATE TABLE IF NOT EXISTS `trazabilidadDB`.`personalTecnico` (
  `idpersonalTecnico` INT NOT NULL,
  `nombrePersonal` VARCHAR(45) NOT NULL,
  `rutPersonal` VARCHAR(45) NOT NULL,
  `proveedor_idproveedor` INT NOT NULL,
  `tipoPersonal` INT NOT NULL,
  `creacionPersonalTecnico` DATETIME NOT NULL,
  `modificacionPersonalTecnico` DATETIME NOT NULL,
  PRIMARY KEY (`idpersonalTecnico`),
  INDEX `fk_personalTecnico_proveedor1_idx` (`proveedor_idproveedor` ASC),
  INDEX `fk_personalTecnico_tipoPersonal1_idx` (`tipoPersonal` ASC),
  CONSTRAINT `fk_personalTecnico_proveedor1`
    FOREIGN KEY (`proveedor_idproveedor`)
    REFERENCES `trazabilidadDB`.`proveedor` (`idproveedor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_personalTecnico_tipoPersonal1`
    FOREIGN KEY (`tipoPersonal`)
    REFERENCES `trazabilidadDB`.`tipoPersonal` (`idtipoPersonal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trazabilidadDB`.`cliente`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trazabilidadDB`.`cliente` ;

CREATE TABLE IF NOT EXISTS `trazabilidadDB`.`cliente` (
  `idcliente` INT NOT NULL,
  `nombreCliente` VARCHAR(45) NOT NULL,
  `rutCliente` VARCHAR(45) NOT NULL,
  `fechaCreacionCliente` DATETIME NOT NULL,
  `fechaModificacionCliente` DATETIME NOT NULL,
  PRIMARY KEY (`idcliente`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trazabilidadDB`.`contactoCliente`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trazabilidadDB`.`contactoCliente` ;

CREATE TABLE IF NOT EXISTS `trazabilidadDB`.`contactoCliente` (
  `idcontactoCliente` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `cliente` INT NOT NULL,
  `fechaCreacionContactoCliente` DATETIME NOT NULL,
  `fechaModificacionContactoCliente` DATETIME NOT NULL,
  PRIMARY KEY (`idcontactoCliente`),
  INDEX `fk_contactoCliente_cliente1_idx` (`cliente` ASC),
  CONSTRAINT `fk_contactoCliente_cliente1`
    FOREIGN KEY (`cliente`)
    REFERENCES `trazabilidadDB`.`cliente` (`idcliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trazabilidadDB`.`direccion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trazabilidadDB`.`direccion` ;

CREATE TABLE IF NOT EXISTS `trazabilidadDB`.`direccion` (
  `iddireccion` INT NOT NULL,
  `region` VARCHAR(45) NOT NULL,
  `provincia` VARCHAR(45) NOT NULL,
  `comuna` VARCHAR(45) NOT NULL,
  `ciudad` VARCHAR(45) NOT NULL,
  `direccion` VARCHAR(45) NOT NULL,
  `codigoPostal` VARCHAR(45) NOT NULL,
  `fechaCreacionDireccion` DATETIME NOT NULL,
  `fechaModificacionDireccion` DATETIME NOT NULL,
  PRIMARY KEY (`iddireccion`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trazabilidadDB`.`sucursal`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trazabilidadDB`.`sucursal` ;

CREATE TABLE IF NOT EXISTS `trazabilidadDB`.`sucursal` (
  `idsucursal` INT NOT NULL,
  `nombreSucursal` VARCHAR(45) NOT NULL,
  `tipoSucursal` VARCHAR(45) NOT NULL,
  `cliente` INT NOT NULL,
  `direccion` INT NOT NULL,
  `fechaCreacionSucursal` DATETIME NOT NULL,
  `fechaModificacionSucursal` DATETIME NOT NULL,
  PRIMARY KEY (`idsucursal`),
  INDEX `fk_sucursal_cliente1_idx` (`cliente` ASC),
  INDEX `fk_sucursal_direccion1_idx` (`direccion` ASC),
  CONSTRAINT `fk_sucursal_cliente1`
    FOREIGN KEY (`cliente`)
    REFERENCES `trazabilidadDB`.`cliente` (`idcliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sucursal_direccion1`
    FOREIGN KEY (`direccion`)
    REFERENCES `trazabilidadDB`.`direccion` (`iddireccion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trazabilidadDB`.`area`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trazabilidadDB`.`area` ;

CREATE TABLE IF NOT EXISTS `trazabilidadDB`.`area` (
  `idarea` INT NOT NULL,
  `nombreArea` VARCHAR(45) NOT NULL,
  `descripcionArea` VARCHAR(45) NOT NULL,
  `fechaCreacionArea` DATETIME NOT NULL,
  `fechaModificacionArea` DATETIME NOT NULL,
  PRIMARY KEY (`idarea`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trazabilidadDB`.`personalLab`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trazabilidadDB`.`personalLab` ;

CREATE TABLE IF NOT EXISTS `trazabilidadDB`.`personalLab` (
  `idpersonalLab` INT NOT NULL,
  `nombrePersonal` VARCHAR(45) NOT NULL,
  `rutPersonal` VARCHAR(45) NOT NULL,
  `cargoPersonal` VARCHAR(45) NOT NULL,
  `sucursal` INT NOT NULL,
  `fechaCreacionPersonalLab` DATETIME NOT NULL,
  `fechaModificacionPersonalLab` DATETIME NOT NULL,
  PRIMARY KEY (`idpersonalLab`),
  INDEX `fk_personalLab_sucursal1_idx` (`sucursal` ASC),
  CONSTRAINT `fk_personalLab_sucursal1`
    FOREIGN KEY (`sucursal`)
    REFERENCES `trazabilidadDB`.`sucursal` (`idsucursal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trazabilidadDB`.`historial`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trazabilidadDB`.`historial` ;

CREATE TABLE IF NOT EXISTS `trazabilidadDB`.`historial` (
  `idhistorial` INT NOT NULL,
  `fechaInicio` DATETIME NOT NULL,
  `fechaTermino` DATETIME NOT NULL,
  `motivo` VARCHAR(45) NOT NULL,
  `equipo` INT NOT NULL,
  PRIMARY KEY (`idhistorial`),
  INDEX `fk_historial_equipo1_idx` (`equipo` ASC),
  CONSTRAINT `fk_historial_equipo1`
    FOREIGN KEY (`equipo`)
    REFERENCES `trazabilidadDB`.`equipo` (`idequipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trazabilidadDB`.`area_sucursal`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trazabilidadDB`.`area_sucursal` ;

CREATE TABLE IF NOT EXISTS `trazabilidadDB`.`area_sucursal` (
  `area_idarea` INT NOT NULL,
  `sucursal_idsucursal` INT NOT NULL,
  PRIMARY KEY (`area_idarea`, `sucursal_idsucursal`),
  INDEX `fk_area_has_sucursal_sucursal1_idx` (`sucursal_idsucursal` ASC),
  INDEX `fk_area_has_sucursal_area1_idx` (`area_idarea` ASC),
  CONSTRAINT `fk_area_has_sucursal_area1`
    FOREIGN KEY (`area_idarea`)
    REFERENCES `trazabilidadDB`.`area` (`idarea`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_area_has_sucursal_sucursal1`
    FOREIGN KEY (`sucursal_idsucursal`)
    REFERENCES `trazabilidadDB`.`sucursal` (`idsucursal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trazabilidadDB`.`equipoContratado`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trazabilidadDB`.`equipoContratado` ;

CREATE TABLE IF NOT EXISTS `trazabilidadDB`.`equipoContratado` (
  `equipo` INT NOT NULL,
  `fechaInstalacion` DATETIME NOT NULL,
  `fechaRetiro` DATETIME NOT NULL,
  `statusCliente` VARCHAR(45) NOT NULL,
  `area_sucursal_area_idarea` INT NOT NULL,
  `area_sucursal_sucursal_idsucursal` INT NOT NULL,
  PRIMARY KEY (`equipo`),
  INDEX `fk_equipo_has_area_equipo1_idx` (`equipo` ASC),
  INDEX `fk_equipoContratado_area_sucursal1_idx` (`area_sucursal_area_idarea` ASC, `area_sucursal_sucursal_idsucursal` ASC),
  CONSTRAINT `fk_equipo_has_area_equipo1`
    FOREIGN KEY (`equipo`)
    REFERENCES `trazabilidadDB`.`equipo` (`idequipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_equipoContratado_area_sucursal1`
    FOREIGN KEY (`area_sucursal_area_idarea` , `area_sucursal_sucursal_idsucursal`)
    REFERENCES `trazabilidadDB`.`area_sucursal` (`area_idarea` , `sucursal_idsucursal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trazabilidadDB`.`personalLab_manipulando_equipoInstalado`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trazabilidadDB`.`personalLab_manipulando_equipoInstalado` ;

CREATE TABLE IF NOT EXISTS `trazabilidadDB`.`personalLab_manipulando_equipoInstalado` (
  `personalLab` INT NOT NULL,
  `equipo` INT NOT NULL,
  `area` INT NOT NULL,
  PRIMARY KEY (`personalLab`, `equipo`, `area`),
  INDEX `fk_personalLab_has_equipoInstalado_equipoInstalado1_idx` (`equipo` ASC, `area` ASC),
  INDEX `fk_personalLab_has_equipoInstalado_personalLab1_idx` (`personalLab` ASC),
  CONSTRAINT `fk_personalLab_has_equipoInstalado_personalLab1`
    FOREIGN KEY (`personalLab`)
    REFERENCES `trazabilidadDB`.`personalLab` (`idpersonalLab`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_personalLab_has_equipoInstalado_equipoInstalado1`
    FOREIGN KEY (`equipo`)
    REFERENCES `trazabilidadDB`.`equipoContratado` (`equipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trazabilidadDB`.`acciones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trazabilidadDB`.`acciones` ;

CREATE TABLE IF NOT EXISTS `trazabilidadDB`.`acciones` (
  `idacciones` INT NOT NULL,
  `nombreAccion` VARCHAR(45) NOT NULL,
  `tipoAccion` VARCHAR(45) NOT NULL,
  `fechaCreacion` DATETIME NOT NULL,
  `fechaRespuesta` DATETIME NOT NULL,
  `fechaModificacionAccion` DATETIME NOT NULL,
  `comentarioAccion` VARCHAR(45) NOT NULL,
  `historial` INT NOT NULL,
  `personalLab_has_equipoInstalado_personalLab` INT NULL,
  `personalLab_has_equipoInstalado_equipo` INT NULL,
  `personalLab_has_equipoInstalado_area` INT NULL,
  `personalTecnico_idpersonalTecnico` INT NULL,
  PRIMARY KEY (`idacciones`),
  INDEX `fk_acciones_historial1_idx` (`historial` ASC),
  INDEX `fk_acciones_personalLab_has_equipoInstalado1_idx` (`personalLab_has_equipoInstalado_personalLab` ASC, `personalLab_has_equipoInstalado_equipo` ASC, `personalLab_has_equipoInstalado_area` ASC),
  INDEX `fk_acciones_personalTecnico1_idx` (`personalTecnico_idpersonalTecnico` ASC),
  CONSTRAINT `fk_acciones_historial1`
    FOREIGN KEY (`historial`)
    REFERENCES `trazabilidadDB`.`historial` (`idhistorial`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_acciones_personalLab_has_equipoInstalado1`
    FOREIGN KEY (`personalLab_has_equipoInstalado_personalLab` , `personalLab_has_equipoInstalado_equipo` , `personalLab_has_equipoInstalado_area`)
    REFERENCES `trazabilidadDB`.`personalLab_manipulando_equipoInstalado` (`personalLab` , `equipo` , `area`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_acciones_personalTecnico1`
    FOREIGN KEY (`personalTecnico_idpersonalTecnico`)
    REFERENCES `trazabilidadDB`.`personalTecnico` (`idpersonalTecnico`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trazabilidadDB`.`personalArea`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trazabilidadDB`.`personalArea` ;

CREATE TABLE IF NOT EXISTS `trazabilidadDB`.`personalArea` (
  `personalLab` INT NOT NULL,
  `area_sucursal_area_idarea` INT NOT NULL,
  `area_sucursal_sucursal_idsucursal` INT NOT NULL,
  PRIMARY KEY (`personalLab`),
  INDEX `fk_area_has_personalLab_personalLab1_idx` (`personalLab` ASC),
  INDEX `fk_personalArea_area_sucursal1_idx` (`area_sucursal_area_idarea` ASC, `area_sucursal_sucursal_idsucursal` ASC),
  CONSTRAINT `fk_area_has_personalLab_personalLab1`
    FOREIGN KEY (`personalLab`)
    REFERENCES `trazabilidadDB`.`personalLab` (`idpersonalLab`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_personalArea_area_sucursal1`
    FOREIGN KEY (`area_sucursal_area_idarea` , `area_sucursal_sucursal_idsucursal`)
    REFERENCES `trazabilidadDB`.`area_sucursal` (`area_idarea` , `sucursal_idsucursal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trazabilidadDB`.`docsEquipo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trazabilidadDB`.`docsEquipo` ;

CREATE TABLE IF NOT EXISTS `trazabilidadDB`.`docsEquipo` (
  `iddocsEquipo` INT NOT NULL,
  `nombreDoc` VARCHAR(45) NOT NULL,
  `descripcionDoc` VARCHAR(45) NOT NULL,
  `equipo` INT NOT NULL,
  `creacionDocsEquipo` DATETIME NOT NULL,
  `modificacionDocsEquipo` DATETIME NOT NULL,
  PRIMARY KEY (`iddocsEquipo`),
  INDEX `fk_docsEquipo_equipo1_idx` (`equipo` ASC),
  CONSTRAINT `fk_docsEquipo_equipo1`
    FOREIGN KEY (`equipo`)
    REFERENCES `trazabilidadDB`.`equipo` (`idequipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trazabilidadDB`.`equiposLab`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trazabilidadDB`.`equiposLab` ;

CREATE TABLE IF NOT EXISTS `trazabilidadDB`.`equiposLab` (
  `idequiposLab` INT NOT NULL,
  `nombreEquipoGenerico` VARCHAR(45) NOT NULL,
  `sucursal_idsucursal` INT NOT NULL,
  PRIMARY KEY (`idequiposLab`),
  INDEX `fk_equiposLab_sucursal1_idx` (`sucursal_idsucursal` ASC),
  CONSTRAINT `fk_equiposLab_sucursal1`
    FOREIGN KEY (`sucursal_idsucursal`)
    REFERENCES `trazabilidadDB`.`sucursal` (`idsucursal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trazabilidadDB`.`personalCapacitado`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trazabilidadDB`.`personalCapacitado` ;

CREATE TABLE IF NOT EXISTS `trazabilidadDB`.`personalCapacitado` (
  `personalLab` INT NOT NULL,
  `equiposLab` INT NOT NULL,
  PRIMARY KEY (`personalLab`, `equiposLab`),
  INDEX `fk_personalLab_has_equiposLab_equiposLab1_idx` (`equiposLab` ASC),
  INDEX `fk_personalLab_has_equiposLab_personalLab1_idx` (`personalLab` ASC),
  CONSTRAINT `fk_personalLab_has_equiposLab_personalLab1`
    FOREIGN KEY (`personalLab`)
    REFERENCES `trazabilidadDB`.`personalLab` (`idpersonalLab`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_personalLab_has_equiposLab_equiposLab1`
    FOREIGN KEY (`equiposLab`)
    REFERENCES `trazabilidadDB`.`equiposLab` (`idequiposLab`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trazabilidadDB`.`proveedor_dueno_equipo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trazabilidadDB`.`proveedor_dueno_equipo` ;

CREATE TABLE IF NOT EXISTS `trazabilidadDB`.`proveedor_dueno_equipo` (
  `proveedor` INT NOT NULL,
  `equipo` INT NOT NULL,
  PRIMARY KEY (`proveedor`, `equipo`),
  INDEX `fk_proveedor_has_equipo_equipo1_idx` (`equipo` ASC),
  INDEX `fk_proveedor_has_equipo_proveedor1_idx` (`proveedor` ASC),
  CONSTRAINT `fk_proveedor_has_equipo_proveedor1`
    FOREIGN KEY (`proveedor`)
    REFERENCES `trazabilidadDB`.`proveedor` (`idproveedor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_proveedor_has_equipo_equipo1`
    FOREIGN KEY (`equipo`)
    REFERENCES `trazabilidadDB`.`equipo` (`idequipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trazabilidadDB`.`rol`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trazabilidadDB`.`rol` ;

CREATE TABLE IF NOT EXISTS `trazabilidadDB`.`rol` (
  `idrol` INT NOT NULL,
  `nombreRol` VARCHAR(45) NOT NULL,
  `createdRol` DATETIME NOT NULL,
  `modifiedRol` DATETIME NOT NULL,
  PRIMARY KEY (`idrol`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trazabilidadDB`.`usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trazabilidadDB`.`usuario` ;

CREATE TABLE IF NOT EXISTS `trazabilidadDB`.`usuario` (
  `idusuario` INT NOT NULL,
  `nombreUsuario` VARCHAR(45) NOT NULL,
  `emailUsuario` VARCHAR(45) NOT NULL,
  `passwordUsuario` VARCHAR(45) NOT NULL,
  `createdUsuario` DATETIME NOT NULL,
  `modifiedUsuario` DATETIME NOT NULL,
  `rol` INT NOT NULL,
  `usuario_proveedor` INT NULL,
  `cliente_idcliente` INT NULL,
  PRIMARY KEY (`idusuario`),
  INDEX `fk_usuario_rol1_idx` (`rol` ASC),
  INDEX `fk_usuario_proveedor1_idx` (`usuario_proveedor` ASC),
  INDEX `fk_usuario_cliente1_idx` (`cliente_idcliente` ASC),
  CONSTRAINT `fk_usuario_rol1`
    FOREIGN KEY (`rol`)
    REFERENCES `trazabilidadDB`.`rol` (`idrol`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_usuario_proveedor1`
    FOREIGN KEY (`usuario_proveedor`)
    REFERENCES `trazabilidadDB`.`proveedor` (`idproveedor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_cliente1`
    FOREIGN KEY (`cliente_idcliente`)
    REFERENCES `trazabilidadDB`.`cliente` (`idcliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
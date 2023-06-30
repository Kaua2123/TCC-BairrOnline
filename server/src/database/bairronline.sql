-- MySQL Script generated by MySQL Workbench
-- Fri Jun 30 18:20:12 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bairronline
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bairronline
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bairronline` DEFAULT CHARACTER SET utf8 ;
USE `bairronline` ;

-- -----------------------------------------------------
-- Table `bairronline`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bairronline`.`usuario` (
  `usu_cod` INT NOT NULL AUTO_INCREMENT,
  `usu_nome` VARCHAR(45) NOT NULL,
  `usu_email` VARCHAR(45) NOT NULL,
  `usu_senha` VARCHAR(45) NOT NULL,
  `usu_tel` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`usu_cod`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bairronline`.`administrador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bairronline`.`administrador` (
  `usuario_usu_cod` INT NOT NULL,
  PRIMARY KEY (`usuario_usu_cod`),
  CONSTRAINT `fk_table1_usuario`
    FOREIGN KEY (`usuario_usu_cod`)
    REFERENCES `bairronline`.`usuario` (`usu_cod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bairronline`.`orgao publico/instituiçao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bairronline`.`orgao publico/instituiçao` (
  `usuario_usu_cod` INT NOT NULL,
  PRIMARY KEY (`usuario_usu_cod`),
  CONSTRAINT `fk_orgao publico/instituiçao_usuario1`
    FOREIGN KEY (`usuario_usu_cod`)
    REFERENCES `bairronline`.`usuario` (`usu_cod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bairronline`.`denunciante`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bairronline`.`denunciante` (
  `usuario_usu_cod` INT NOT NULL,
  PRIMARY KEY (`usuario_usu_cod`),
  CONSTRAINT `fk_denunciante_usuario1`
    FOREIGN KEY (`usuario_usu_cod`)
    REFERENCES `bairronline`.`usuario` (`usu_cod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bairronline`.`bairro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bairronline`.`bairro` (
  `bai_cod` INT NOT NULL,
  `bai_nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`bai_cod`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bairronline`.`denuncias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bairronline`.`denuncias` (
  `den_cod` INT NOT NULL,
  `den_nome` VARCHAR(45) NOT NULL,
  `den_prazo` DATE NOT NULL,
  `den_desc` MEDIUMTEXT NOT NULL,
  `bairro_bai_cod` INT NOT NULL,
  `denunciante_usuario_usu_cod` INT NOT NULL,
  PRIMARY KEY (`den_cod`),
  INDEX `fk_denuncias_bairro1_idx` (`bairro_bai_cod` ASC),
  INDEX `fk_denuncias_denunciante1_idx` (`denunciante_usuario_usu_cod` ASC),
  CONSTRAINT `fk_denuncias_bairro1`
    FOREIGN KEY (`bairro_bai_cod`)
    REFERENCES `bairronline`.`bairro` (`bai_cod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_denuncias_denunciante1`
    FOREIGN KEY (`denunciante_usuario_usu_cod`)
    REFERENCES `bairronline`.`denunciante` (`usuario_usu_cod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bairronline`.`avaliaçao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bairronline`.`avaliaçao` (
  `ava_num` INT NOT NULL,
  `ava_nota` INT NULL,
  `administrador_usuario_usu_cod` INT NOT NULL,
  `denuncias_den_cod` INT NOT NULL,
  PRIMARY KEY (`ava_num`),
  INDEX `fk_avaliaçao_administrador1_idx` (`administrador_usuario_usu_cod` ASC),
  INDEX `fk_avaliaçao_denuncias1_idx` (`denuncias_den_cod` ASC),
  CONSTRAINT `fk_avaliaçao_administrador1`
    FOREIGN KEY (`administrador_usuario_usu_cod`)
    REFERENCES `bairronline`.`administrador` (`usuario_usu_cod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_avaliaçao_denuncias1`
    FOREIGN KEY (`denuncias_den_cod`)
    REFERENCES `bairronline`.`denuncias` (`den_cod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bairronline`.`comentarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bairronline`.`comentarios` (
  `com_id` INT NOT NULL,
  `com_conteudo` MEDIUMTEXT NOT NULL,
  `com_data` DATE NOT NULL,
  `denunciante_usuario_usu_cod` INT NOT NULL,
  `denuncias_den_cod` INT NOT NULL,
  PRIMARY KEY (`com_id`),
  INDEX `fk_comentarios_denunciante1_idx` (`denunciante_usuario_usu_cod` ASC),
  INDEX `fk_comentarios_denuncias1_idx` (`denuncias_den_cod` ASC),
  CONSTRAINT `fk_comentarios_denunciante1`
    FOREIGN KEY (`denunciante_usuario_usu_cod`)
    REFERENCES `bairronline`.`denunciante` (`usuario_usu_cod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comentarios_denuncias1`
    FOREIGN KEY (`denuncias_den_cod`)
    REFERENCES `bairronline`.`denuncias` (`den_cod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bairronline`.`acompanhamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bairronline`.`acompanhamento` (
  `aco_num` INT NOT NULL,
  `aco_data` DATE NOT NULL,
  `aco_progresso` DATE NULL,
  `orgao publico/instituiçao_usuario_usu_cod` INT NOT NULL,
  `denuncias_den_cod` INT NOT NULL,
  PRIMARY KEY (`aco_num`),
  INDEX `fk_acompanhamento_orgao publico/instituiçao1_idx` (`orgao publico/instituiçao_usuario_usu_cod` ASC),
  INDEX `fk_acompanhamento_denuncias1_idx` (`denuncias_den_cod` ASC),
  CONSTRAINT `fk_acompanhamento_orgao publico/instituiçao1`
    FOREIGN KEY (`orgao publico/instituiçao_usuario_usu_cod`)
    REFERENCES `bairronline`.`orgao publico/instituiçao` (`usuario_usu_cod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_acompanhamento_denuncias1`
    FOREIGN KEY (`denuncias_den_cod`)
    REFERENCES `bairronline`.`denuncias` (`den_cod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bairronline`.`imagem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bairronline`.`imagem` (
  `img_id` INT NOT NULL,
  `denunciante_usuario_usu_cod` INT NOT NULL,
  `denuncias_den_cod` INT NOT NULL,
  PRIMARY KEY (`img_id`),
  INDEX `fk_imagem_denunciante1_idx` (`denunciante_usuario_usu_cod` ASC),
  INDEX `fk_imagem_denuncias1_idx` (`denuncias_den_cod` ASC),
  CONSTRAINT `fk_imagem_denunciante1`
    FOREIGN KEY (`denunciante_usuario_usu_cod`)
    REFERENCES `bairronline`.`denunciante` (`usuario_usu_cod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_imagem_denuncias1`
    FOREIGN KEY (`denuncias_den_cod`)
    REFERENCES `bairronline`.`denuncias` (`den_cod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

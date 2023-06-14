"\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -uroot -p1234

create schema localblog;
use localblog;

create user 'localblog'@'%' identified by '1234';
grant all privileges on localblog.* to 'localblog'@'%';

CREATE TABLE users (
  idUsers       INT NOT NULL AUTO_INCREMENT,
  id            VARCHAR(50) NOT NULL,
  nick          VARCHAR(30) NOT NULL,
  pw            VARCHAR(30) NOT NULL,
  joinDate      TIMESTAMP NOT NULL,
  lastLogin     TIMESTAMP NOT NULL,
  tier          VARCHAR(10) NOT NULL,
  img           VARCHAR(200),
  highScore     INT,
  PRIMARY KEY(idUsers));

INSERT INTO users (id, nick, pw, joinDate, lastLogin, tier, highScore) 
      VALUES ('master@lol.com', '마스터이', '1234', '2023-03-02 14:44:44', '2023-04-05 14:44:44', '돌', 1000000);
INSERT INTO users (id, nick, pw, joinDate, lastLogin, tier, highScore) 
      VALUES ('tester@hoon.com', '테스터훈', '1234', '2023-03-02 14:44:44', '2023-04-05 14:44:44', '돌', 100000);

CREATE TABLE posts (
  idposts             INT NOT NULL AUTO_INCREMENT,
  title               VARCHAR(30) NOT NULL,
  content             VARCHAR(2000) NOT NULL,
  registrationDate    TIMESTAMP NOT NULL,
  img                 VARCHAR(200),
  writer              VARCHAR(20) NOT NULL,
  writerImg           VARCHAR(200),
  PRIMARY KEY(idposts));

INSERT INTO posts (title, content, registrationDate, writer) 
      VALUES ('', '', '2023-04-11 00:00:00', 'tester');
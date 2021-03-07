--! todo servers
create TABLE servers(
id NUMBER  Primary key ,
servername VARCHAR2(30) NOT NULL,
server_pic VARCHAR2(30),
VISIBILITY VARCHAR2(20)NOT NULL ,
creator_id number not NULL,
CONSTRAINT fk_servers_users FOREIGN KEY(creator_id) REFERENCES USERS(id)
);
CREATE SEQUENCE servers_seq START WITH 1;
set SERVEROUTPUT on;
CREATE OR REPLACE TRIGGER servers_seq_trigger 
BEFORE INSERT ON servers
FOR EACH ROW
BEGIN
  SELECT servers_seq.NEXTVAL
  INTO   :new.id
  FROM   dual;
  :new.server_pic := to_char(:new.id)||:new.server_pic;
END;
/
--! Users
create TABLE users(
id NUMBER  Primary key ,
username VARCHAR2(30) NOT NULL,
email VARCHAR2(30) UNIQUE NOT NULL,
PASSWORD VARCHAR2(60) NOT NULL,
birth_date date NOT NULL,
profile_pic VARCHAR2(30) 
);
CREATE SEQUENCE users_seq START WITH 1;
CREATE OR REPLACE TRIGGER users_seq_trigger 
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
  SELECT users_seq.NEXTVAL
  INTO   :new.id
  FROM   dual;
END;
/
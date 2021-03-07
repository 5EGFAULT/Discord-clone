
select u.username,u.profile_pic,m.text from meassages m join users u on u.id= m.user_id where m.Channel_id= 1
select * from Channels where id = 1

INSERT INTO messages values(null,2,7,'${text}')

--! meassages
create TABLE messages(
id NUMBER  Primary key ,
Channel_id number not NULL,
user_id number not NULL,
text VARCHAR2(150)NOT NULL ,
CONSTRAINT fk_messages_Channels FOREIGN KEY(Channel_id) REFERENCES Channels(id),
CONSTRAINT fk_messages_users FOREIGN KEY(user_id) REFERENCES users(id)
);

drop TABLE messages;

CREATE SEQUENCE messages_seq START WITH 1;
CREATE OR REPLACE TRIGGER messages_seq_trigger 
BEFORE INSERT ON messages
FOR EACH ROW
BEGIN
  SELECT messages_seq.NEXTVAL
  INTO   :new.id
  FROM   dual;
END;
/
select * from messages ;
TRUNCATE TABLE messages;

--! Servermembers
create TABLE Servermembers(
server_id number not NULL,
user_id number not NULL,
CONSTRAINT fk_Servermembers_servers FOREIGN KEY(server_id) REFERENCES servers(id),
CONSTRAINT fk_Servermembers_users FOREIGN KEY(user_id) REFERENCES users(id)
);
select * from Servermembers ;
TRUNCATE TABLE Servermembers;
--! Channels
create TABLE channels(
id NUMBER  Primary key ,
channelname VARCHAR2(20)NOT NULL ,
group_id number not NULL,
CONSTRAINT fk_channels_groups FOREIGN KEY(group_id) REFERENCES groups(id)
);
drop TABLE channels;
drop TRIGGER channels_seq_trigger;
drop SEQUENCE channels_seq;
CREATE SEQUENCE channels_seq START WITH 1;
CREATE OR REPLACE TRIGGER channels_seq_trigger 
BEFORE INSERT ON channels
FOR EACH ROW
BEGIN
  SELECT channels_seq.NEXTVAL
  INTO   :new.id
  FROM   dual;
END;
/
select * from channels ;
TRUNCATE TABLE channels;

--! Groups
create TABLE Groups(
id NUMBER  Primary key ,
groupname VARCHAR2(20)NOT NULL ,
server_id number not NULL,
CONSTRAINT fk_channels_servers FOREIGN KEY(server_id) REFERENCES servers(id)
);
drop TABLE Groups;
drop TRIGGER Groups_seq_trigger;
drop SEQUENCE Groups_seq;
CREATE SEQUENCE Groups_seq START WITH 1;
CREATE OR REPLACE TRIGGER Groups_seq_trigger 
BEFORE INSERT ON Groups
FOR EACH ROW
BEGIN
  SELECT Groups_seq.NEXTVAL
  INTO   :new.id
  FROM   dual;
END;
/
select * from Groups ;
TRUNCATE TABLE Groups;

--! servers
create TABLE servers(
id NUMBER  Primary key ,
servername VARCHAR2(30) NOT NULL,
server_pic VARCHAR2(30),
VISIBILITY VARCHAR2(20)NOT NULL ,
creator_id number not NULL,
CONSTRAINT fk_servers_users FOREIGN KEY(creator_id) REFERENCES USERS(id)
);
drop TABLE servers;
drop TRIGGER servers_seq_trigger;
drop SEQUENCE servers_seq;
CREATE SEQUENCE servers_seq START WITH 1;
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
select * from servers ;
INSERT INTO servers values(null,'myserver','.jpg','public',7)
delete from servers where SERVERNAME = 'myserver';
TRUNCATE TABLE servers;

--! Users
create TABLE users(
id NUMBER  Primary key ,
username VARCHAR2(30) NOT NULL,
email VARCHAR2(30) UNIQUE NOT NULL,
PASSWORD VARCHAR2(60) NOT NULL,
birth_date date NOT NULL,
profile_pic VARCHAR2(30) 
);
drop TABLE users;
drop TRIGGER users_seq_trigger;
drop SEQUENCE users_seq;
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
set SERVEROUTPUT on;
CREATE OR REPLACE TRIGGER users_pic_trigger 
BEFORE UPDATE ON users
for each row

  -- if :new.profile_pic not null then
  dbms_output.put(":new.profile_pic");
  -- :new.profile_pic := to_char(:new.id)||:new.profile_pic;
  -- end if;
END;
/
UPDATE users set username='souiniaayoub1', profile_pic='.gfsg' where id=7; 
UPDATE users set username='souiniaayoub1', profile_pic='.gfsg' where id=7; 

        UPDATE users set username='${username}', profile_pic='${
          id + user_pic
        }' where id=7
                UPDATE users set username='${username}', profile_pic='${pic}' where id=1

select * from users ;

TRUNCATE TABLE users;
drop trigger users_pic_trigger;
-- set SERVEROUTPUT on;
-- CREATE OR REPLACE TRIGGER users_pic_trigger 
-- BEFORE Update ON users
-- FOR EACH ROW
-- BEGIN
--   --  if :new.profile_pic <> null then
--  dbms_output.put(:new.id);
--    --:new.profile_pic := to_char(:old.id)||:new.profile_pic;
--   --  :new.profile_pic := 'ff';
--   --  end if;
-- END;
-- /
UPDATE users set username ='souiniaayoub1', profile_pic='.gfsg' where id=7; 
select * from users ;
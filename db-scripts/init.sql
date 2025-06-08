CREATE TYPE "time_registry_status" AS ENUM (
    'AFVENTER',
    'GODKENDT',
    'AFVIST',
    'IGANG'
    );

CREATE TABLE "role"
(
    "id"        INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "role_name" VARCHAR
);

CREATE TABLE "permission"
(
    "id"               INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "permission_level" VARCHAR
);

CREATE TABLE "employee"
(
    "id"            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "first_name"    VARCHAR,
    "last_name"     VARCHAR,
    "email"         VARCHAR UNIQUE,
    "phone_number"  VARCHAR(13),
    "password"      VARCHAR(255),
    "role_id"       INTEGER,
    "permission_id" INTEGER,
    FOREIGN KEY ("role_id") REFERENCES "role" ("id"),
    FOREIGN KEY ("permission_id") REFERENCES "permission" ("id")
);

CREATE TABLE "notification"
(
    "id"        INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "comment"   VARCHAR(255),
    "timestamp" TIMESTAMP,
    "status"    time_registry_status
);

CREATE TABLE "time_entry"
(
    "id"              INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "employee_id"     INTEGER NOT NULL,
    "notification_id" INTEGER NOT NULL,
    "start_time"      TIMESTAMP,
    "end_time"        TIMESTAMP,
    "duration"        VARCHAR(255),
    "comment"         VARCHAR(255),
    "start_date"      DATE,
    "end_date"        DATE,
    "break"           INTEGER,
    FOREIGN KEY ("employee_id") REFERENCES "employee" ("id"),
    FOREIGN KEY ("notification_id") REFERENCES "notification" ("id")
);



---------------------------------------------------------------------------------
------------------------------- ROLE--------------------------------------------
---------------------------------------------------------------------------------

INSERT INTO role (role_name)
VALUES ('Anlægsarbejder');
INSERT INTO role (role_name)
VALUES ('Billetkontrollør');
INSERT INTO role (role_name)
VALUES ('Buschauffør');
INSERT INTO role (role_name)
VALUES ('Chauffør (lastbil/varebil)');
INSERT INTO role (role_name)
VALUES ('Driftstekniker');
INSERT INTO role (role_name)
VALUES ('Gravemedarbejder');
INSERT INTO role (role_name)
VALUES ('Infrastrukturtekniker');
INSERT INTO role (role_name)
VALUES ('Lagerarbejder');
INSERT INTO role (role_name)
VALUES ('Logistikassistent');
INSERT INTO role (role_name)
VALUES ('Lokomotivfører');


---------------------------------------------------------------------------------
------------------------------- PERMISSION--------------------------------------------
---------------------------------------------------------------------------------


INSERT INTO "permission" (permission_level) VALUES ('Admin');
INSERT INTO "permission" (permission_level) VALUES ('Manager');
INSERT INTO "permission" (permission_level) VALUES ('Member');




---------------------------------------------------------------------------------
------------------------------- EMPLOYEE (role_id = 1) -------------------------
---------------------------------------------------------------------------------

INSERT INTO employee (first_name, last_name, email, phone_number, password, role_id, permission_id)
VALUES ('Lars', 'Poulsen', 'lars_poulsen@supeo.dk', '23549876',
        '$2b$10$vjF3B/b1QFwUNPS56hvnI.zdsECtgFyucOIbJ8fXPE3xmNt1LJcNi', 1, 1),
       ('Karen', 'Mortensen', 'karen_mortensen@supeo.dk', '34726189',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 1, 2),
       ('Ulrik', 'Poulsen', 'ulrik_poulsen@supeo.dk', '80439275',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 1, 3),
       ('Julie', 'Larsen', 'julie_larsen@supeo.dk', '57643920',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 1, 3),
       ('Frederik', 'Iversen', 'frederik_iversen@supeo.dk', '26354978',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 1, 3);

---------------------------------------------------------------------------------
------------------------------- EMPLOYEE (role_id = 2) ------------------------
---------------------------------------------------------------------------------

INSERT INTO employee (first_name, last_name, email, phone_number, password, role_id, permission_id)
VALUES ('Camilla', 'Dalgaard', 'camilla_dalgaard@supeo.dk', '34582719',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 2, 1),
       ('Dennis', 'Villadsen', 'dennis_villadsen@supeo.dk', '45293618',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 2, 2),
       ('Helle', 'Qvist', 'helle_qvist@supeo.dk', '93845762',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 2, 3),
       ('Peter', 'Frandsen', 'peter_frandsen@supeo.dk', '69482375',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 2, 3),
       ('Eva', 'Hansen', 'eva_hansen@supeo.dk', '74823196',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 2, 3);

---------------------------------------------------------------------------------
------------------------------- EMPLOYEE (role_id = 3) ---------------------------
---------------------------------------------------------------------------------

INSERT INTO employee (first_name, last_name, email, phone_number, password, role_id, permission_id)
VALUES ('Gustav', 'Rasmussen', 'gustav_rasmussen@supeo.dk', '83561274',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 3, 1),
       ('Maria', 'Larsen', 'maria_larsen@supeo.dk', '58273194',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 3, 2),
       ('Bent', 'Eriksen', 'bent_eriksen@supeo.dk', '47829613',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 3, 3),
       ('Stine', 'Bach', 'stine_bach@supeo.dk', '69417283',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 3, 3),
       ('Ivan', 'Graversen', 'ivan_graversen@supeo.dk', '72948153',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 3, 3);

---------------------------------------------------------------------------------
------------------------------- EMPLOYEE (role_id = 4) ---------------------------
---------------------------------------------------------------------------------

INSERT INTO employee (first_name, last_name, email, phone_number, password, role_id, permission_id)
VALUES ('Lene', 'Christensen', 'lene_christensen@supeo.dk', '81492653',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 4, 1),
       ('Thomas', 'Andersen', 'thomas_andersen@supeo.dk', '29538467',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 4, 2),
       ('Olga', 'Kristensen', 'olga_kristensen@supeo.dk', '60827594',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 4, 3),
       ('Jakob', 'Olsen', 'jakob_olsen@supeo.dk', '48239576',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 4, 3),
       ('Trine', 'Nielsen', 'trine_nielsen@supeo.dk', '38467512',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 4, 3);


---------------------------------------------------------------------------------
------------------------------- EMPLOYEE (role_id = 5) ---------------------------
---------------------------------------------------------------------------------

INSERT INTO employee (first_name, last_name, email, phone_number, password, role_id, permission_id)
VALUES ('Rikke', 'Dalgaard', 'rikke_dalgaard@supeo.dk', '45298136',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 5, 1),
       ('Hans', 'Nielsen', 'hans_nielsen@supeo.dk', '23896517',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 5, 2),
       ('Karen', 'Qvist', 'karen_qvist@supeo.dk', '32874916',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 5, 3),
       ('Søren', 'Villadsen', 'søren_villadsen@supeo.dk', '48273956',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 5, 3),
       ('Nanna', 'Frandsen', 'nanna_frandsen@supeo.dk', '64728315',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 5, 3);

---------------------------------------------------------------------------------
------------------------------- EMPLOYEE (role_id = 6) ---------------------------
---------------------------------------------------------------------------------

INSERT INTO employee (first_name, last_name, email, phone_number, password, role_id, permission_id)
VALUES ('Otto', 'Thomsen', 'otto_thomsen@supeo.dk', '49263817',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 6, 1),
       ('Stine', 'Eriksen', 'stine_eriksen@supeo.dk', '67283941',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 6, 2),
       ('Anders', 'Mortensen', 'anders_mortensen@supeo.dk', '98726341',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 6, 3),
       ('Julie', 'Hansen', 'julie_hansen@supeo.dk', '69284713',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 6, 3),
       ('Mads', 'Kristensen', 'mads_kristensen@supeo.dk', '87329465',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 6, 3);

---------------------------------------------------------------------------------
------------------------------- EMPLOYEE (role_id = 7) ---------------------------
---------------------------------------------------------------------------------

INSERT INTO employee (first_name, last_name, email, phone_number, password, role_id, permission_id)
VALUES ('Birgitte', 'Iversen', 'birgitte_iversen@supeo.dk', '38274691',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 7, 1),
       ('Frederik', 'Qvist', 'frederik_qvist@supeo.dk', '92837461',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 7, 2),
       ('Eva', 'Andersen', 'eva_andersen@supeo.dk', '57138264',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 7, 3),
       ('Jakob', 'Larsen', 'jakob_larsen@supeo.dk', '91823746',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 7, 3),
       ('Anna', 'Graversen', 'anna_graversen@supeo.dk', '63249187',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 7, 3);

---------------------------------------------------------------------------------
------------------------------- EMPLOYEE (role_id = 8) ---------------------------
---------------------------------------------------------------------------------

INSERT INTO employee (first_name, last_name, email, phone_number, password, role_id, permission_id)
VALUES ('Niels', 'Andersen', 'niels_andersen@supeo.dk', '48572613',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 8, 1),
       ('Lene', 'Villadsen', 'lene_villadsen@supeo.dk', '71982346',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 8, 2),
       ('Dennis', 'Olsen', 'dennis_olsen@supeo.dk', '82371649',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 8, 3),
       ('Dorthe', 'Eriksen', 'dorthe_eriksen@supeo.dk', '69458213',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 8, 3),
       ('Christian', 'Hansen', 'christian_hansen@supeo.dk', '32741895',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 8, 3);

---------------------------------------------------------------------------------
------------------------------- EMPLOYEE (role_id = 9) ---------------------------
---------------------------------------------------------------------------------

INSERT INTO employee (first_name, last_name, email, phone_number, password, role_id, permission_id)
VALUES ('Trine', 'Jensen', 'trine_jensen@supeo.dk', '91573846',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 9, 1),
       ('Emil', 'Mortensen', 'emil_mortensen@supeo.dk', '49283716',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 9, 2),
       ('Ida', 'Larsen', 'ida_larsen@supeo.dk', '74829136',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 9, 3),
       ('Kasper', 'Poulsen', 'kasper_poulsen@supeo.dk', '91826437',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 9, 3),
       ('Pernille', 'Thomsen', 'pernille_thomsen@supeo.dk', '68321947',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 9, 3);

---------------------------------------------------------------------------------
------------------------------- EMPLOYEE (role_id = 10) --------------------------
---------------------------------------------------------------------------------

INSERT INTO employee (first_name, last_name, email, phone_number, password, role_id, permission_id)
VALUES ('Rasmus', 'Christensen', 'rasmus_christensen@supeo.dk', '81649372',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 10, 1),
       ('Ulla', 'Rasmussen', 'ulla_rasmussen@supeo.dk', '31872649',
        '$2b$10$YA7i3XU2R4SXViXo1RWnVuY41xbe9XVEgamjJcxO.cvQaLZgp4zmS', 10, 2),
       ('Bent', 'Dalgaard', 'bent_dalgaard@supeo.dk', '98234751',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 10, 3),
       ('Finn', 'Olsen', 'finn_olsen@supeo.dk', '76238419',
        '$2b$10$NQ92/84CanD//qTbSEX0QeC62AasP8To7wF8oIXbt8.odck5pgmrG', 10, 3),
       ('Peter', 'Nielsen', 'peter_nielsen@supeo.dk', '47821936',
        '$2b$10$668FFnHrqKrCDxN/mjb.le7/kU6qs4MSQW8j59UAhLCF5a7URzPA2', 10, 3);



---------------------------------------------------------------------------------
----------------------------- NOTIFICATION (blok 1 af 4) ------------------------
---------------------------------------------------------------------------------
INSERT INTO notification (comment, timestamp, status)
VALUES ('', '2025-04-01 15:45:00', 'AFVENTER'),
       ('', '2025-04-02 23:15:00', 'AFVENTER'),
       ('Vagten er ikke godkendt grundet overlap.', '2025-04-03 07:15:00', 'AFVIST'),
       ('', '2025-04-04 13:30:00', 'AFVENTER'),
       ('', '2025-04-05 11:30:00', 'AFVENTER'),
       ('Tidsregistrering godkendt.', '2025-04-06 22:00:00', 'GODKENDT'),
       ('', '2025-04-07 05:00:00', 'AFVENTER'),
       ('', '2025-04-08 06:15:00', 'AFVENTER'),
       ('Der er fejl i timetallet.', '2025-04-09 10:15:00', 'AFVIST'),
       ('', '2025-04-10 17:00:00', 'AFVENTER'),
       ('', '2025-04-11 18:30:00', 'AFVENTER'),
       ('', '2025-04-12 12:15:00', 'AFVENTER'),
       ('Tidsregistrering godkendt.', '2025-04-13 20:15:00', 'GODKENDT'),
       ('', '2025-04-14 21:00:00', 'AFVENTER'),
       ('', '2025-04-15 09:00:00', 'AFVENTER'),
       ('Forkert tidsinterval angivet.', '2025-04-16 11:45:00', 'AFVIST'),
       ('', '2025-04-17 14:15:00', 'AFVENTER'),
       ('', '2025-04-18 07:30:00', 'AFVENTER'),
       ('Godkendt. Tak for indsatsen.', '2025-04-19 06:45:00', 'GODKENDT'),
       ('', '2025-04-20 16:30:00', 'AFVENTER'),
       ('', '2025-04-21 13:45:00', 'AFVENTER'),
       ('Tidsregistrering godkendt.', '2025-04-22 20:00:00', 'GODKENDT'),
       ('', '2025-04-23 19:00:00', 'AFVENTER'),
       ('Forkert dato angivet.', '2025-04-24 08:00:00', 'AFVIST'),
       ('', '2025-04-25 17:15:00', 'AFVENTER'),
       ('', '2025-04-26 18:15:00', 'AFVENTER'),
       ('Tidsregistrering godkendt.', '2025-04-27 22:00:00', 'GODKENDT'),
       ('', '2025-04-28 15:30:00', 'AFVENTER'),
       ('', '2025-04-29 14:00:00', 'AFVENTER'),
       ('For lang vagt – ikke godkendt.', '2025-04-30 12:00:00', 'AFVIST'),
       ('', '2025-05-01 19:15:00', 'AFVENTER'),
       ('', '2025-05-02 07:15:00', 'AFVENTER'),
       ('Godkendt. Tak for indsatsen.', '2025-05-03 22:15:00', 'GODKENDT'),
       ('', '2025-05-04 09:00:00', 'AFVENTER'),
       ('', '2025-05-05 11:00:00', 'AFVENTER'),
       ('Fejl i arbejdstimer – afvist.', '2025-05-06 17:15:00', 'AFVIST'),
       ('', '2025-05-07 06:45:00', 'AFVENTER'),
       ('', '2025-05-08 10:00:00', 'AFVENTER'),
       ('Tidsregistrering godkendt.', '2025-05-09 14:30:00', 'GODKENDT'),
       ('', '2025-05-10 16:45:00', 'AFVENTER'),
       ('', '2025-05-11 05:45:00', 'AFVENTER'),
       ('Manglende kommentar – afvist.', '2025-05-12 13:15:00', 'AFVIST'),
       ('', '2025-05-13 19:00:00', 'AFVENTER'),
       ('', '2025-05-14 20:15:00', 'AFVENTER'),
       ('Tak – vagten er godkendt.', '2025-05-15 09:15:00', 'GODKENDT'),
       ('', '2025-05-16 12:30:00', 'AFVENTER'),
       ('', '2025-05-17 14:15:00', 'AFVENTER'),
       ('Tidsregistrering godkendt.', '2025-05-18 21:45:00', 'GODKENDT'),
       ('', '2025-05-19 10:15:00', 'AFVENTER');

--49
--49

---------------------------------------------------------------------------------
----------------------------- NOTIFICATION (blok 2 af 4) ------------------------
---------------------------------------------------------------------------------
INSERT INTO notification (comment, timestamp, status)
VALUES ('', '2025-05-20 18:00:00', 'AFVENTER'),
       ('', '2025-05-21 13:00:00', 'AFVENTER'),
       ('Godkendt. Alt ser fint ud.', '2025-05-22 17:15:00', 'GODKENDT'),
       ('', '2025-05-23 06:00:00', 'AFVENTER'),
       ('', '2025-05-24 11:15:00', 'AFVENTER'),
       ('Fejl i afslutningstid.', '2025-05-25 12:30:00', 'AFVIST'),
       ('', '2025-05-26 20:15:00', 'AFVENTER'),
       ('', '2025-05-27 15:15:00', 'AFVENTER'),
       ('Tidsregistrering godkendt.', '2025-05-28 22:00:00', 'GODKENDT'),
       ('', '2025-05-29 16:15:00', 'AFVENTER'),
       ('', '2025-05-30 08:00:00', 'AFVENTER'),
       ('Godkendt uden ændringer.', '2025-05-31 09:45:00', 'GODKENDT'),
       ('', '2025-06-01 14:30:00', 'AFVENTER'),
       ('', '2025-06-02 06:00:00', 'AFVENTER'),
       ('Overlappende vagt – afvist.', '2025-06-03 10:30:00', 'AFVIST'),
       ('', '2025-06-04 15:00:00', 'AFVENTER'),
       ('', '2025-06-05 18:30:00', 'AFVENTER'),
       ('Tidsregistrering godkendt.', '2025-06-06 12:15:00', 'GODKENDT'),
       ('', '2025-06-07 17:00:00', 'AFVENTER'),
       ('', '2025-06-08 13:30:00', 'AFVENTER'),
       ('For lang vagt – ikke godkendt.', '2025-06-09 19:00:00', 'AFVIST'),
       ('', '2025-06-10 09:00:00', 'AFVENTER'),
       ('', '2025-06-11 11:15:00', 'AFVENTER'),
       ('Godkendt. Alt ser fint ud.', '2025-06-12 16:00:00', 'GODKENDT'),
       ('', '2025-06-13 20:15:00', 'AFVENTER'),
       ('', '2025-06-14 07:45:00', 'AFVENTER'),
       ('Afvist pga. manglende pausetid.', '2025-06-15 08:45:00', 'AFVIST'),
       ('', '2025-06-16 12:00:00', 'AFVENTER'),
       ('', '2025-06-17 14:45:00', 'AFVENTER'),
       ('Tidsregistrering godkendt.', '2025-06-18 10:00:00', 'GODKENDT'),
       ('', '2025-06-19 13:00:00', 'AFVENTER'),
       ('', '2025-06-20 18:15:00', 'AFVENTER'),
       ('Fejl i afslutningstid.', '2025-06-21 22:00:00', 'AFVIST'),
       ('', '2025-06-22 11:00:00', 'AFVENTER'),
       ('', '2025-06-22 15:00:00', 'AFVENTER'),
       ('Godkendt uden ændringer.', '2025-06-22 18:15:00', 'GODKENDT'),
       ('', '2025-06-22 20:00:00', 'AFVENTER'),
       ('', '2025-06-22 21:45:00', 'AFVENTER'),
       ('Tidsregistrering godkendt.', '2025-06-22 23:45:00', 'GODKENDT'),
       ('', '2025-06-22 08:00:00', 'AFVENTER'),
       ('', '2025-06-22 09:15:00', 'AFVENTER'),
       ('Forkert slutdato angivet.', '2025-06-22 12:30:00', 'AFVIST'),
       ('', '2025-06-22 14:00:00', 'AFVENTER'),
       ('', '2025-06-22 16:15:00', 'AFVENTER'),
       ('Alt OK. Godkendt.', '2025-06-22 19:00:00', 'GODKENDT'),
       ('', '2025-06-22 22:00:00', 'AFVENTER');

--46
--total 95
---------------------------------------------------------------------------------
------------------------------- NOTIFICATION (blok 3 af 4) ---------------------------
---------------------------------------------------------------------------------

INSERT INTO notification (comment, timestamp, status)
VALUES ('Godkendt. Alt ser fint ud.', '2025-05-05 12:15:00', 'GODKENDT'),
       ('Forkert slutdato angivet.', '2025-06-11 12:30:00', 'AFVIST'),
       ('Godkendt. Alt ser fint ud.', '2025-04-09 12:00:00', 'GODKENDT'),
       ('Fejl i arbejdstimer – afvist.', '2025-04-19 03:00:00', 'AFVIST'),
       ('', '2025-04-18 16:45:00', 'AFVENTER'),
       ('', '2025-04-13 09:15:00', 'AFVENTER'),
       ('', '2025-05-14 08:00:00', 'AFVENTER'),
       ('Godkendt. Alt ser fint ud.', '2025-05-30 12:30:00', 'GODKENDT'),
       ('Forkert slutdato angivet.', '2025-06-10 03:00:00', 'AFVIST'),
       ('', '2025-05-10 07:30:00', 'AFVENTER'),
       ('Godkendt. Alt ser fint ud.', '2025-05-09 12:00:00', 'GODKENDT'),
       ('Forkert slutdato angivet.', '2025-06-17 14:00:00', 'AFVIST'),
       ('', '2025-06-21 06:45:00', 'AFVENTER'),
       ('', '2025-06-10 06:30:00', 'AFVENTER'),
       ('', '2025-06-01 05:00:00', 'AFVENTER'),
       ('Godkendt. Alt ser fint ud.', '2025-05-04 12:00:00', 'GODKENDT'),
       ('Forkert slutdato angivet.', '2025-04-07 06:30:00', 'AFVIST'),
       ('', '2025-05-10 11:45:00', 'AFVENTER'),
       ('', '2025-04-05 05:00:00', 'AFVENTER'),
       ('', '2025-05-13 09:15:00', 'AFVENTER'),
       ('Godkendt. Alt ser fint ud.', '2025-06-18 08:15:00', 'GODKENDT'),
       ('Fejl i arbejdstimer – afvist.', '2025-05-28 07:30:00', 'AFVIST'),
       ('', '2025-06-07 07:30:00', 'AFVENTER'),
       ('Godkendt. Alt ser fint ud.', '2025-05-06 13:45:00', 'GODKENDT'),
       ('Forkert slutdato angivet.', '2025-05-13 12:45:00', 'AFVIST'),
       ('', '2025-06-11 06:00:00', 'AFVENTER'),
       ('', '2025-04-17 11:15:00', 'AFVENTER'),
       ('', '2025-06-12 08:15:00', 'AFVENTER'),
       ('Godkendt. Alt ser fint ud.', '2025-04-10 13:00:00', 'GODKENDT'),
       ('Fejl i arbejdstimer – afvist.', '2025-06-06 11:45:00', 'AFVIST'),
       ('', '2025-06-09 08:30:00', 'AFVENTER'),
       ('Godkendt. Alt ser fint ud.', '2025-04-15 11:15:00', 'GODKENDT'),
       ('Forkert slutdato angivet.', '2025-05-14 08:15:00', 'AFVIST'),
       ('', '2025-05-25 14:00:00', 'AFVENTER'),
       ('', '2025-04-16 08:00:00', 'AFVENTER'),
       ('', '2025-04-11 13:30:00', 'AFVENTER'),
       ('Godkendt. Alt ser fint ud.', '2025-05-07 07:15:00', 'GODKENDT'),
       ('Fejl i arbejdstimer – afvist.', '2025-04-26 06:45:00', 'AFVIST'),
       ('', '2025-05-19 12:15:00', 'AFVENTER'),
       ('Godkendt. Alt ser fint ud.', '2025-05-01 09:15:00', 'GODKENDT'),
       ('Forkert slutdato angivet.', '2025-04-25 11:30:00', 'AFVIST'),
       ('', '2025-06-08 10:00:00', 'AFVENTER'),
       ('', '2025-04-27 08:00:00', 'AFVENTER'),
       ('', '2025-04-06 13:30:00', 'AFVENTER'),
       ('Godkendt. Alt ser fint ud.', '2025-06-18 13:45:00', 'GODKENDT'),
       ('Forkert slutdato angivet.', '2025-04-21 14:45:00', 'AFVIST'),
       ('', '2025-05-06 14:00:00', 'AFVENTER'),
       ('', '2025-04-12 06:00:00', 'AFVENTER'),
       ('', '2025-04-19 11:00:00', 'AFVENTER'),
       ('', '2025-04-23 08:15:00', 'AFVENTER');

--50
--145

---------------------------------------------------------------------------------
----------------------------- NOTIFICATION (blok 4 af 4) ------------------------
---------------------------------------------------------------------------------
INSERT INTO notification (comment, timestamp, status)
VALUES ('', '2025-06-22 13:00:00', 'AFVENTER'),
       ('Forkert antal timer angivet.', '2025-06-22 14:15:00', 'AFVIST'),
       ('Tidsregistrering godkendt.', '2025-06-22 15:30:00', 'GODKENDT'),
       ('', '2025-06-22 16:45:00', 'AFVENTER'),
       ('', '2025-06-22 18:00:00', 'AFVENTER'),
       ('Tidsregistrering godkendt.', '2025-06-22 19:15:00', 'GODKENDT'),
       ('', '2025-06-22 20:30:00', 'AFVENTER'),
       ('', NULL, 'IGANG');

--8
--153

---------------------------------------------------------------------------------
---------------------------- TIME_ENTRY (blok 1 af 4) 49 --------------------------
---------------------------------------------------------------------------------
INSERT INTO time_entry (employee_id, notification_id, start_time, end_time, duration, comment, start_date, end_date, break)
VALUES
    (1, 1, '2025-04-01 10:30:00', '2025-04-01 15:45:00', '5 timer, 15 minutter', 'Alt er dokumenteret.', '2025-04-01', '2025-04-01', 30),
    (1, 2, '2025-04-02 16:00:00', '2025-04-02 23:15:00', '7 timer, 15 minutter', '', '2025-04-02', '2025-04-02', 30),
    (1, 3, '2025-04-03 00:30:00', '2025-04-03 07:15:00', '6 timer, 45 minutter', '', '2025-04-03', '2025-04-03', 30),
    (2, 4, '2025-04-04 06:15:00', '2025-04-04 13:30:00', '7 timer, 15 minutter', '', '2025-04-04', '2025-04-04', 30),
    (2, 5, '2025-04-05 00:15:00', '2025-04-05 11:30:00', '11 timer, 15 minutter', 'Alt er dokumenteret.', '2025-04-05', '2025-04-05', 30),
    (2, 6, '2025-04-06 12:45:00', '2025-04-06 22:00:00', '9 timer, 15 minutter', '', '2025-04-06', '2025-04-06', 30),
    (3, 7, '2025-04-06 20:45:00', '2025-04-07 05:00:00', '8 timer, 15 minutter', '', '2025-04-07', '2025-04-07', 30),
    (3, 8, '2025-04-08 00:00:00', '2025-04-08 06:15:00', '6 timer, 15 minutter', 'Arbejdet forløb uden problemer.', '2025-04-08', '2025-04-08', 30),
    (3, 9, '2025-04-09 01:00:00', '2025-04-09 10:15:00', '9 timer, 15 minutter', '', '2025-04-09', '2025-04-09', 30),
    (4, 10, '2025-04-10 07:00:00', '2025-04-10 17:00:00', '10 timer, 0 minutter', '', '2025-04-10', '2025-04-10', 30),
    (4, 11, '2025-04-11 08:00:00', '2025-04-11 18:30:00', '10 timer, 30 minutter', '', '2025-04-11', '2025-04-11', 30),
    (4, 12, '2025-04-12 04:00:00', '2025-04-12 12:15:00', '8 timer, 15 minutter', '', '2025-04-12', '2025-04-12', 30),
    (5, 13, '2025-04-13 12:00:00', '2025-04-13 20:15:00', '8 timer, 15 minutter', '', '2025-04-13', '2025-04-13', 30),
    (5, 14, '2025-04-14 12:45:00', '2025-04-14 21:00:00', '8 timer, 15 minutter', '', '2025-04-14', '2025-04-14', 30),
    (5, 15, '2025-04-15 00:00:00', '2025-04-15 09:00:00', '9 timer, 0 minutter', '', '2025-04-15', '2025-04-15', 30),
    (6, 16, '2025-04-16 03:00:00', '2025-04-16 11:45:00', '8 timer, 45 minutter', 'Arbejdet forløb uden problemer.', '2025-04-16', '2025-04-16', 30),
    (6, 17, '2025-04-17 05:45:00', '2025-04-17 14:15:00', '8 timer, 30 minutter', '', '2025-04-17', '2025-04-17', 30),
    (6, 18, '2025-04-18 00:00:00', '2025-04-18 07:30:00', '7 timer, 30 minutter', '', '2025-04-18', '2025-04-18', 30),
    (7, 19, '2025-04-18 23:15:00', '2025-04-19 06:45:00', '7 timer, 30 minutter', '', '2025-04-19', '2025-04-19', 30),
    (7, 20, '2025-04-20 07:00:00', '2025-04-20 16:30:00', '9 timer, 30 minutter', '', '2025-04-20', '2025-04-20', 30),
    (7, 21, '2025-04-21 04:15:00', '2025-04-21 13:45:00', '9 timer, 30 minutter', '', '2025-04-21', '2025-04-21', 30),
    (8, 22, '2025-04-22 12:45:00', '2025-04-22 20:00:00', '7 timer, 15 minutter', '', '2025-04-22', '2025-04-22', 30),
    (8, 23, '2025-04-23 09:45:00', '2025-04-23 19:00:00', '9 timer, 15 minutter', '', '2025-04-23', '2025-04-23', 30),
    (8, 24, '2025-04-24 00:15:00', '2025-04-24 08:00:00', '7 timer, 45 minutter', '', '2025-04-24', '2025-04-24', 30),
    (9, 25, '2025-04-25 09:30:00', '2025-04-25 17:15:00', '7 timer, 45 minutter', '', '2025-04-25', '2025-04-25', 30),
    (9, 26, '2025-04-26 08:15:00', '2025-04-26 18:15:00', '10 timer, 0 minutter', '', '2025-04-26', '2025-04-26', 30),
    (9, 27, '2025-04-27 14:00:00', '2025-04-27 22:00:00', '8 timer, 0 minutter', '', '2025-04-27', '2025-04-27', 30),
    (10, 28, '2025-04-28 07:00:00', '2025-04-28 15:30:00', '8 timer, 30 minutter', '', '2025-04-28', '2025-04-28', 30),
    (10, 29, '2025-04-29 06:00:00', '2025-04-29 14:00:00', '8 timer, 0 minutter', '', '2025-04-29', '2025-04-29', 30),
    (10, 30, '2025-04-30 04:00:00', '2025-04-30 12:00:00', '8 timer, 0 minutter', '', '2025-04-30', '2025-04-30', 30),
    (11, 31, '2025-05-01 11:15:00', '2025-05-01 19:15:00', '8 timer, 0 minutter', '', '2025-05-01', '2025-05-01', 30),
    (11, 32, '2025-05-02 23:45:00', '2025-05-02 07:15:00', '7 timer, 30 minutter', '', '2025-05-02', '2025-05-02', 30),
    (11, 33, '2025-05-03 14:45:00', '2025-05-03 22:15:00', '7 timer, 30 minutter', '', '2025-05-03', '2025-05-03', 30),
    (12, 34, '2025-05-04 00:30:00', '2025-05-04 09:00:00', '8 timer, 30 minutter', '', '2025-05-04', '2025-05-04', 30),
    (12, 35, '2025-05-05 02:30:00', '2025-05-05 11:00:00', '8 timer, 30 minutter', '', '2025-05-05', '2025-05-05', 30),
    (12, 36, '2025-05-06 08:45:00', '2025-05-06 17:15:00', '8 timer, 30 minutter', '', '2025-05-06', '2025-05-06', 30),
    (13, 37, '2025-05-07 00:15:00', '2025-05-07 06:45:00', '6 timer, 30 minutter', '', '2025-05-07', '2025-05-07', 30),
    (13, 38, '2025-05-08 01:30:00', '2025-05-08 10:00:00', '8 timer, 30 minutter', '', '2025-05-08', '2025-05-08', 30),
    (13, 39, '2025-05-09 06:00:00', '2025-05-09 14:30:00', '8 timer, 30 minutter', '', '2025-05-09', '2025-05-09', 30),
    (14, 40, '2025-05-10 08:15:00', '2025-05-10 16:45:00', '8 timer, 30 minutter', '', '2025-05-10', '2025-05-10', 30),
    (14, 41, '2025-05-11 22:15:00', '2025-05-11 05:45:00', '7 timer, 30 minutter', '', '2025-05-11', '2025-05-11', 30),
    (14, 42, '2025-05-12 05:45:00', '2025-05-12 13:15:00', '7 timer, 30 minutter', '', '2025-05-12', '2025-05-12', 30),
    (15, 43, '2025-05-13 10:30:00', '2025-05-13 19:00:00', '8 timer, 30 minutter', '', '2025-05-13', '2025-05-13', 30),
    (15, 44, '2025-05-14 11:45:00', '2025-05-14 20:15:00', '8 timer, 30 minutter', '', '2025-05-14', '2025-05-14', 30),
    (15, 45, '2025-05-15 00:45:00', '2025-05-15 09:15:00', '8 timer, 30 minutter', '', '2025-05-15', '2025-05-15', 30),
    (16, 46, '2025-05-16 04:00:00', '2025-05-16 12:30:00', '8 timer, 30 minutter', '', '2025-05-16', '2025-05-16', 30),
    (16, 47, '2025-05-17 05:45:00', '2025-05-17 14:15:00', '8 timer, 30 minutter', '', '2025-05-17', '2025-05-17', 30),
    (16, 48, '2025-05-18 13:15:00', '2025-05-18 21:45:00', '8 timer, 30 minutter', '', '2025-05-18', '2025-05-18', 30),
    (17, 49, '2025-05-19 01:45:00', '2025-05-19 10:15:00', '8 timer, 30 minutter', '', '2025-05-19', '2025-05-19', 30);



---------------------------------------------------------------------------------
----------------------------- TIME_ENTRY (blok 2 af 4) 46 --------------------------
---------------------------------------------------------------------------------

INSERT INTO time_entry (
    employee_id, notification_id, start_time, end_time, duration, comment,
    start_date, end_date, break
) VALUES
      (17, 50, '2025-05-20 09:00:00', '2025-05-20 18:00:00', '9 timer, 0 minutter', '', '2025-05-20', '2025-05-20', 30),
      (17, 51, '2025-05-21 04:00:00', '2025-05-21 13:00:00', '9 timer, 0 minutter', '', '2025-05-21', '2025-05-21', 30),
      (18, 52, '2025-05-22 08:15:00', '2025-05-22 17:15:00', '9 timer, 0 minutter', 'Godkendt. Alt ser fint ud.', '2025-05-22', '2025-05-22', 30),
      (18, 53, '2025-05-23 21:00:00', '2025-05-23 06:00:00', '9 timer, 0 minutter', '', '2025-05-23', '2025-05-24', 30),
      (18, 54, '2025-05-24 02:15:00', '2025-05-24 11:15:00', '9 timer, 0 minutter', '', '2025-05-24', '2025-05-24', 30),
      (19, 55, '2025-05-25 03:30:00', '2025-05-25 12:30:00', '9 timer, 0 minutter', 'Fejl i afslutningstid.', '2025-05-25', '2025-05-25', 30),
      (19, 56, '2025-05-26 11:15:00', '2025-05-26 20:15:00', '9 timer, 0 minutter', '', '2025-05-26', '2025-05-26', 30),
      (19, 57, '2025-05-27 06:15:00', '2025-05-27 15:15:00', '9 timer, 0 minutter', '', '2025-05-27', '2025-05-27', 30),
      (20, 58, '2025-05-28 13:00:00', '2025-05-28 22:00:00', '9 timer, 0 minutter', 'Tidsregistrering godkendt.', '2025-05-28', '2025-05-28', 30),
      (20, 59, '2025-05-29 07:15:00', '2025-05-29 16:15:00', '9 timer, 0 minutter', '', '2025-05-29', '2025-05-29', 30),
      (20, 60, '2025-05-30 23:00:00', '2025-05-30 08:00:00', '9 timer, 0 minutter', '', '2025-05-30', '2025-05-31', 30),
      (21, 61, '2025-05-31 00:45:00', '2025-05-31 09:45:00', '9 timer, 0 minutter', 'Godkendt uden ændringer.', '2025-05-31', '2025-05-31', 30),
      (21, 62, '2025-06-01 05:30:00', '2025-06-01 14:30:00', '9 timer, 0 minutter', '', '2025-06-01', '2025-06-01', 30),
      (21, 63, '2025-06-02 21:00:00', '2025-06-02 06:00:00', '9 timer, 0 minutter', '', '2025-06-02', '2025-06-03', 30),
      (22, 64, '2025-06-03 01:30:00', '2025-06-03 10:30:00', '9 timer, 0 minutter', 'Overlappende vagt – afvist.', '2025-06-03', '2025-06-03', 30),
      (22, 65, '2025-06-04 06:00:00', '2025-06-04 15:00:00', '9 timer, 0 minutter', '', '2025-06-04', '2025-06-04', 30),
      (22, 66, '2025-06-05 09:30:00', '2025-06-05 18:30:00', '9 timer, 0 minutter', '', '2025-06-05', '2025-06-05', 30),
      (23, 67, '2025-06-06 03:15:00', '2025-06-06 12:15:00', '9 timer, 0 minutter', 'Tidsregistrering godkendt.', '2025-06-06', '2025-06-06', 30),
      (23, 68, '2025-06-07 08:00:00', '2025-06-07 17:00:00', '9 timer, 0 minutter', '', '2025-06-07', '2025-06-07', 30),
      (23, 69, '2025-06-08 04:30:00', '2025-06-08 13:30:00', '9 timer, 0 minutter', '', '2025-06-08', '2025-06-08', 30),
      (24, 70, '2025-06-09 10:00:00', '2025-06-09 19:00:00', '9 timer, 0 minutter', 'For lang vagt – ikke godkendt.', '2025-06-09', '2025-06-09', 30),
      (24, 71, '2025-06-10 00:00:00', '2025-06-10 09:00:00', '9 timer, 0 minutter', '', '2025-06-10', '2025-06-10', 30),
      (24, 72, '2025-06-11 02:15:00', '2025-06-11 11:15:00', '9 timer, 0 minutter', '', '2025-06-11', '2025-06-11', 30),
      (25, 73, '2025-06-12 07:00:00', '2025-06-12 16:00:00', '9 timer, 0 minutter', 'Godkendt. Alt ser fint ud.', '2025-06-12', '2025-06-12', 30),
      (25, 74, '2025-06-13 11:15:00', '2025-06-13 20:15:00', '9 timer, 0 minutter', '', '2025-06-13', '2025-06-13', 30),
      (25, 75, '2025-06-14 22:45:00', '2025-06-14 07:45:00', '9 timer, 0 minutter', '', '2025-06-14', '2025-06-15', 30),
      (26, 76, '2025-06-15 23:45:00', '2025-06-15 08:45:00', '9 timer, 0 minutter', 'Afvist pga. manglende pausetid.', '2025-06-15', '2025-06-16', 30),
      (26, 77, '2025-06-16 03:00:00', '2025-06-16 12:00:00', '9 timer, 0 minutter', '', '2025-06-16', '2025-06-16', 30),
      (26, 78, '2025-06-17 05:45:00', '2025-06-17 14:45:00', '9 timer, 0 minutter', '', '2025-06-17', '2025-06-17', 30),
      (27, 79, '2025-06-18 01:00:00', '2025-06-18 10:00:00', '9 timer, 0 minutter', 'Tidsregistrering godkendt.', '2025-06-18', '2025-06-18', 30),
      (27, 80, '2025-06-19 04:00:00', '2025-06-19 13:00:00', '9 timer, 0 minutter', '', '2025-06-19', '2025-06-19', 30),
      (27, 81, '2025-06-20 09:15:00', '2025-06-20 18:15:00', '9 timer, 0 minutter', '', '2025-06-20', '2025-06-20', 30),
      (28, 82, '2025-06-21 13:00:00', '2025-06-21 22:00:00', '9 timer, 0 minutter', 'Fejl i afslutningstid.', '2025-06-21', '2025-06-21', 30),
      (28, 83, '2025-06-22 02:00:00', '2025-06-22 11:00:00', '9 timer, 0 minutter', '', '2025-06-22', '2025-06-22', 30),
      (28, 84, '2025-06-22 06:00:00', '2025-06-22 15:00:00', '9 timer, 0 minutter', '', '2025-06-22', '2025-06-22', 30),
      (29, 85, '2025-06-22 09:15:00', '2025-06-22 18:15:00', '9 timer, 0 minutter', 'Godkendt uden ændringer.', '2025-06-22', '2025-06-22', 30),
      (29, 86, '2025-06-22 11:00:00', '2025-06-22 20:00:00', '9 timer, 0 minutter', '', '2025-06-22', '2025-06-22', 30),
      (29, 87, '2025-06-22 12:45:00', '2025-06-22 21:45:00', '9 timer, 0 minutter', '', '2025-06-22', '2025-06-22', 30),
      (30, 88, '2025-06-22 14:45:00', '2025-06-22 23:45:00', '9 timer, 0 minutter', 'Tidsregistrering godkendt.', '2025-06-22', '2025-06-22', 30),
      (30, 89, '2025-06-22 05:00:00', '2025-06-22 08:00:00', '3 timer, 0 minutter', '', '2025-06-22', '2025-06-22', 30),
      (30, 90, '2025-06-22 06:15:00', '2025-06-22 09:15:00', '3 timer, 0 minutter', '', '2025-06-22', '2025-06-22', 30),
      (31, 91, '2025-06-22 09:30:00', '2025-06-22 12:30:00', '3 timer, 0 minutter', 'Forkert slutdato angivet.', '2025-06-22', '2025-06-22', 30),
      (31, 92, '2025-06-22 11:00:00', '2025-06-22 14:00:00', '3 timer, 0 minutter', '', '2025-06-22', '2025-06-22', 30),
      (31, 93, '2025-06-22 13:15:00', '2025-06-22 16:15:00', '3 timer, 0 minutter', '', '2025-06-22', '2025-06-22', 30),
      (32, 94, '2025-06-22 16:00:00', '2025-06-22 19:00:00', '3 timer, 0 minutter', 'Alt OK. Godkendt.', '2025-06-22', '2025-06-22', 30),
      (32, 95, '2025-06-22 19:00:00', '2025-06-22 22:00:00', '3 timer, 0 minutter', '', '2025-06-22', '2025-06-22', 30);


---------------------------------------------------------------------------------
----------------------------- TIME_ENTRY (blok 3 af 4) 50 --------------------------
---------------------------------------------------------------------------------
INSERT INTO time_entry (employee_id, notification_id, start_time, end_time, duration, comment, start_date, end_date, break)
VALUES
    (32, 96, '2025-05-05 03:45:00', '2025-05-05 12:15:00', '8 timer, 30 minutter', '', '2025-05-05', '2025-05-05', 30),
    (32, 97, '2025-06-11 03:00:00', '2025-06-11 12:30:00', '9 timer, 30 minutter', '', '2025-06-11', '2025-06-11', 30),
    (32, 98, '2025-04-09 03:00:00', '2025-04-09 12:00:00', '9 timer, 0 minutter', '', '2025-04-09', '2025-04-09', 30),
    (33, 99, '2025-04-18 18:00:00', '2025-04-19 03:00:00', '9 timer, 0 minutter', 'Lang nattevagt.', '2025-04-19', '2025-04-19', 30),
    (33, 100, '2025-04-18 08:15:00', '2025-04-18 16:45:00', '8 timer, 30 minutter', '', '2025-04-18', '2025-04-18', 30),
    (33, 101, '2025-04-13 00:45:00', '2025-04-13 09:15:00', '8 timer, 30 minutter', '', '2025-04-13', '2025-04-13', 30),
    (34, 102, '2025-05-14 23:15:00', '2025-05-14 08:00:00', '8 timer, 45 minutter', 'Overarbejde med møder.', '2025-05-14', '2025-05-14', 30),
    (34, 103, '2025-05-30 03:00:00', '2025-05-30 12:30:00', '9 timer, 30 minutter', '', '2025-05-30', '2025-05-30', 30),
    (34, 104, '2025-06-09 18:00:00', '2025-06-10 03:00:00', '9 timer, 0 minutter', '', '2025-06-10', '2025-06-10', 30),
    (35, 105, '2025-05-09 23:00:00', '2025-05-10 07:30:00', '8 timer, 30 minutter', '', '2025-05-10', '2025-05-10', 30),
    (35, 106, '2025-05-09 03:30:00', '2025-05-09 12:00:00', '8 timer, 30 minutter', 'Tidligt op.', '2025-05-09', '2025-05-09', 30),
    (35, 107, '2025-06-17 05:30:00', '2025-06-17 14:00:00', '8 timer, 30 minutter', '', '2025-06-17', '2025-06-17', 30),
    (36, 108, '2025-06-20 22:30:00', '2025-06-21 06:45:00', '8 timer, 15 minutter', '', '2025-06-21', '2025-06-21', 30),
    (36, 109, '2025-06-09 21:15:00', '2025-06-10 06:30:00', '9 timer, 15 minutter', '', '2025-06-10', '2025-06-10', 30),
    (36, 110, '2025-05-31 20:00:00', '2025-06-01 05:00:00', '9 timer, 0 minutter', 'Lang vagt.', '2025-06-01', '2025-06-01', 30),
    (37, 111, '2025-05-04 03:30:00', '2025-05-04 12:00:00', '8 timer, 30 minutter', '', '2025-05-04', '2025-05-04', 30),
    (37, 112, '2025-04-06 21:00:00', '2025-04-07 06:30:00', '9 timer, 30 minutter', '', '2025-04-07', '2025-04-07', 30),
    (37, 113, '2025-05-10 02:15:00', '2025-05-10 11:45:00', '9 timer, 30 minutter', '', '2025-05-10', '2025-05-10', 30),
    (38, 114, '2025-04-04 20:30:00', '2025-04-05 05:00:00', '8 timer, 30 minutter', '', '2025-05-05', '2025-05-05', 30),
    (38, 115, '2025-05-13 00:45:00', '2025-05-13 09:15:00', '8 timer, 30 minutter', '', '2025-05-13', '2025-05-13', 30),
    (38, 116, '2025-06-17 23:45:00', '2025-06-18 08:15:00', '8 timer, 30 minutter', '', '2025-06-18', '2025-06-18', 30),
    (39, 117, '2025-05-27 23:00:00', '2025-05-28 07:30:00', '8 timer, 30 minutter', '', '2025-05-28', '2025-05-28', 30),
    (39, 118, '2025-06-06 22:00:00', '2025-06-07 07:30:00', '9 timer, 30 minutter', '', '2025-06-07', '2025-06-07', 30),
    (39, 119, '2025-05-06 04:15:00', '2025-05-06 13:45:00', '9 timer, 30 minutter', 'Dagen forløb glat.', '2025-05-06', '2025-05-06', 30),
    (40, 120, '2025-05-13 03:15:00', '2025-05-13 12:45:00', '9 timer, 30 minutter', '', '2025-05-13', '2025-05-13', 30),
    (40, 121, '2025-06-10 21:30:00', '2025-06-11 06:00:00', '8 timer, 30 minutter', '', '2025-06-11', '2025-06-11', 30),
    (40, 122, '2025-04-17 02:45:00', '2025-04-17 11:15:00', '8 timer, 30 minutter', '', '2025-04-17', '2025-04-17', 30),
    (41, 123, '2025-06-12 23:45:00', '2025-06-12 08:15:00', '8 timer, 30 minutter', '', '2025-06-12', '2025-06-12', 30),
    (41, 124, '2025-04-10 04:30:00', '2025-04-10 13:00:00', '8 timer, 30 minutter', '', '2025-04-10', '2025-04-10', 30),
    (41, 125, '2025-06-06 02:15:00', '2025-06-06 11:45:00', '9 timer, 30 minutter', '', '2025-06-06', '2025-06-06', 30),
    (42, 126, '2025-06-08 23:00:00', '2025-06-09 08:30:00', '9 timer, 30 minutter', '', '2025-06-09', '2025-06-09', 30),
    (42, 127, '2025-04-15 01:45:00', '2025-04-15 11:15:00', '9 timer, 30 minutter', '', '2025-04-15', '2025-04-15', 30),
    (42, 128, '2025-05-13 23:45:00', '2025-05-14 08:15:00', '8 timer, 30 minutter', '', '2025-05-14', '2025-05-14', 30),
    (43, 129, '2025-05-25 05:30:00', '2025-05-25 14:00:00', '8 timer, 30 minutter', '', '2025-05-25', '2025-05-25', 30),
    (43, 130, '2025-04-15 23:30:00', '2025-04-16 08:00:00', '8 timer, 30 minutter', '', '2025-04-16', '2025-04-16', 30),
    (43, 131, '2025-04-11 05:00:00', '2025-04-11 13:30:00', '8 timer, 30 minutter', '', '2025-04-11', '2025-04-11', 30),
    (44, 132, '2025-05-06 22:45:00', '2025-05-07 07:15:00', '8 timer, 30 minutter', '', '2025-05-07', '2025-05-07', 30),
    (44, 133, '2025-04-25 22:15:00', '2025-04-26 06:45:00', '8 timer, 30 minutter', '', '2025-04-26', '2025-04-26', 30),
    (44, 134, '2025-05-19 03:45:00', '2025-05-19 12:15:00', '8 timer, 30 minutter', '', '2025-05-19', '2025-05-19', 30),
    (45, 135, '2025-05-01 00:45:00', '2025-05-01 09:15:00', '8 timer, 30 minutter', '', '2025-05-01', '2025-05-01', 30),
    (45, 136, '2025-04-25 02:00:00', '2025-04-25 11:30:00', '9 timer, 30 minutter', '', '2025-04-25', '2025-04-25', 30),
    (45, 137, '2025-06-08 01:30:00', '2025-06-08 10:00:00', '8 timer, 30 minutter', '', '2025-06-08', '2025-06-08', 30),
    (46, 138, '2025-04-26 23:30:00', '2025-04-27 08:00:00', '8 timer, 30 minutter', '', '2025-04-27', '2025-04-27', 30),
    (46, 139, '2025-04-06 05:00:00', '2025-04-06 13:30:00', '8 timer, 30 minutter', '', '2025-04-06', '2025-04-06', 30),
    (46, 140, '2025-06-18 05:15:00', '2025-06-18 13:45:00', '8 timer, 30 minutter', '', '2025-06-18', '2025-06-18', 30),
    (47, 141, '2025-04-21 06:15:00', '2025-04-21 14:45:00', '8 timer, 30 minutter', '', '2025-04-21', '2025-04-21', 30),
    (47, 142, '2025-05-06 05:30:00', '2025-05-06 14:00:00', '8 timer, 30 minutter', '', '2025-05-06', '2025-05-06', 30),
    (47, 143, '2025-04-11 21:30:00', '2025-04-12 06:00:00', '8 timer, 30 minutter', '', '2025-04-12', '2025-04-12', 30),
    (48, 144, '2025-04-19 01:30:00', '2025-04-19 11:00:00', '9 timer, 30 minutter', '', '2025-04-19', '2025-04-19', 30),
    (48, 145, '2025-04-22 23:45:00', '2025-04-23 08:15:00', '8 timer, 30 minutter', '', '2025-04-23', '2025-04-23', 30);


---------------------------------------------------------------------------------
----------------------------- TIME_ENTRY (blok 4 af 4) 8 --------------------------
---------------------------------------------------------------------------------
INSERT INTO time_entry (employee_id, notification_id, start_time, end_time, duration, comment, start_date, end_date, break)
VALUES
    (48, 146, '2025-06-22 04:30:00', '2025-06-22 13:00:00', '8 timer, 30 minutter', '', '2025-06-22', '2025-06-22', 30),
    (48, 147, '2025-06-22 05:45:00', '2025-06-22 14:15:00', '8 timer, 30 minutter', '', '2025-06-22', '2025-06-22', 30),
    (49, 148, '2025-06-22 06:00:00', '2025-06-22 15:30:00', '9 timer, 30 minutter', 'Tog forsinket ved skift.', '2025-06-22', '2025-06-22', 30),
    (49, 149, '2025-06-22 07:15:00', '2025-06-22 16:45:00', '9 timer, 30 minutter', '', '2025-06-22', '2025-06-22', 30),
    (49, 150, '2025-06-22 09:30:00', '2025-06-22 18:00:00', '8 timer, 30 minutter', '', '2025-06-22', '2025-06-22', 30),
    (49, 151, '2025-06-22 10:45:00', '2025-06-22 19:15:00', '8 timer, 30 minutter', 'Alt er dokumenteret.', '2025-06-22', '2025-06-22', 30),
    (49, 152, '2025-06-22 12:00:00', '2025-06-22 20:30:00', '8 timer, 30 minutter', '', '2025-06-22', '2025-06-22', 30),
    (49, 153, '2025-06-22 02:15:00', NULL, '', '', '2025-06-22', NULL, 30);

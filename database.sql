CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (99) UNIQUE NOT NULL,
    "password" VARCHAR (999) NOT NULL,
    "mod" BOOLEAN DEFAULT false,
    "admin" BOOLEAN DEFAULT false,
	"location" INT DEFAULT 436
);

CREATE TABLE "type" (
	"id" SERIAL PRIMARY KEY,
	"type" VARCHAR (999) NOT NULL
);

INSERT INTO "type"
	("type")
	VALUES ('Earth'), ('Air'), ('Fire'), ('Water');

CREATE TABLE "monster" (
	"id" SERIAL PRIMARY KEY,
	"monster" VARCHAR (999) NOT NULL,
	"description" VARCHAR (9999) NOT NULL,
	"type_id" INT REFERENCES "type" NOT NULL
);

INSERT INTO "monster"
	("monster", "description", "type_id")
	VALUES 
		('Tasmanian Tiger', '1936', 3), 
		('Stellers Sea Cow', '1768', 4), 
		('Great Auk', '1844', 4), 
		('Dodo', '1662', 2),
		('Woolly Mammoth', '1700BC', 1), 
		('Sabre-Toothed Cat', 'The Sabre-Toothed Cat became extinct 10,000 years ago', 3), 
		('West African Black Rhinoceros', '2011', 1),
		('Eurasian Aurochs', 'This large wild ox became extinct in 1627', 1);

CREATE TABLE "weapon" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (999) NOT NULL,
	"description" VARCHAR (9999) NOT NULL
);

CREATE TABLE "weapon_inventory" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user" NOT NULL,
	"weapon_id" INT REFERENCES "weapon" NOT NULL,
	"type_id" INT REFERENCES "type" NOT NULL,
	"att" INT NOT NULL
);

CREATE TABLE "monster_collection" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user" NOT NULL,
    "monster_id" INT REFERENCES "monster",
    "gold" BOOLEAN,
    "hp" INT NOT NULL,
    "maxhp" INT NOT NULL,
    "att" INT NOT NULL,
    "def" INT NOT NULL,
	"spd" INT NOT NULL,
    "res" INT NOT NULL,
    "lvl" INT NOT NULL,
    "exp" INT NOT NULL,
    "weapon_inventory_id" INT REFERENCES "weapon_inventory",
    "effect" BOOLEAN DEFAULT false,
    "squad" BOOLEAN DEFAULT false
);

CREATE TABLE "effect" (
	"id" SERIAL PRIMARY KEY,
	"effect" VARCHAR (999) NOT NULL,
	"description" VARCHAR (9999) NOT NULL
);

CREATE TABLE "item" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (999) NOT NULL,
	"description" VARCHAR (9999) NOT NULL,
	"effect_id" INT REFERENCES "effect" NOT NULL
);

CREATE TABLE "item_inventory" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user" NOT NULL, 
	"item_id" INT REFERENCES "item" NOT NULL
);

CREATE TABLE "event" (
	"id" SERIAL PRIMARY KEY,
	"event" VARCHAR(999) NOT NULL, 
	"description" VARCHAR(9999)
);

CREATE TABLE "map" (
	"id" SERIAL PRIMARY KEY,
	"map_section" VARCHAR(999), 
	"x" INT,
	"y" INT,
	"description" VARCHAR(9999),
	"event_id" INT REFERENCES "event"
);

INSERT INTO "map" 
	("map_section", "x", "y", "description", "event_id")
    VALUES 
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),			(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null),
    	(null, 1, 1, null, null),(null, 1, 1, null, null),(null, 1, 1, null, null)
;

CREATE TABLE "companion" (
	"id" SERIAL PRIMARY KEY,
	"monster" VARCHAR (999) NOT NULL,
	"description" VARCHAR (9999) NOT NULL,
	"type_id" INT REFERENCES "type" NOT NULL,
	"monster_collection_id" INT REFERENCES "monster_collection" NOT NULL
);
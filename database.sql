CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (99) UNIQUE NOT NULL,
    "password" VARCHAR (999) NOT NULL,
    "mod" BOOLEAN DEFAULT false,
    "admin" BOOLEAN DEFAULT false
);

CREATE TABLE "type" (
	"id" SERIAL PRIMARY KEY,
	"type" VARCHAR (999) NOT NULL,
);

CREATE TABLE "monster" (
	"id" SERIAL PRIMARY KEY,
	"monster" VARCHAR (999) NOT NULL,
	"description" VARCHAR (9999) NOT NULL,
	"type_id" INT REFERENCES "type" NOT NULL
);

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
    "monster_id" INT REFERENCES "monster" NOT NULL,
    "gold" BOOLEAN NOT NULL,
    "hp" INT NOT NULL,
    "maxhp" INT NOT NULL,
    "att" INT NOT NULL,
    "def" INT NOT NULL,
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
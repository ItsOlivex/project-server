const mysql = require('mysql2');

class dbConnection {

	queries = {
		selectUser: `SELECT * FROM Users WHERE email = ?`,
		selectFolders: `SELECT Folders.name, Folders.directory, Folders.id_folder FROM myfiles.Folders 
		inner join FolderAccess on FolderAccess.id_folder = Folders.id_folder 
		inner join Users on FolderAccess.id_user = Users.id_user WHERE Folders.directory = ? AND Users.id_user = ?;`,
		selectFolder: `SELECT Folders.name, Folders.directory FROM myfiles.Folders WHERE Folders.directory = ?;`,
		selectFiles: `SELECT Files.name, Files.directory, Files.id_file FROM myfiles.Files
		inner join Folders on Files.id_folder = Folders.id_folder
		inner join FolderAccess on FolderAccess.id_folder = Folders.id_folder
		inner join Users on FolderAccess.id_user = Users.id_user
		WHERE Files.directory = ? AND Users.id_user = ?;`,
		verifyDeviceKey: `SELECT * FROM Devices WHERE unique_key = ?`,
		addDevice: `INSERT INTO Devices (brand, model, unique_key) values (?, ?, ?);`,
		getAccounts: `SELECT Users.name, Users.email FROM Users where Users.permission > 1;`,
		newUser: `INSERT INTO Users (email, name, surname, password, permission) values (?, ?, ?, ?, 2)`,
		removeUser: `DELETE FROM Users where email = ?`,
	}

	constructor(next) {
		this.db = mysql.createConnection({
			host: "myfilesddns.ddns.net",
			user: "pc",
			password: "Motocross2004!",
			database: "mydb"
		});
	}

    connect() {
        this.db.connect(err => {
            if (err) throw err;
            console.log("Connected");
        })
    }

	getDb() {
		return this.db;
	}

	Json(rawData) {
		return JSON.parse(JSON.stringify(rawData));
	}
}

module.exports = dbConnection;
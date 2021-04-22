const dbPromised = idb.open("footballovers-db", 2, function(upgradeDb) {
	if(!upgradeDb.objectStoreNames.contains('competitions')){
		upgradeDb.createObjectStore("competitions", {keyPath : "id"});
	}
});

const getAllCompetitions = () =>{
	return new Promise((resolve, reject)=>{
		dbPromised.then(function(db) {
			const transaction = db.transaction("competitions", "readonly");
			return transaction.objectStore("competitions").getAll();
		}).then(function(data) {
			if(data!==undefined){
				resolve(data);
			}else{
				reject(new Error("Favorite Not Found!"));
			}
		})
	})
}

const checkFavoriteCompetitions = id =>{
	return new Promise((resolve, reject)=>{
		dbPromised.then(function(db) {
			const transaction = db.transaction("competitions", "readonly");
			return transaction.objectStore("competitions").get(id);
		}).then(function(data) {
			if(data!==undefined){
				resolve(true);
			}else{
				resolve(false);
			}
		})
	})
}

const insertCompetitions = comp =>{
	return new Promise((resolve, reject)=>{
		dbPromised.then(function(db) {
			const transaction = db.transaction("competitions", "readwrite");
			transaction.objectStore("competitions").add(comp.competition);
			return transaction;
		}).then(function(transaction) {
			if(transaction.complete){
				resolve(true)
			}else{
				reject(new Error(transaction.onerror))
			}
		})
	})
}
const deleteCompetitions = id =>{ 	
	return new Promise((resolve, reject)=>{
		dbPromised.then(function(db) {
			const transaction = db.transaction("competitions", "readwrite");
			transaction.objectStore("competitions").delete(id);
			return transaction;
		}).then(function(transaction) {
			if(transaction.complete){
				resolve(true)
			}else{
				reject(new Error(transaction.onerror))
			}
		})
	})
}
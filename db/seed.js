var AWS  = require('aws-sdk');
var _ = require('underscore');

AWS.config.update({region: 'us-east-1'});

var db = new AWS.DynamoDB();

var item1 = {
	"filename": {"S": "chad-new.jpg"},
	"display": {"N": "1"},
	"location": {"S": "Cumming"}
};
var item2 = {
	"filename": {"S": "DSC_2800.jpg"},
	"display": {"N": "2"},
	"location": {"S": "Dunwoody"}
};
var item3 = {
	"filename": {"S": "DSC_2289.jpg"},
	"display": {"N": "3"},
	"location": {"S": "Marietta"}
};
var item4 = {
	"filename": {"S": "house.jpg"},
	"display": {"N": "4"},
	"location": {"S": "Marietta"}
};
var item5 = {
	"filename": {"S": "DSC_2100.jpg"},
	"display": {"N": "5"},
	"location": {"S": "Marietta"}
};
var item6 = {
	"filename": {"S": "DSC_2097.jpg"},
	"display": {"N": "6"},
	"location": {"S": "Kennesaw"}
};
var item7 = {
	"filename": {"S": "DSC_2104.jpg"},
	"display": {"N": "7"},
	"location": {"S": "Marietta"}
};
var item8 = {
	"filename": {"S": "DSC_2089.jpg"},
	"display": {"N": "8"},
	"location": {"S": "Kennesaw"}
};
var item9 = {
	"filename": {"S": "DSC_2284.jpg"},
	"display": {"N": "9"},
	"location": {"S": "Powder Springs"}
};
var item10 = {
	"filename": {"S": "DSC_2056.jpg"},
	"display": {"N": "10"},
	"location": {"S": "Dallas"}
};
var item11 = {
	"filename": {"S": "IMG_4844.jpg"},
	"display": {"N": "11"},
	"location": {"S": "Marietta"}
};
var item12 = {
	"filename": {"S": "DSC_2076.jpg"},
	"display": {"N": "12"},
	"location": {"S": "Hiram"}
};
var item13 = {
	"filename": {"S": "DSC_2057.jpg"},
	"display": {"N": "13"},
	"location": {"S": "Hiram"}
};
var item14 = {
	"filename": {"S": "IMG_2430.jpg"},
	"display": {"N": "14"},
	"location": {"S": "Fulton"}
};
var item15 = {
	"filename": {"S": "DSC_8650.jpg"},
	"display": {"N": "15"},
	"location": {"S": "Dallas"}
};
var item16 = {
	"filename": {"S": "DSC_8816.jpg"},
	"display": {"N": "16"},
	"location": {"S": "Dekalb"}
};
var item17 = {
	"filename": {"S": "DSC_2035.jpg"},
	"display": {"N": "17"},
	"location": {"S": "Atlanta"}
};
var item18 = {
	"filename": {"S": "marietta.jpg"},
	"display": {"N": "18"},
	"location": {"S": "Marietta"}
};
var item19 = {
	"filename": {"S": "chad-old.jpg"},
	"display": {"N": "19"},
	"location": {"S": "Cumming"}
};

var items = [item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11, item12, item13, item14, item15, item16, item17, item18, item19];

//seedDatabase(queryDatabase);
queryDatabase();

function seedDatabase(next) {
	// could use batchwriteitem, but ugh, that syntax
	var count = 0;
	_.each(items, function(i){
		db.putItem({TableName: 'house', Item: i}, function(err, data){
			if(err) {
				console.log(err);
			} else {
				console.log(data);
			}
			
			count++;
			if(count === items.length){
				next();
			}

		});
	});
}


function queryDatabase() {
	console.log('run query');

	var query = {
		TableName: 'house'
	}

	db.scan(query, function(err, data){
		if(err) {
			console.log(err);
		} else {
			console.log(data);
			console.log(data.Items[0].location.S);
		}
	});
}

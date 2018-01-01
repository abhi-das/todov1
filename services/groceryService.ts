

import mongodbClient from 'mongodb/lib/mongo_client';
const URL = "mongodb://abdas:abdas@ds133547.mlab.com:33547/todotasklist";

class GroceryService {
	res;
	req;
	constructor(req, res){
        this.req = req;
        this.res = res;
    }

    getList() {

    	let self = this;

    	try {

    		mongodbClient.connect(URL, (err, db)=> {
    			let itm = [];
    			let collect = db.collection('tasks').find(function(err, doc) {
	              // assert.equal(err, null);
	              if (doc != null) {
	                itm.push(doc)
	              } else {
	                return self.res.status(200).json({
	                    status: 'success',
	                    data: itm
	                })
	              }
	            });
    			console.log('server>>>',collect);
    			
    		})

    	} catch(error) {
    		 return self.res.status(500).json({
	            status: 'error',
	            error: error
	        })
    	}

    }
}

module.exports = GroceryService;
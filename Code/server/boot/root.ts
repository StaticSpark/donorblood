import { BootScript } from '@mean-expert/boot-script';


@BootScript()
class Root {
    constructor(app: any) {
    	function index(req:any,res:any) {
	    	var path = __dirname + '/../../' + 'client/dist/index.html';
	    	var fs   = require("fs");
    		var input = fs.readFileSync(path, 'utf-8');
	    	res.send(input);
	    }

        var router = app.loopback.Router();
        router.get('/status', app.loopback.status());

        router.get('/',index);
  		router.get('/map',index);
  		router.get('/donor',index);
  		router.get('/donor/*',index);
        app.use(router); 
    }
}

module.exports = Root;
